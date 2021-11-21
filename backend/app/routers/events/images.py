from fastapi import APIRouter, Depends, Path

from pymongo.database import Database
from typing import Optional, List,Any
from app.schemas import EventCreate, Event
from app.database import get_db
from app.lib import db_to_schema
from bson.objectid import ObjectId

from base64 import b64encode, b64decode

from starlette.requests import Request
from starlette.responses import Response

from PIL import Image

from datetime import datetime
import io

router = APIRouter()

@router.patch('/{id}')
async def image_upload(
    id: str,
    data: Request,
    db: Database  = Depends(get_db),


):

    dbo = db["EVENT_COLLECTION"].find_one({"_id":ObjectId(id)})
    raw_image = await data.body()

    if not dbo:
        return JSONResponse(content={'details': 'Post not found'}, status_code=404)

    try:
        #can be better
        image = Image.open(io.BytesIO(raw_image))
        #converting to JPEG no matter the source
        image = image.convert("RGB")
        cleaned = io.BytesIO()
        image.save(cleaned, format='JPEG')
        cleaned = b64encode(cleaned.getvalue())

    except UnidentifiedImageError:
        raise HTTPException(400, "File uploaded was not an image")
    #can be better
    images = dbo["images"]
    images.append(cleaned)
    db["EVENT_COLLECTION"].update_one({"_id":ObjectId(id)},{"$set":{"images":images}})
    db["EVENT_COLLECTION"].update_one({"_id":ObjectId(id)},{"$set":{"count":dbo["count"]+1}})
    return Response(b64decode(cleaned), media_type='image/jpeg')

@router.get('/{id}/images/{index}')
def get_event_image(
    id: str,
    index: int = Path(0,ge=0),
    db: Database = Depends(get_db)
)-> list[Any]:
    dbo = db["EVENT_COLLECTION"].find_one({"_id": ObjectId(id)})
    if not dbo or index>dbo["count"]:
        return JSONResponse(content={"details": "Post does not exist"}, status_code=404)
    return Response(b64decode(dbo["images"][index]), media_type='image/jpeg')

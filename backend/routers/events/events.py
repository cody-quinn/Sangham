from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer

from typing import Optional, List, Any
from app.schemas import EventCreate, Event
from app.database import get_db
from app.lib import db_to_schema
from app.lib import get_address
from pymongo.database import Database

from bson.objectid import ObjectId
router = APIRouter()

token_auth_scheme = HTTPBearer() 

@router.post('/')
def post(
    event_in: EventCreate,
    db: Database = Depends(get_db),
    token: str = Depends(token_auth_scheme)
):
    events_collection = db["EVENT_COLLECTION"]
    event_in = event_in.dict()
    event_in["images"] = []
    event_in["count"] = 0
    lat, long = event_in["latlong"]
    event_in["address"] = get_address(lat,long)
    result = events_collection.insert_one(event_in)
    ack = result.acknowledged
    return {"insertion":ack, "id": str(result.inserted_id)}

@router.get('/')
def get_events(
    db: Database = Depends(get_db),
    title: Optional[str] = Query(".*"),
    organization: Optional[str] = Query(".*"),
    limit: Optional[int] = Query(5,ge=0),
    offset: Optional[int] = Query(0,ge=0),
    tags: Optional[List[str]] = []

)-> list[Any]:
    title_filter={"title":{"$regex":".*"+title+".*"}}
    org_filter = {"organization":{"$regex":".*"+organization+".*"}}
    db_list = db["EVENT_COLLECTION"].find({"$and":[title_filter,org_filter]},{"images":0}).skip(offset).limit(limit)
    return [db_to_schema(event) for event in db_list]

@router.get('/{id}')
def get_event(
    id: str,
    db: Database = Depends(get_db)
)-> list[Any]:
    dbo = db["EVENT_COLLECTION"].find_one({"_id": ObjectId(id)},{"images":0})
    if not dbo:
        return JSONResponse(content={"details": "Post does not exist"}, status_code=404)
    return db_to_schema(dbo)

@router.delete('/{id}')
def del_event(
    id: str,
    db: Database = Depends(get_db)
)-> list[Any]:
    result = db["EVENT_COLLECTION"].delete_one({"_id": ObjectId(id)})
    if not result:
        return JSONResponse(content={"details": "Post does not exist"}, status_code=404)
    return JSONResponse(content={"details": "Post successfully deleted"}, status_code=204)


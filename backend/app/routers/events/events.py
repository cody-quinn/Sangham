from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer

from typing import Optional, List, Any
from app.schemas import EventCreate, Event, RsvpModel
from app.database import get_db
from app.lib import db_to_schema
from pymongo.database import Database

from decouple import config
from twilio.rest import Client as TwilioClient

import datetime
import time

from bson.objectid import ObjectId
router = APIRouter()

token_auth_scheme = HTTPBearer()

twilioClient = TwilioClient(config('TWILIO_ACCOUNT_SID'), config('TWILIO_AUTH_TOKEN'))

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
    event_in["rsvps"] = []
    event_in["notificationsFullfilled"] = False
    event_in["unixTime"] = time.mktime(event_in["datetime"].timetuple())
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
    db_list = db["EVENT_COLLECTION"].find({"$and":[title_filter,org_filter]},{"images":0}).sort("unixTime", 1).skip(offset).limit(limit)
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


@router.post('/{id}/rsvp')
def rsvp_event(
    id: str,
    body: RsvpModel,
    db: Database = Depends(get_db)
):
    # Stripping the phone number, example: (800) 284-2440 => 8002842440
    body.phone = body.phone.replace(" ","").replace("(","").replace(")","").replace("-","")

    # Getting the event RSVP is requested for 
    dbo = db["EVENT_COLLECTION"].find_one({"_id":ObjectId(id)})

    if not dbo:
        return JSONResponse(content={'details': 'Post not found'}, status_code=404)

    # Appending the new RSVP to the RSVP element
    print(dbo)
    rsvps = dbo["rsvps"]
    rsvps.append(body.dict())
    db["EVENT_COLLECTION"].update_one({"_id":ObjectId(id)},{"$set":{"rsvps":rsvps}})

    return {"success": True}

from app.database import get_db

from twilio.rest import Client as TwilioClient
from decouple import config

import datetime
import time

from bson.objectid import ObjectId

twilioClient = TwilioClient(config('TWILIO_ACCOUNT_SID'), config('TWILIO_AUTH_TOKEN'))

def notificationTask():
    db = next(get_db())

    currentTime = time.mktime(datetime.datetime.utcnow().timetuple())

    results = db["EVENT_COLLECTION"].find({"$and": [ {"notificationsFullfilled": False}, {"unixTime": {"$lt": currentTime}} ]})

    for result in results:
        rsvps = result["rsvps"]
        for rsvp in rsvps:
            twilioClient.messages.create(
                body="Hello "+rsvp["name"]+"! This is a reminder that the event you RSVP'd to, "+result["title"]+", just started! We hope to see you there.",
                from_=config("TWILIO_FROM"),
                to=rsvp["phone"]
            )
        db["EVENT_COLLECTION"].update_one({"_id": result["_id"]}, {"$set": {"notificationsFullfilled": True} })


def removeOldiesTask():
    db = next(get_db())

    currentTime = time.mktime(datetime.datetime.utcnow().timetuple()) - 300.0

    results = db["EVENT_COLLECTION"].delete_many({"unixTime": {"$lt": currentTime}})

from bson import ObjectId
from app.schemas.events import Event

def db_to_schema(dbo)-> Event:
    dbo["_id"]= str(dbo["_id"])
    return dbo

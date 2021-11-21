
from typing import Optional, List
from pydantic import BaseModel, Field, validator
from datetime import datetime
from email_validator import validate_email

class EventBase(BaseModel):
    title: str
    description: str
    organization: str
    email: Optional[str]
    phone_number: Optional[str]
    address:str
    tags: List[str]
    datetime: datetime
    latlong: List[float]

    @validator('email')
    def emailValidate(cls, v):
        valid = validate_email(v)
        if not valid:
            raise ValueError('email is not valid')
        return v
    
    @validator('latlong')
    def latlongValidate(cls, v):
        #can be better
        if len(v) != 2:
            raise ValueError('2 coordinates are not being sent')
        if type(v[0]) != float or type(v[1]) != float:
            raise ValueError('values must be floats')

        return v

class EventCreate(EventBase):
    pass

class Event(EventCreate):
    id: str = Field(alias='_id')
    adddress: str
    count: int
    images : List[str]=[]
    
    


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
    tags: List[str]
    datetime: datetime
    location: str

    @validator('email')
    def emailValidate(cls, v):
        valid = validate_email(v)
        if not valid:
            raise ValueError('email is not valid')
        return v
    
class EventCreate(EventBase):
    pass

class Event(EventCreate):
    id: str = Field(alias='_id')
    address: str
    count: int
    images : List[str]=[]
    
    

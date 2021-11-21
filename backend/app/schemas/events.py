
from typing import Optional, List
from pydantic import BaseModel, Field, validator
from datetime import datetime
from email_validator import validate_email
from phonenumbers import parse, is_valid_number
from phonenumbers.phonenumberutil import NumberParseException

class EventBase(BaseModel):
    title: str
    description: str
    organization: str
    email: Optional[str]
    phone_number: Optional[str]
    website: Optional[str]
    tags: List[str]
    datetime: datetime
    location: str

    @validator('email')
    def emailValidate(cls, v):
        if not validate_email(v):
            raise ValueError('email is not valid')
        return v
    
    @validator("phone_number")
    def phoneValidate(cls,v):
        try:
            is_valid_number(parse(v))
        except NumberParseException:
            raise ValueError('number is not valid')
        return v
        
    
class EventCreate(EventBase):
    pass

class Event(EventCreate):
    id: str = Field(alias='_id')
    address: str
    count: int
    images : List[str]=[]
    
    

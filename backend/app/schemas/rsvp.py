from pydantic import BaseModel

class RsvpModel(BaseModel):
    name: str
    phone: str


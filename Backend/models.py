from pydantic import BaseModel
class User(BaseModel):
    username: str
    password: str

class UserProfile(BaseModel):
    name: str
    userId: str
    ph_no: int
    bank: str
    ifsc: str
    age: int
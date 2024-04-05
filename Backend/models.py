from pydantic import BaseModel
class User(BaseModel):
    username: str
    password: str

class UserProfile(BaseModel):
    name: str
    userId: str
    ph_no: str
    bank: str
    ifsc: str
    balance: float
    age: int

class Category(BaseModel):
    category:str
    priority:int
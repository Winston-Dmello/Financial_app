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

class Transaction(BaseModel):
    Date: str
    Particulars: str
    Amount: float
    Type: str
    Category: str
    Notes: str

class Goal(BaseModel):
    goalAmount: float
    monthsLeft: int
    
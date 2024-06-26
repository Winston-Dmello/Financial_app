from pydantic import BaseModel
class User(BaseModel):
    username: str
    password: str

class UserProfile(BaseModel):
    name: str
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
    particulars: str
    amount: str
    type: str
    Category: str
    notes: str

class Goal(BaseModel):
    goalAmount: float
    monthsLeft: int
    
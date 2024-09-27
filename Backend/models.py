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

class DeleteCategory(BaseModel):
    category: str

class Transaction(BaseModel):
    Date: str
    particulars: str
    amount: str
    type: str
    Category: str
    notes: str

class Goal(BaseModel):
    goalName: str
    goalAmount: float
    monthsLeft: int
    
class DeleteGoal(BaseModel):
    goalName: str
from models import *
from database import Users, UserProfiles, Goals
from nanoid import generate
from passlib.context import CryptContext
from datetime import datetime


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def search_user_by_username(Username):
    user = await Users.find_one({"Username":Username})
    return user


async def create_user(user: User):
    id = generate(size=8)
    await Users.insert_one({
        "id":id,
        "Username":user.username,
        "Password":pwd_context.hash(user.password),
        "Status":"Offline"
    })
    return id

async def create_user_profile(UserID, user: UserProfile):
    await UserProfiles.insert_one({
        "userId":UserID,
        "name":user.name,
        "age":user.age,
        "ph_no":user.ph_no,
        "bank":user.bank,
        "ifsc":user.ifsc,
        "balance":user.balance
    })


def verify_password(password, hashed_password):
     return pwd_context.verify(password, hashed_password)
 
def transaction_maker(trans):
    transaction = {
            "Date": datetime.strptime(trans["Date"], '%d-%m-%Y'),
            "particulars":trans["particulars"],
            "amount": int(trans["amount"]),
            "type": trans["type"],
            "Category":trans["Category"],
            "notes":trans["notes"]
    }
    return transaction

async def insert_goal(UserID,goal: Goal):
    await Goals.insert_one({
        "UserId":UserID,
        "GoalName": goal.goalName,
        "GoalAmount": goal.goalAmount,
        "MonthsLeft":goal.monthsLeft
    })
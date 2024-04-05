from models import *
from database import Users, UserProfiles
from nanoid import generate
from passlib.context import CryptContext


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

async def create_user_profile(UserID, user: UserProfile):
    await UserProfiles.insert_one({
        "UserId":UserID,
        "Name":user.name,
        "Age":user.age,
        "Ph_no":user.ph_no,
        "Bank":user.bank,
        "Ifsc":user.ifsc
    })

def verify_password(password, hashed_password):
     return pwd_context.verify(password, hashed_password)
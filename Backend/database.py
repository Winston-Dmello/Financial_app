import motor.motor_asyncio

MONGO_DETAILS = "mongodb://localhost:27017/"
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client["Fintard"]
Users = database["Users"]
UserProfiles = database["UserProfiles"]
Categories = database["Categories"]
Transactions = database["Transactions"]
Goals = database["Goals"]
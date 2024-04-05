from fastapi import FastAPI, Response, Path
import uvicorn
from models import *
from Modules import *
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:5173",
    "mongodb://localhost:27017",
    "http://192.168.29.40:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
    expose_headers = ["*"]
)

@app.post('/register_user/')
async def register_user(user:User):
    check = await search_user_by_username(user.username)
    if check == None: 
        await create_user(user=user)
        return Response(status_code=200)
    else:
        return Response(status_code=409) #User already exists

@app.post('/login')
async def login_user(user:User):
    check = await search_user_by_username(user.username)
    if check == None:
        return Response(status_code=407) #User doesn't exist
    else:
        if verify_password(user.password, check['Password']):
            content = {"UserId":check['id'], "Username":check['Username']}
            await Users.update_one({"id":check['id']},{"$set":{"Status":"Online"}})
            return Response(content=json.dumps(content), status_code=200, headers={
                'Content-Type':'application/json'
            })
        else:
            return Response(status_code=401) #password doesn't match
            
@app.post('/{UserID}/profile')
async def user_profile(user:UserProfile,UserID: str=Path(...)):
    await create_user_profile(UserID, user=user)
    return Response(status_code=200)

@app.post('/{UserID}/edit_profile')
async def edit_profile(user:UserProfile, UserID: str=Path(...)):
    await UserProfiles.delete_one({"UserId":UserID})
    await create_user_profile(UserID, user=user)
    return Response(status_code=200)

if __name__ == "__main__":
        uvicorn.run(app, host="0.0.0.0", port=8000)
from fastapi import FastAPI, Response, Path, File, UploadFile
from fastapi.responses import JSONResponse
import uvicorn
from fastapi.responses import JSONResponse
from models import *
from Modules import *
import json
import os
from database import *
from fastapi.middleware.cors import CORSMiddleware
from Analyse import upload_balance_sheet, pie_data

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
            print(check['id'])
            await Users.update_one({"id":check['id']},{"$set":{"Status":"Online"}})
            return Response(content=json.dumps(content), status_code=200, headers={
                'Content-Type':'application/json'
            })
        else:
            return Response(status_code=401) #password doesn't match
            
@app.post('/{UserID}/profile/')
async def user_profile(user:UserProfile,UserID: str=Path(...)):
    check = await UserProfiles.find_one({"UserId":UserID})
    if check is not None:
        return Response(status_code=412) #UserProfile already exists
    await create_user_profile(UserID, user=user)
    await Categories.insert_one({"UserId":UserID, "categories":{}})
    await Transactions.insert_one({"UserId":UserID, "transactions":{}})
    return Response(status_code=200)

@app.post('/{UserID}/edit_profile/')
async def edit_profile(user:UserProfile, UserID: str=Path(...)):
    await UserProfiles.delete_one({"UserId":UserID})
    await create_user_profile(UserID, user=user)
    return Response(status_code=200)

@app.get('/{UserID}/edit_profile/')
async def give_profile(UserID: str=Path(...)):
    to_be_returned = await UserProfiles.find_one({"UserId":UserID},{"_id":0})
    return JSONResponse(content=to_be_returned)


@app.post('/{UserID}/add_category/')
async def add_category(categ:Category,UserID: str=Path(...)):
    '''
    l.append({categ.category:categ.priority})
    await Categories.update_one({"UserId":UserID},{"$set":{"categories":l}})'''
    categ_holder = await Categories.find_one({"UserId":UserID})
    l = categ_holder['categories']
    if categ.category not in l:
        l[categ.category] = categ.priority
        await Categories.update_one({"UserId":UserID},{"$set":{"categories":l}})
    return Response(status_code=200)

@app.post('/{UserID}/update_category')
async def update_category(categ: Category, UserID: str=Path(...)):
    categ_holder = await Categories.find_one({"UserId":UserID})
    l = categ_holder['categories']
    if categ.category not in l:
        return Response(status_code=410) #category doesn't exist!
    l[categ.category] = categ.priority
    await Categories.update_one({"UserId":UserID},{"$set":{"categories":l}})
    return Response(status_code=200)

@app.post('/{UserID}/delete_category/')
async def delete_category(categ:str, UserID: str=Path(...)):
    categ_holder = await Categories.find_one({"UserId":UserID})
    l = categ_holder['categories']
    if categ not in l:
        return Response(status_code=410) #category doesn't exist
    del l[categ]
    await Categories.update_one({"UserId":UserID},{"$set":{"categories":l}})
    return Response(status_code=200)

@app.post('/{UserID}/Bored/')
async def simply(UserID: str=Path(...)):
    await upload_balance_sheet(UserID)
    return Response(status_code=200)

@app.post('/{UserID}/add_transaction/')
async def add_transaction(trans: Transaction, UserID: str=Path(...)):
    transaction = transaction_maker(trans=trans)
    await Transactions.update_one(
        {"UserId": UserID},
        {"$set": {f"transactions.{generate()}": transaction}}
    )

@app.post('/{UserID}/update_transaction/')
async def update_transaction(transID, trans: Transaction, UserID: str=Path(...)):
    transact = await Transactions.find_one({"UserId":UserID})
    if transID not in transact['transactions']:
        return Response(status_code=411) #transaction doesn't exist
    transaction = transaction_maker(trans=trans)
    await Transactions.update_one({"UserId":UserID},{"$set":{f"transactions.{transID}":transaction}})

@app.post('/{UserID}/delete_transaction/')
async def delete_transaction(transID, UserID: str=Path(...)):
    transact = await Transactions.find_one({"UserId":UserID})
    if transID not in transact['transactions']:
        return Response(status_code=411) #transaction doesn't exist
    await Transactions.update_one({"UserId":UserID},{"$unset":{f"transactions.{transID}":""}})
    await Transactions.update_one({"UserId":UserID},{"$pull":{f"transactions.{transID}":{"$exists":False}}})
    
@app.post('/{UserID}/goal_setter/')
async def goal_setter(goal: Goal,UserID:str=Path(...)):
    await insert_goal(UserID,goal=goal)
    
@app.post('/{UserID}/upload_file/')
async def upload_file(UserID: str=Path(...), file: UploadFile=File(...)):
    DIR = "Bank_Statements"
    new_name = f"{UserID}.csv"
    file_path = os.path.join(DIR, new_name)
    with open(file_path, "wb") as f:
        contents = await file.read()
        f.write(contents)
    return Response(status_code=200)

@app.get('/{UserID}/expense_pie_chart')
async def expense_pie_chart(UserID:str=Path(...)):
    data = await pie_data(UserID)
    return JSONResponse(content=data)
    
if __name__ == "__main__":
        uvicorn.run(app, host="0.0.0.0", port=8000)
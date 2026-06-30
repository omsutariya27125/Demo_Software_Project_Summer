from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient

url = "mongodb+srv://Kushal:Kushal123@cluster0.dhzy3p8.mongodb.net/?appName=Cluster0"

client = MongoClient(url)

try:
    # Send a ping to confirm a successful connection
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB Atlas!")

except Exception as e:
    print(f"connection failed :{e}")

db = client["Sample"]
user_collection = db["Users"]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # OK while developing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
fakedb= {}

class User(BaseModel):
    username:str
    password:str

class UserRegistration(BaseModel):
        name:str
        email:str
        username:str
        password:str

@app.post("/login")
def login(userlogin: User):
    user = user_collection.find_one({
        "username": userlogin.username
    })

    if user is None:
        return {
            "success": False,
            "message": "Username not found"
        }

    if user["password"] != userlogin.password:
        return {
            "success": False,
            "message": "Wrong password"
        }

    return {
        "success": True,
        "message": "Welcome to our platform"
    }

@app.post("/register")
def register(new_user: UserRegistration):

    user = user_collection.find_one({
        "$or": [
            {"username": new_user.username},
            {"email": new_user.email}
        ]
    })

    if user:
        return {
            "success": False,
            "message": "Already registered"
        }

    user_collection.insert_one({
        "name": new_user.name,
        "email": new_user.email,
        "username": new_user.username,
        "password": new_user.password
    })

    return {
        "success": True,
        "message": "Successfully registered"
    }

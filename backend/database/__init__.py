from pymongo import MongoClient
client = MongoClient()

def get_db():
    db = client["gamer"]
    yield db
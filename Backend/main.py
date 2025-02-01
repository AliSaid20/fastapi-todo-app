# backend/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from bson.objectid import ObjectId
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()


# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow requests from your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)



# MongoDB setup
client = MongoClient("mongodb://localhost:27017")
db = client.todo_app
notes_collection = db.notes

# Pydantic model for a note
class Note(BaseModel):
    content: str
    
class NoteResponse(BaseModel):
    id: str
    content: str

@app.get("/")
async def read_root():
    return {"message": "Welcome to the TO-DO List API"}

@app.get("/notes/", response_model=list[NoteResponse])
async def get_notes():
    notes = []
    for note in notes_collection.find():
        notes.append({"id": str(note["_id"]), "content": note["content"]})
    return notes

@app.post("/notes/", response_model=NoteResponse)
async def create_note(note: Note):
    result = notes_collection.insert_one(note.dict())
    return {"id": str(result.inserted_id), "content": note.content}

@app.delete("/notes/{note_id}")
async def delete_note(note_id: str):
    try:
        object_id = ObjectId(note_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid note ID format")

    result = notes_collection.delete_one({"_id": object_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")
    
    return {"deleted": True}

@app.on_event("shutdown")
def shutdown_db_client():
    client.close()
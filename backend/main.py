from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="To-Do API")

# CORS middleware permission to communicate with Next.js

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas

class TaskCreate(BaseModel):
    text: str

class TaskUpdate(BaseModel):
    completed: bool

class TaskResponse(BaseModel):
    id: int
    text: str
    completed: bool

# test purpose tasks
tasks_db = [
    {"id": 1, "text": "Read the project brief", "completed": False},
    {"id": 2, "text": "Set up the development environment", "completed": False},
    {"id": 3, "text": "Build the first component", "completed": False},
]

# endpoints - 5 for now??

# GET - All tasks.

# POST - create new task

# PATCH - change task completed status

# DELETE - delete completed tasks

# DELETE - delete task (one by one)
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
@app.get("/tasks")
def get_tasks():
    return tasks_db

# POST - create new task
@app.post("/tasks")
def create_task(task: TaskCreate):
    new_task = {
        "id": len(tasks_db) + 1,
        "text": task.text,
        "completed": False,
    }
    tasks_db.append(new_task)
    return new_task


# PATCH - change task completed status
@app.patch("/tasks/{task_id}")
def toggle_task(task_id : int, task_update: TaskUpdate):
    for task in tasks_db:
        if task["id"] == task_id:
            task["completed"] = task_update.completed
            return task
    raise HTTPException(status_code=404, detail="Task not found")

# DELETE - delete completed tasks
@app.delete("/tasks/completed")
def clear_completed_tasks():
    global tasks_db
    tasks_db = [t for t in tasks_db if not t["completed"]]
    return {"message": "Completed tasks cleared"}

# DELETE - delete task (one by one)
@app.delete("/tasks/{task_id}")
def delete_task(task_id : int):
    global tasks_db
    tasks_db = [t for t in tasks_db if t["id"] != task_id]
    return {"message" : "Task deleted"}
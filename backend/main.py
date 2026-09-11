from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session, Mapped, mapped_column
import os
from dotenv import load_dotenv

class Base(DeclarativeBase):
    pass

class Task(Base):
    __tablename__ = "tasks"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    text: Mapped[str] = mapped_column(String(255), nullable=False)
    completed: Mapped[bool] = mapped_column(Boolean, default=False)


load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL) # sqlalchemy and db connect
Base.metadata.create_all(bind=engine) # this line makes engine go to postgres and create tables if not exist
SessionLocal = sessionmaker(bind=engine) # creating a session factory will send query to db

def get_db(): 
    db = SessionLocal() # active db connection
    try:
        yield db # sends connection to whoever will use it
    finally:
        db.close() # close db connection no matter what


app = FastAPI(title="To-Do API")

# CORS middleware permission to communicate with Next.js

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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

# endpoints - 5 for now??

# GET - All tasks.
@app.get("/tasks")
def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()

# POST - create new task
@app.post("/tasks")
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = Task(text=task.text, completed=False)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

# PATCH - change task completed status
@app.patch("/tasks/{task_id}")
def toggle_task(task_id : int, task_update: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id)
    if task.first() is None:
        raise HTTPException(status_code=404, detail="Task not found")
    task.update({"completed": task_update.completed})
    db.commit()
    return task.first()

# DELETE - delete completed tasks
@app.delete("/tasks/completed")
def clear_completed_tasks(db: Session = Depends(get_db)):
    db.query(Task).filter(Task.completed == True).delete()
    db.commit()
    return {"message" : "Completed tasks cleared"}

# DELETE - delete task (one by one)
@app.delete("/tasks/{task_id}")
def delete_task(task_id : int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id)
    if task.first() is None:
        raise HTTPException(status_code=404, detail="Task not found")
    task.delete()
    db.commit()
    return {"message" : "Task deleted"}
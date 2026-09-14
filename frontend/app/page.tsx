"use client";
import { useState, useEffect } from "react";
import ToDo from "@/components/ToDo";

export default function Home() {

 const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/tasks")
    .then(res => res.json())
    .then(data => setTasks(data));
  }, []);
  return (
      <ToDo tasks={tasks}/>
  );
}
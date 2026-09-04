'use client';
import { useState } from 'react';

function ToDo() {

    function handleAddTask(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setTaskList([...taskList, { id: taskList.length + 1, text: taskText, completed: false }]);
        setTaskText("");
    }

    function toggleTask(id: number) {
        setTaskList(taskList.map(task =>{
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        }))
    }

    function handleClearCompleted(){
        setTaskList(taskList.filter(task => {
            return task.completed === false;
        }));
    }

    let tasks = [
        { id: 1, text: "Read the project brief", completed: false },
        { id: 2, text: "Set up the development environment", completed: false },
        { id: 3, text: "Build the first component", completed: false}
    ];

    const filterValues = ['ALL', 'ACTIVE', 'DONE'];

    const [filter, setFilter] = useState("ALL");
    const [taskText, setTaskText] = useState("");
    const [taskList, setTaskList] = useState(tasks);

    let filteredTasks = taskList;

    if (filter === 'ACTIVE') { filteredTasks = taskList.filter(task => !task.completed); }
    if (filter === 'DONE') { filteredTasks = taskList.filter(task => task.completed); }

    let activeCount = taskList.filter(task => !task.completed).length;

    return (

        <main className="min-h-full bg-[#F4F3ED] flex flex-col items-center px-4 py-12">

            <div className="flex flex-col w-full max-w-xl mb-10">
                <p className="text-[#AAAAAA] text-xs tracking-widest mb-1">/ TODAY'S LIST</p>
                <h1 className="text-4xl font-bold text-[#0D0D0D] leading-none">To-Do</h1>
                <span className="w-full h-[3px] bg-[#0D0D0D] mt-4"></span>
            </div>

            {/* Add Task */}
            <form onSubmit={handleAddTask}
                className="w-full max-w-xl mb-8 flex border-2 border-[#0D0D0D]">
                <input type='text' placeholder='What needs to be done?'
                       value={taskText}
                       onChange={(e) => setTaskText(e.target.value)}
                       className="flex-1 px-4 py-3 bg-white text-[#0D0D0D] placeholder:text-[#BBB] text-base outline-none"/>
                <button type='submit'
                        className="px-5 bg-[#FFE200] text-[#0D0D0D] font-semibold text-sm tracking-wide border-l-2 border-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#FFE200] transition-colors duration-150 cursor-pointer"
                >+ ADD</button>
            </form>

            {/* filter task status */}
            <div className="w-full max-w-xl flex mb-6 border-2 border-[#0D0D0D]">
                {filterValues.map(value => (
                    <button type='button' key={value}
                            onClick={() => setFilter(value)}
                            className="flex-1 py-2 text-xs tracking-widest uppercase transition-colors duration-100 cursor-pointer">{value}</button>
                ))}
            </div>

            <div className="w-full max-w-xl border-2 border-black py-12 text-center text-black text-md">
                <ul className="space-y-0 list-none">
                    {filteredTasks.map((task) => (
                            <li key={task.id}
                                className="flex items-center gap-4 px-4 py-4 border-2 border-[#0D0D0D] bg-white group transition-colors">
                                <input type="checkbox"
                                       onChange={() => toggleTask(task.id)}
                                       checked={task.completed}
                                       className="w-5 h-5 shrink-0 border-2 border-[#0D0D0D] flex items-center justify-center transition-colors cursor-pointer"/>
                                {task.text}</li>
                        ))}
                </ul>
            </div>

            <div className="w-full max-w-xl mt-4 flex justify-between items-center">
                <p className="text-xs text-[#999]"
                >{activeCount} items left</p>
                <button className="text-xs text-[#999] hover:text-[#0D0D0D] underline underline-offset-2 transition-colors cursor-pointer"
                        onClick={handleClearCompleted}
                >clear completed</button>
            </div>

        </main>
    );
}

export default ToDo;
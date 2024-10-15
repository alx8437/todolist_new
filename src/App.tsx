import React, {useState} from 'react';
import './App.css';
import { Todolist } from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TaskFilterType = 'all' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])

    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false};
        const newTasks: Array<TaskType> = [newTask, ...tasks];

        setTasks(newTasks);
    }

    const [filter, setFilter] = useState<TaskFilterType>('all')

    const removeTask = (taskId: string) => {
        const resultTasks: Array<TaskType> = tasks.filter(task => task.id !== taskId);
        setTasks(resultTasks);
    }

    const changeFilter = (filter: TaskFilterType) => {
        setFilter(filter)
    }

    let tasksForTodolist: Array<TaskType> = tasks;

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    return (
        <div className="App">
            <Todolist addTask={addTask} changeFilter={changeFilter} removeTask={removeTask} title="What to learn" tasks={tasksForTodolist}/>
        </div>
    );
}

export default App;

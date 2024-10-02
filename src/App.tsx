import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

export type TaskFilterType = 'all' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])

    const [filter, setFilter] = useState<TaskFilterType>('all')

    const removeTask = (taskId: number) => {
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
            <Todolist changeFilter={changeFilter} removeTask={removeTask} title="What to learn" tasks={tasksForTodolist}/>
        </div>
    );
}

export default App;

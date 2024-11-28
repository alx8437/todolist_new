import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TaskFilterType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string,
    title: string,
    filter: TaskFilterType,
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: "What to bye", filter: "completed"}
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
        ]
    })

    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false};
        tasks[todolistId] = [newTask, ...tasks[todolistId]]

        setTasks({...tasks});
    }

    const removeTask = (taskId: string, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].filter(task => task.id !== taskId)
        setTasks({...tasks});
    }

    const changeFilter = (value: TaskFilterType, todolistId: string) => {
        const filteredTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl)
        setTodolists(filteredTodolists)
    }

    const changeTaskStatus = (taskId: string, status: boolean, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: status} : task)
        setTasks({...tasks});
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                let tasksForTodolist: Array<TaskType> = tasks[tl.id];

                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                }

                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                }

                return   <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    filter={tl.filter}
                    changeTaskStatus={changeTaskStatus}
                    addTask={addTask}
                    changeFilter={changeFilter}
                    removeTask={removeTask} title={tl.title}
                    tasks={tasksForTodolist}
                />
            })
            }
        </div>
    );
}

export default App;

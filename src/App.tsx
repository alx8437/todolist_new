import React, {useState} from 'react';
import './App.css';
import { TodolistItem } from "./TodolistItem";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm";

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

type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: "What to bye", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
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

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title: title} : task)})
    }

    const removeTodolist = (todolistId: string) => {
        const filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolists);

        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const createTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {id: todolistId, title, filter: 'all'};

        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const onChangeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    return (
        <div className="App">
            <CreateItemForm onCreateItem={createTodolist} />
            {todolists.map(tl => {
                let tasksForTodolist: Array<TaskType> = tasks[tl.id];

                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                }

                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                }

                return   <TodolistItem
                    key={tl.id}
                    todolistId={tl.id}
                    filter={tl.filter}
                    changeTaskStatus={changeTaskStatus}
                    addTask={addTask}
                    changeFilter={changeFilter}
                    removeTask={removeTask} title={tl.title}
                    tasks={tasksForTodolist}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    onChangeTodolistTitle={onChangeTodolistTitle}
                />
            })
            }
        </div>
    );
}

export default App;

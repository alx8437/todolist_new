import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, Checkbox} from "@mui/material";
import {Delete} from "@mui/icons-material";

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filterValue: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, todolistId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void;
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
    changeTodolistTitle: (todolistId: string, title: string) => void;
}

export function Todolist(props: TodolistPropsType) {
    const {title, tasks, removeTask, changeFilter, addTask, changeStatus, filter, todolistId, removeTodolist, changeTaskTitle, changeTodolistTitle} = props

    const changeFilterTasksHandler = (filterValue: FilterValuesType) => {
        changeFilter(filterValue, todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskHandler = (title: string) => {
        addTask(title, todolistId)
    }

    const onChangeTodolistTitle = (title: string) => {
        changeTodolistTitle(todolistId, title)
    }

    return (
        <div>
            <div className='todolist-title-container'>
                <h3>
                    <EditableSpan title={title} onChange={onChangeTodolistTitle}/>
                </h3>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete />
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskHandler} />
            <div>
                {tasks.length === 0 ? (<div>Тасок нет</div>) : (<ul>
                    {tasks.map(task => {
                        const removeTaskHandler = () => removeTask(task.id, todolistId)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const {checked} = e.currentTarget
                            changeStatus(task.id, todolistId, checked)
                        }

                        const onChangeTaskTitle = (title: string) => {
                            changeTaskTitle(todolistId, task.id, title)
                        }

                        return <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                            <Checkbox onChange={onChangeStatusHandler} checked={task.isDone} />
                            <EditableSpan title={task.title} onChange={onChangeTaskTitle} />
                            <IconButton onClick={removeTaskHandler}>
                                <Delete />
                            </IconButton>
                        </li>
                    })}
                </ul>)}
                <div>
                    <Button variant={filter === 'all' ? 'contained' : 'text'} color={"inherit"} onClick={() => changeFilterTasksHandler('all')}>All</Button>
                    <Button variant={filter === 'active' ? 'contained' : 'text'} color={"primary"}  onClick={() => changeFilterTasksHandler('active')}>Active</Button>
                    <Button variant={filter === 'completed' ? 'contained' : 'text'} color={'secondary'} onClick={() => changeFilterTasksHandler('completed')}>Completed</Button>
                </div>
            </div>
        </div>
    )
}
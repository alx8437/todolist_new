import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, Checkbox} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {FilterValuesType, TaskType} from "./App";

type TodolistPropsType = {
    todolistId: string
    title: string
    changeFilter: (filterValue: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void;
    changeTodolistTitle: (todolistId: string, title: string) => void;
}

export function Todolist(props: TodolistPropsType) {
    const {title, changeFilter, filter, todolistId, removeTodolist, changeTodolistTitle} = props

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[todolistId]);

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    const addTask = (title: string) => {
        const action = addTaskAC(todolistId, title)
        dispatch(action);
    }

    const removeTask = (taskId: string) => {
        const action = removeTaskAC(todolistId, taskId)
        dispatch(action)
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        const action = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatch(action)
    }

    const changeTaskTitle = (taskId: string, title: string) => {
        const action = changeTaskTitleAC(todolistId, taskId, title);
        dispatch(action);
    }

    const changeFilterTasks = (filterValue: FilterValuesType) => {
        changeFilter(filterValue, todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const onChangeTodolistTitle = (title: string) => {
        changeTodolistTitle(todolistId, title)
    }

    return (
        <div>
            <div className='todolist-title-container'>
                <h3>
                    <EditableSpan title={title} onChange={onChangeTodolistTitle}/>
                    <IconButton onClick={removeTodolistHandler}>
                        <Delete />
                    </IconButton>
                </h3>
            </div>
            <AddItemForm addItem={addTask} />
            <div>
                {tasksForTodolist.length === 0 ? (<div>Тасок нет</div>) : (<div>
                    {tasksForTodolist.map(task => {
                        const removeTaskHandler = () => removeTask(task.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const {checked} = e.currentTarget
                            changeStatus(task.id, checked)
                        }

                        const onChangeTaskTitle = (title: string) => {
                            changeTaskTitle(task.id, title)
                        }

                        return <div key={task.id} className={task.isDone ? 'isDone' : ''}>
                            <Checkbox onChange={onChangeStatusHandler} checked={task.isDone} />
                            <EditableSpan title={task.title} onChange={onChangeTaskTitle} />
                            <IconButton onClick={removeTaskHandler}>
                                <Delete />
                            </IconButton>
                        </div>
                    })}
                </div>)}
                <div>
                    <Button variant={filter === 'all' ? 'contained' : 'text'} color={"inherit"} onClick={() => changeFilterTasks('all')}>All</Button>
                    <Button variant={filter === 'active' ? 'contained' : 'text'} color={"primary"}  onClick={() => changeFilterTasks('active')}>Active</Button>
                    <Button variant={filter === 'completed' ? 'contained' : 'text'} color={'secondary'} onClick={() => changeFilterTasks('completed')}>Completed</Button>
                </div>
            </div>
        </div>
    )
}
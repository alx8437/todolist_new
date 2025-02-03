import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
                <Button title={'х'} onClick={removeTodolistHandler}/>
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


                        return <li key={task.id} className={task.isDone ? 'isDone' : ''}><input onChange={onChangeStatusHandler} type="checkbox" checked={task.isDone}/>
                            <EditableSpan title={task.title} onChange={onChangeTaskTitle} />
                            <Button title='x' onClick={removeTaskHandler}/>
                        </li>
                    })}
                </ul>)}
                <div>
                    <Button className={filter === 'all' ? 'activeFilter' : ''} onClick={() => changeFilterTasksHandler('all')} title='All'/>
                    <Button className={filter === 'active' ? 'activeFilter' : ''} onClick={() => changeFilterTasksHandler('active')} title='Active'/>
                    <Button className={filter === 'completed' ? 'activeFilter' : ''} onClick={() => changeFilterTasksHandler('completed')} title='Completed'/>
                </div>
            </div>
        </div>
    )
}
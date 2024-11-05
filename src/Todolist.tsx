import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: TodolistPropsType) {
    const {title, tasks, removeTask, changeFilter, addTask, changeStatus, filter} = props

    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState<null | string>(null)

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;
        setTaskTitle(value)
    }

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
            setTaskTitle('')
        }
    }

    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filterValue: FilterValuesType) => {
        changeFilter(filterValue)
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    type="text"
                    onKeyUp={addTaskOnKeyUpHandler}
                    className={error ? 'error' : ''}
                />
                <Button onClick={addTaskHandler} title='+'/>
                {error && <div className="error-message">Field is required</div>}

                {tasks.length === 0 ? (<div>Тасок нет</div>) : (<ul>
                    {tasks.map(task => {
                        const removeTaskHandler = () => removeTask(task.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const {checked} = e.currentTarget
                            changeStatus(task.id, checked)
                        }


                        return <li key={task.id} className={task.isDone ? 'isDone' : ''}><input onChange={onChangeStatusHandler} type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
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
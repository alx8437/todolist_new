import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: TodolistPropsType) {
    const {title, tasks, removeTask, changeFilter, addTask} = props
    const [taskTitle, setTaskTitle] = useState('');

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;

        setTaskTitle(value)
    }

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }

    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
                />
                <Button onClick={addTaskHandler} title='+'/>
                {tasks.length === 0 ? (<div>Тасок нет</div>) : (<ul>
                    {tasks.map(task => {
                        const removeTaskHandler = () => removeTask(task.id)

                        return <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <Button title='x' onClick={removeTaskHandler}/>
                        </li>
                    })}
                </ul>)}
                <div>
                    <Button onClick={() => changeFilterTasksHandler('all')} title='All'/>
                    <Button onClick={() => changeFilterTasksHandler('active')} title='Active'/>
                    <Button onClick={() => changeFilterTasksHandler('completed')} title='Completed'/>
                </div>
            </div>
        </div>
    )
}
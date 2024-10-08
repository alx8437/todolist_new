import React from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (filterValue: FilterValuesType) => void
}

export function Todolist(props: TodolistPropsType) {

    const {title, tasks, removeTask, changeFilter} = props

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <Button title='+' />
                {tasks.length === 0 ? (<div>Тасок нет</div>) : (<ul>
                    {tasks.map(task => {
                        return <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <Button title='x' onClick={() => removeTask(task.id)} />
                        </li>
                    })}
                </ul>)}
                <div>
                    <Button onClick={() => changeFilter('all')} title='All' />
                    <Button onClick={() => changeFilter('active')} title='Active' />
                    <Button onClick={() => changeFilter('completed')} title='Completed' />
                </div>
            </div>
        </div>
    )
}
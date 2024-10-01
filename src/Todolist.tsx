import React from "react";
import {TaskType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}

export function Todolist(props: TodolistPropsType) {
    const {title, tasks} = props

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <Button title='+' />
                {tasks.length === 0 ? (<div>Тасок нет</div>) : (<ul>
                    {tasks.map(task => {
                        return <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span></li>
                    })}
                </ul>)}
                <div>
                    <Button title='All' />
                    <Button title='Active' />
                    <Button title='Completed' />
                </div>
            </div>
        </div>
    )
}
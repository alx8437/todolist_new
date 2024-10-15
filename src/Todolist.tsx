import React from "react";
import {TaskFilterType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void;
    changeFilter: (filter: TaskFilterType) => void;
}

export function Todolist(props: PropsType) {
    const {title, tasks, removeTask, changeFilter} = props

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
                <ul>
                    {tasks.map(task => (<li key={task.id}><input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span><button onClick={() => removeTask(task.id)}>x</button>
                    </li>))}
                </ul>
                <div>
                    <button onClick={() => changeFilter('all')}>All</button>
                    <button onClick={() => changeFilter('active')}>Active</button>
                    <button onClick={() => changeFilter('completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}
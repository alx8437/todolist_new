import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TaskFilterType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void;
    changeFilter: (filter: TaskFilterType) => void;
    addTask: (title: string) => void;
}

export function Todolist(props: PropsType) {
    const {title, tasks, removeTask, changeFilter, addTask} = props

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');

    const addTaskHandler = () => {
        addTask(newTaskTitle);
        setNewTaskTitle('');
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget
        setNewTaskTitle(value)
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    onChange={onChangeHandler}
                    value={newTaskTitle} type="text"
                    onKeyUp={onKeyUpHandler}
                />
                <button onClick={addTaskHandler}>+</button>
                <ul>
                    {tasks.map(task => {
                        const removeTaskHandler = () => {
                            removeTask(task.id);
                        }

                        return <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <button onClick={removeTaskHandler}>x</button>
                                </li>
                    })}
                </ul>
                <div>
                    <button onClick={onAllClickHandler}>All</button>
                    <button onClick={onActiveClickHandler}>Active</button>
                    <button onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    )
}
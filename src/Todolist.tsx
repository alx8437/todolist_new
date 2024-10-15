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

    const addNewTask = () => {
        addTask(newTaskTitle);
        setNewTaskTitle('');
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget
        setNewTaskTitle(value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            addNewTask();
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
                    onKeyDown={onKeyPressHandler}
                />
                <button onClick={addNewTask}>+</button>
                <ul>
                    {tasks.map(task => {
                        const onRemoveTaskHandler = () => {
                            removeTask(task.id);
                        }

                        return <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <button onClick={onRemoveTaskHandler}>x</button>
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
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TaskFilterType, TaskType} from "./App";
import {Button} from "./Button";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void;
    changeFilter: (filter: TaskFilterType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, status: boolean, todolistId: string) => void
    filter: TaskFilterType
    todolistId: string
    removeTodolist: (todolistId: string) => void;
}

export function Todolist(props: PropsType) {
    const {title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter, todolistId, removeTodolist} = props

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addTask(newTaskTitle.trim(), todolistId);
            setNewTaskTitle('');
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget
        setNewTaskTitle(value)
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.ctrlKey && e.key === 'Enter') {
            addTaskHandler();
        }
    }



    const onAllClickHandler = () => changeFilter('all', todolistId);
    const onActiveClickHandler = () => changeFilter('active', todolistId);
    const onCompletedClickHandler = () => changeFilter('completed', todolistId);
    const onRemoveTodolist = () => removeTodolist(todolistId);

    return (
        <div>
            <h3>{title} <button onClick={onRemoveTodolist}>x</button></h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    onChange={onChangeHandler}
                    value={newTaskTitle} type="text"
                    onKeyUp={onKeyUpHandler}
                />
                <Button title='+' onClick={addTaskHandler} />
                {error && <div className={'error-message'}>{error}</div>}
                <ul>
                    {tasks.map(task => {
                        const removeTaskHandler = () => {
                            removeTask(task.id, todolistId);
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue, todolistId)
                        }

                        return <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                                    <input onChange={changeTaskStatusHandler} type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button title='x' onClick={removeTaskHandler} />
                                </li>
                    })}
                </ul>
                <div>
                    <Button title='All' className={filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler} />
                    <Button title='Active' className={filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler} />
                    <Button title='Completed' className={filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler} />
                </div>
            </div>
        </div>
    )
}
import React, {ChangeEvent} from "react";
import {TaskFilterType, TaskType} from "./App";
import {Button} from "./Button";
import {CreateItemForm} from "./CreateItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
    onChangeTodolistTitle: (todolistId: string, title: string) => void;
}

export function TodolistItem(props: PropsType) {
    const {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        filter,
        todolistId,
        removeTodolist,
        changeTaskTitle,
        onChangeTodolistTitle,
    } = props


    const onAllClickHandler = () => changeFilter('all', todolistId);
    const onActiveClickHandler = () => changeFilter('active', todolistId);
    const onCompletedClickHandler = () => changeFilter('completed', todolistId);
    const onRemoveTodolist = () => removeTodolist(todolistId);
    const changeTodolistTitleHandler = (title: string) => onChangeTodolistTitle(todolistId, title)

    const createTaskHandler = (title: string) => {
        addTask(title, todolistId)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
                <button onClick={onRemoveTodolist}>x</button>
            </h3>
            <CreateItemForm onCreateItem={createTaskHandler} />
            <div>
                <ul>
                    {tasks.map(task => {
                        const removeTaskHandler = () => {
                            removeTask(task.id, todolistId);
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue, todolistId)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(todolistId, task.id, title)
                        }

                        return <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                                    <input onChange={changeTaskStatusHandler} type="checkbox" checked={task.isDone}/>
                                    <EditableSpan onChange={changeTaskTitleHandler} value={task.title}/>
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
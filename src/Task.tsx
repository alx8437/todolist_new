import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {TaskType} from "./App";

type PropsType = {
    task: TaskType
    todolistId: string
}

export const Task = (props: PropsType) => {
    const {task, todolistId} = props

    const dispatch = useDispatch();

    const removeTask = () => {
        const action = removeTaskAC(todolistId, task.id)
        dispatch(action)
    }

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const {checked} = e.currentTarget
        const action = changeTaskStatusAC(todolistId, task.id, checked)
        dispatch(action)
    }

    const onChangeTaskTitle = useCallback((title: string) => {
        const action = changeTaskTitleAC(todolistId, task.id, title);
        dispatch(action);
    }, [dispatch, todolistId, task.id])

    return <div key={task.id} className={task.isDone ? 'isDone' : ''}>
        <Checkbox onChange={onChangeStatus} checked={task.isDone} />
        <EditableSpan title={task.title} onChange={onChangeTaskTitle} />
        <IconButton onClick={removeTask}>
            <Delete />
        </IconButton>
    </div>
};


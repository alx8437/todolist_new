import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskStatuses, TaskType} from "./state/task-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";

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
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        const action = changeTaskStatusAC(todolistId, task.id, status)
        dispatch(action)
    }

    const onChangeTaskTitle = useCallback((title: string) => {
        const action = changeTaskTitleAC(todolistId, task.id, title);
        dispatch(action);
    }, [dispatch, todolistId, task.id])

    return <div key={task.id} className={task.status === TaskStatuses.Completed ? 'isDone' : ''}>
        <Checkbox onChange={onChangeStatus} checked={task.status === TaskStatuses.Completed} />
        <EditableSpan title={task.title} onChange={onChangeTaskTitle} />
        <IconButton onClick={removeTask}>
            <Delete />
        </IconButton>
    </div>
};


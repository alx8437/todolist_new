import {
    changeTaskTC,
    removeTaskTC,
    TaskStatuses,
    TaskType
} from "./state/task-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";

type PropsType = {
    task: TaskType
}

export const Task = (props: PropsType) => {
    const {task} = props

    const dispatch = useDispatch();

    const removeTask = () => {
        const thunk = removeTaskTC(task.todoListId, task.id)
        dispatch(thunk)
    }

    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New

        const thunk = changeTaskTC(task.todoListId, task, {status})
        dispatch(thunk)
    }

    const onChangeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTC(task.todoListId, task, {title}))
    }, [dispatch, task])

    return <div key={task.id} className={task.status === TaskStatuses.Completed ? 'isDone' : ''}>
        <Checkbox onChange={onChangeTaskStatus} checked={task.status === TaskStatuses.Completed} />
        <EditableSpan title={task.title} onChange={onChangeTaskTitle} />
        <IconButton onClick={removeTask}>
            <Delete />
        </IconButton>
    </div>
};


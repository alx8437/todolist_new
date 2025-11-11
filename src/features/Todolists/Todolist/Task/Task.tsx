import {
    changeTaskTC,
    removeTaskTC,
    TaskStatuses,
} from "../../task-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {TaskType} from "../../../../api/types";

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
        dispatch(changeTaskTC(task.todoListId, task, {status}))
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


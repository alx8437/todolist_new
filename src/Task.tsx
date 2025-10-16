import {changeTaskTC, changeTaskTitleAC, removeTaskTC, TaskStatuses, TaskType} from "./state/task-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {UpdateTaskType} from "./api/types";

type PropsType = {
    task: TaskType
    todolistId: string
}

export const Task = (props: PropsType) => {
    const {task, todolistId} = props

    const dispatch = useDispatch();

    const removeTask = () => {
        const thunk = removeTaskTC(todolistId, task.id)
        dispatch(thunk)
    }

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        const taskForUpdate: UpdateTaskType = {
            priority: task.priority,
            status,
            description: task.description,
            startDate: task.startDate,
            deadline: task.deadline,
            title: task.title
        }
        
        const thunk = changeTaskTC(todolistId, task.id, taskForUpdate)
        dispatch(thunk)
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


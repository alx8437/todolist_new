import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useAppDispatch} from "../../../../../../../common/hooks/useAppDispatch";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, TaskType} from "../../../../../model/tasks-reducer";
import {getListItemSx} from "./TaskItem.styles";

type PropsType = {
    task: TaskType
    todolistId: string
}

export const TaskItem = ({task, todolistId}: PropsType) => {
    const dispatch = useAppDispatch();

    const removeTask = () => {
        const action = deleteTaskAC({taskId: task.id, todolistId})
        dispatch(action);
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        const action = changeTaskStatusAC({todolistId, taskId: task.id, isDone: newStatusValue})

        dispatch(action)
    }

    const changeTaskTitle = (title: string) => {
        const action = changeTaskTitleAC({todolistId, taskId: task.id, title})
        dispatch(action)
    }

    return (
        <ListItem
            sx={getListItemSx(task.isDone)}
        >
            <div>
                <Checkbox onChange={changeTaskStatus} checked={task.isDone}/>
                <EditableSpan onChange={changeTaskTitle} value={task.title}/>
            </div>
            <IconButton onClick={removeTask}>
                <Delete />
            </IconButton>
        </ListItem>
    );
};

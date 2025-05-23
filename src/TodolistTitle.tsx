import React from 'react';
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {changeTodolistTitleAC, deleteTodolistAC, TodolistType} from "./model/todolists-reducer";
import {useAppDispatch} from "./common/hooks/useAppDispatch";

type TodolistTitlePropsType = {
    todolist: TodolistType
}

export const TodolistTitle = ({todolist}: TodolistTitlePropsType) => {
    const {title, id} = todolist;
    const dispatch = useAppDispatch();

    const removeTodolist = () => {
        const action = deleteTodolistAC({id})
        dispatch(action)
    }

    const onChangeTodolistTitle = (title: string) => {
        const action = changeTodolistTitleAC({title, id})
        dispatch(action)
    }

    return (
        <h3>
            <EditableSpan value={title} onChange={onChangeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
    );
};

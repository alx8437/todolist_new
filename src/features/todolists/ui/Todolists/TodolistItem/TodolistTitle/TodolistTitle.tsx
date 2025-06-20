import React from 'react';
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {changeTodolistTitleAC, deleteTodolistAC, TodolistType} from "../../../../model/todolists-reducer";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";
import styles from './TodolistTitle.module.css'

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
        <div className={styles.container}>
            <h3>
                <EditableSpan value={title} onChange={onChangeTodolistTitle}/>
            </h3>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </div>
    );
};

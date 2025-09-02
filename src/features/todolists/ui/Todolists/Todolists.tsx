import React from 'react';
import {Paper} from "@mui/material";
import {TodolistItem} from "./TodolistItem/TodolistItem";
import {selectTodolists} from "../../model/todolists-selectors";
import {useAppSelector} from "../../../../common/hooks";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists);
    return (
        <>
            {todolists.map(todolist => (
                    <Paper key={todolist.id} sx={{p: '0 20px 20px 20px'}}>
                        <TodolistItem
                            todolist={todolist}
                        />
                    </Paper>
                )
            )}</>
    );
};

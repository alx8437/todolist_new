import React from 'react';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, TaskFilterType} from "./model/tasks-reducer";
import {Paper} from "@mui/material";
import {TodolistItem} from "./TodolistItem";
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC} from "./model/todolists-reducer";
import {useAppDispatch} from "./common/hooks/useAppDispatch";
import {useAppSelector} from "./common/hooks/useAppSelector";
import {selectTodolists} from "./model/todolists-selectors";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists);

    const dispatch = useAppDispatch();

    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC({title, todolistId})
        dispatch(action)
    }

    const removeTask = (taskId: string, todolistId: string) => {
        const action = deleteTaskAC({taskId, todolistId})
        dispatch(action);
    }

    const changeTodolistFilter = (value: TaskFilterType, todolistId: string) => {
        const action = changeTodolistFilterAC({id: todolistId, filter: value});
        dispatch(action)
    }

    const changeTaskStatus = (taskId: string, status: boolean, todolistId: string) => {
        const action = changeTaskStatusAC({todolistId, taskId, isDone: status})

        dispatch(action)
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        const action = changeTaskTitleAC({todolistId, taskId, title})
        dispatch(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = deleteTodolistAC({id: todolistId})
        dispatch(action)
    }

    const onChangeTodolistTitle = (todolistId: string, title: string) => {
        const action = changeTodolistTitleAC({title, id: todolistId})
        dispatch(action)
    }

    return (
        <>
            {todolists.map(tl => {
                return <Paper key={tl.id} sx={{p: '0 20px 20px 20px'}}>
                    <TodolistItem
                        todolist={tl}
                        changeTaskStatus={changeTaskStatus}
                        addTask={addTask}
                        changeFilter={changeTodolistFilter}
                        removeTask={removeTask}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        onChangeTodolistTitle={onChangeTodolistTitle}
                    />
                </Paper>
            })}</>
    );
};

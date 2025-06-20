import React from "react";
import {CreateItemForm} from "../../../../../common/components/CreateItemForm/CreateItemForm";
import {addTaskAC} from "../../../model/tasks-reducer";
import {TodolistType} from "../../../model/todolists-reducer";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {Tasks} from "./Tasks/Tasks";
import FilterButtons from "./FilterButtons/FilterButtons";

type PropsType = {
    todolist: TodolistType
}

export function TodolistItem({todolist}: PropsType) {
    const dispatch = useAppDispatch();

    const addTask = (title: string) => {
        const action = addTaskAC({title, todolistId: todolist.id})
        dispatch(action)
    }

    return (
        <div>
            <TodolistTitle todolist={todolist} />
            <CreateItemForm onCreateItem={addTask} />
            <Tasks todolist={todolist} />
            <FilterButtons todolist={todolist} />
        </div>
    )
}
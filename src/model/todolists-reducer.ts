import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {TaskFilterType} from "./tasks-reducer";

const initialState: TodolistType[] = [];

export const deleteTodolistAC = createAction<{id: string}>('todolists/deleteTodolist')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {
        payload: {
            title,
            id: nanoid(),
        }
    }
})
export const changeTodolistTitleAC = createAction<{id: string, title: string}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{id: string, filter: TaskFilterType}>('todolists/changeTodolistFilter')

export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
            }})
        .addCase(createTodolistAC, (state, action) => {
            state.push({...action.payload, filter: 'all'})
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            // Можно так
            // const index = state.findIndex(todolist => todolist.id === action.payload.id)
            // if (index) state[index].title = action.payload.title;

            // И можно так
            const todolist = state.find(todolist => todolist.id === action.payload.id)
            if (todolist) {
                todolist.title = action.payload.title;
            }
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id);
            if (index > -1) {
                state[index].filter = action.payload.filter;
            }
        })
})

export type TodolistType = {
    id: string,
    title: string,
    filter: TaskFilterType,
}

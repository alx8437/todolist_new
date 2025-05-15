import {TaskFilterType, TodolistType} from "../app/App";
import {createAction, nanoid} from "@reduxjs/toolkit";

const initialState: TodolistType[] = [

]

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

export type ActionsTypes =
    ReturnType<typeof deleteTodolistAC> |
    ReturnType<typeof createTodolistAC> |
    ReturnType<typeof changeTodolistTitleAC> |
    ReturnType<typeof changeTodolistFilterAC>

export const todolistsReducer = (state:TodolistType[] = initialState, action: ActionsTypes): TodolistType[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(tl => tl.id !== action.payload.id)
        }

        case 'create_todolist': {
            const newTodolist: TodolistType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: "all"
            }

            return [newTodolist, ...state]
        }

        case "change_todolist": {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }

        case 'change_todolist_filter': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }

        default:
            return state
    }
}
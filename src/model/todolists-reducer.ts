import {TaskFilterType, TodolistType} from "../App";
import {v1} from "uuid";

const initialState: TodolistType[] = [

]

export const deleteTodolistAC = (todolistId: string) => {
    return {type: "delete_todolist", payload: {id: todolistId}} as const
}

export const createTodolistAC = (title: string) => {
    return {
        type: 'create_todolist',
        payload: {
            title,
            id: v1()
        }
    } as const
}

export const changeTodolistTitleAC = (payload: {id: string, title: string}) => {
    return {
        type: 'change_todolist',
        payload
    } as const
}

export const changeTodolistFilterAC = (payload: {id: string, filter: TaskFilterType}) => {
    return {
        type: "change_todolist_filter",
        payload
    } as const
}

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
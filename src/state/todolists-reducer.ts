import {Dispatch} from "redux";
import {todolistsApi} from "../api/todolistsApi";
import {TodolistType} from "../api/types";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id);
        }

        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {
                ...action.todolist,
                filter: "all",
            }

            return [newTodolist, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        }

        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({...tl, filter: "all"}))
        }

        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => ({id: todolistId, type: "REMOVE-TODOLIST"} as const)

export const addTodolistAC = (todolist: TodolistType) => ({todolist, type: "ADD-TODOLIST"} as const)

export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => ({
    todolistId,
    title: newTitle,
    type: 'CHANGE-TODOLIST-TITLE'
} as const)

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => ({
    todolistId,
    filter,
    type: "CHANGE-TODOLIST-FILTER"
} as const)

export const setTodolistsAC = (todolists: TodolistType[]) => ({type: "SET-TODOLISTS", todolists} as const)

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsApi.getTodolists()
            .then(res => dispatch(setTodolistsAC(res.data)))
    }
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.deleteTodolist(todolistId).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(removeTodolistAC(todolistId))
        }
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.createTodolist(title).then((res => {
        if (res.data.resultCode === 0) {
            const todolist = res.data.data.item;
            dispatch(addTodolistAC(todolist));
        }
    }))
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsApi.changeTodolist(todolistId, title).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC(todolistId, title))
        }
    })
}

type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>


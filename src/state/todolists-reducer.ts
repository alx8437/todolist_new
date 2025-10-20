import {Dispatch} from "redux";
import {todolistsApi} from "../api/todolistsApi";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}

type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId: string,
    title: string
}

export type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId: string,
    filter: FilterValuesType,
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | SetTodolistsActionType

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

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

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        id: todolistId,
        type: "REMOVE-TODOLIST"
    }
}

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {
        todolist,
        type: "ADD-TODOLIST"
    }
}

export const changeTodolistTitleAC = (todolistId: string, newTitle: string): ChangeTodolistTitleType => {
    return {
        todolistId,
        title: newTitle,
        type: 'CHANGE-TODOLIST-TITLE',
    }
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterType => {
    return {
        todolistId,
        filter,
        type: "CHANGE-TODOLIST-FILTER",
    }
}

export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return {
        type: "SET-TODOLISTS",
        todolists
    }
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTodolists()
            .then(res => dispatch(setTodolistsAC(res.data)))
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTodolist(todolistId).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
            }
        })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTodolist(title).then((res => {
            if (res.data.resultCode === 0) {
                const todolist =res.data.data.item;
                dispatch(addTodolistAC(todolist));
            }
        }))
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.changeTodolist(todolistId, title).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title))
            }
        })
    }
}


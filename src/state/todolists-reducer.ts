import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

export type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType,
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleType | ChangeTodolistFilterType

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
                title: action.title,
                id: action.todolistId,
                filter: "all",
                addedDate: '',
                order: 0,
            }

            return [newTodolist, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
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

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        title,
        todolistId: v1(),
        type: "ADD-TODOLIST"
    }
}

export const changeTodolistTitleAC = (todolistId: string, newTitle: string): ChangeTodolistTitleType => {
    return {
        id: todolistId,
        title: newTitle,
        type: 'CHANGE-TODOLIST-TITLE',
    }
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterType => {
    return {
        id: todolistId,
        filter,
        type: "CHANGE-TODOLIST-FILTER",
    }
}


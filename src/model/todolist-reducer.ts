import {TodolistType} from "../App";

const initialState: TodolistType[] = [

]

type Action = {
    type: string
    payload: any
}

const action: Action = {
    type: 'todos/todoAdded',
    payload: {
        id: '1eb42cac-f809-4c16-b6b0-f3c6169d83b0',
    }
}

export const todolistReducer = (state:TodolistType[] = initialState, action: Action): TodolistType[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state
        }

        default:
            return state
    }
}
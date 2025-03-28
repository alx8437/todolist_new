import {TodolistType} from "../App";

const initialState: TodolistType[] = [

]



export const deleteTodolistAC = (todolistId: string) => {
    return {type: "delete_todolist", payload: {id: todolistId}} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

export type Actions = DeleteTodolistAction

export const todolistsReducer = (state:TodolistType[] = initialState, action: Actions): TodolistType[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(tl => tl.id !== action.payload.id)
        }

        default:
            return state
    }
}
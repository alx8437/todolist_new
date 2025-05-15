import {TaskStateType, TaskType} from "../app/App";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer";
import { nanoid } from "@reduxjs/toolkit";

export const deleteTaskAC = (payload: {taskId: string, todolistId: string}) => {
    return {
        type: 'delete_task',
        payload
    } as const
}

export const addTaskAC = (payload: {title: string, todolistId: string}) => {
    return {
        type: 'create_task',
        payload
    } as const
}

export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, newStatus: boolean}) => {
    return {
        type: 'change_status',
        payload
    } as const
}

export const changeTaskTitleAC = (payload: {todolistId: string, taskId: string, title: string}) => {
    return {
        type: 'change_task_title',
        payload
    } as const
}

type ActionsTypes =
    ReturnType<typeof deleteTodolistAC> |
    ReturnType<typeof createTodolistAC> |
    ReturnType<typeof deleteTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTitleAC>

const initialState: TaskStateType =  {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsTypes): TaskStateType => {
    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }

        case "delete_todolist": {
            const newState = {...state};
            delete newState[action.payload.id];

            return newState
        }

        case "delete_task": {
            const {taskId, todolistId} = action.payload
            return {
                ...state,
                [todolistId]: state[todolistId].filter(task => task.id !== taskId)
            }
        }

        case "create_task": {
            const {title, todolistId} = action.payload
            const newTask: TaskType = {id: nanoid(), title, isDone: false};

            return {
                ...state,
                [todolistId]: [newTask, ...state[todolistId]]
            }
        }

        case "change_status": {
            const {todolistId, taskId, newStatus} = action.payload

            return {
                ...state,
                [todolistId]: state[todolistId].map(task => task.id === taskId ? {...task, isDone: newStatus} : task)
            }
        }

        case "change_task_title": {
            const {todolistId, taskId, title} = action.payload

            return {
                ...state,
                [todolistId]: state[todolistId].map(task => task.id === taskId ? {...task, title} : task)
            }
        }

        default: {
            return state
        }
    }

}
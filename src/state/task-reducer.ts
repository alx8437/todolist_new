import {TasksStateType, TaskType, TodolistType} from "../App";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

type AddTaskActionType = {
    type: 'ADD_TASK'
    todolistId: string,
    title: string,
}

type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    todolistId: string
    taskId: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS',
    taskId: string;
    todolistId: string;
    isDone: boolean;
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE',
    taskId: string
    todolistId: string
    title: string
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: boolean): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        taskId,
        todolistId,
        isDone: status
    } as const
}

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {
        type: "ADD_TASK",
        todolistId,
        title
    } as const
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE_TASK",
        todolistId,
        taskId,
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {
      type: "CHANGE_TASK_TITLE",
      todolistId,
      taskId,
      title,
    }
}

type ActionTypes =
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof removeTodolistAC>


export const taskReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case "ADD_TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false,
            }

            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }

        case "REMOVE_TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        }

        case "CHANGE_TASK_STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)
            }
        }

        case "CHANGE_TASK_TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, title: action.title} : task)
            }
        }

        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }

        case "REMOVE-TODOLIST": {
            const newState = {...state};
            delete newState[action.id]

            return newState
        }


        default:
            return  state

    }
}
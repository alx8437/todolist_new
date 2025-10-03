import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TasksStateType} from "../App";

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
    status:TaskStatuses;
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE',
    taskId: string
    todolistId: string
    title: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    later = 4,
}

export  type TaskType =  {
    id: string,
    title: string,
    description: null | string,
    todoListId: string,
    order: number,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: null | string,
    deadline: null | string,
    addedDate: string
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        taskId,
        todolistId,
        status
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
    ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof setTodolistsAC>

const initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case "ADD_TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                addedDate: new Date().toString(),
                deadline: null,
                startDate: null,
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                status: TaskStatuses.New,
                todoListId: action.todolistId,
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
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, status: action.status} : task)
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

        case "SET-TODOLISTS": {
            const stateCopy = {...state};

            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })

            return stateCopy
        }


        default:
            return  state

    }
}
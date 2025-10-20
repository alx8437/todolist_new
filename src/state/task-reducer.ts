import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TasksStateType} from "../App";
import {Dispatch} from "redux";
import {todolistsApi} from "../api/todolistsApi";
import {ModelTaskType} from "../api/types";

type AddTaskActionType = {
    type: 'ADD_TASK'
    task: TaskType,
}

type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    todolistId: string
    taskId: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK',
    taskId: string;
    todolistId: string;
    model: DomainModelTaskType;
}

type ChangeTaskTitleActionType = {
    type: '_TITLE',
    taskId: string
    todolistId: string
    title: string
}

type SetTasksActionType = {
    type: 'SET_TASKS',
    tasks: Array<TaskType>,
    todolistId: string,
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

export type DomainModelTaskType = Partial<ModelTaskType>

const initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case "ADD_TASK": {
            const {task} = action;
            return {...state, [task.todoListId]: [task, ...state[task.todoListId]]}
        }

        case "REMOVE_TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        }

        case "CHANGE_TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, ...action.model} : task)
            }
        }

        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}
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

        case "SET_TASKS": {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }

        default:
            return  state

    }
}

export const changeTaskAC = (todolistId: string, taskId: string, model: DomainModelTaskType): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK',
        taskId,
        todolistId,
        model
    } as const
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {
        type: "ADD_TASK",
        task,
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
        type: "_TITLE",
        todolistId,
        taskId,
        title,
    }
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {
        type: "SET_TASKS",
        tasks,
        todolistId
    }
}

type ActionTypes =
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof changeTaskAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof setTodolistsAC> |
    ReturnType<typeof setTasksAC>

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTasks(todolistId)
            .then(res => dispatch(setTasksAC(res.data.items, todolistId)))
    }
}

export const changeTaskTC = (todolistId: string, task: TaskType, domainModel: DomainModelTaskType) => {
    const apiModel: ModelTaskType = {
        title: task.title,
        status: task.status,
        deadline: task.deadline,
        startDate: task.startDate,
        description: task.description,
        priority: task.priority,
        ...domainModel
    }

    return (dispatch: Dispatch) => {
        todolistsApi.changeTask(todolistId, task.id, apiModel).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTaskAC(todolistId, task.id, domainModel))
            }
        })
    }
}

export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTask(todolistId, taskId).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
            }
        })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTask(todolistId, title).then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
            }
        })
    }
}

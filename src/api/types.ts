import {TaskPriorities, TaskStatuses} from "../state/task-reducer";

type FieldError = {
    error: string
    field: string
}

export type GetTasksResponse = {
    items: Array<TaskType>
    totalCount: number,
    error: null | string
}

export type ModelTaskType = Omit<TaskType, 'id' | 'todoListId' | 'order' | 'addedDate'>

export type BaseResponse<T = {}> = {
    data: T
    resultCode: number
    messages: Array<string>
    fieldsErrors: FieldError[],
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
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
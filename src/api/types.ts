import {TaskType} from "../state/task-reducer";

type FieldError = {
    error: string
    field: string
}

export type GetTasksResponse = {
    items: Array<TaskType>
    totalCount: number,
    error: null | string
}

export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type BaseResponse<T = {}> = {
    data: T
    resultCode: number
    messages: Array<string>
    fieldsErrors: FieldError[],
}
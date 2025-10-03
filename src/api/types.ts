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

export type UpdateTaskType = Omit<TaskType, 'id' | 'todoListId' | 'order' | 'addedDate'>

export type BaseResponse<T = {}> = {
    data: T
    resultCode: number
    messages: Array<string>
    fieldsErrors: FieldError[],
}
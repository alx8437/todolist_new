export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export  type TaskType =  {
    id: string,
    title: "New task from Postman",
    description: null | string,
    todoListId: string,
    order: number,
    status: number,
    priority: number,
    startDate: null | string,
    deadline: null | string,
    addedDate: string
}


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
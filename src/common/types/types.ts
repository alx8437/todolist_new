export type FieldError = {
    error: string
    field: string
}

export type BaseResponse<T = {}> = {
    data: T,
    messages: string[],
    resultCode: number,
    fieldsErrors: FieldError[],
}

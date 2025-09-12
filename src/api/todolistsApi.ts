import {instance} from "./instance";
import {BaseResponse, GetTasksResponse, TaskType, TodolistType, UpdateTaskType} from "./types";


export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    changeTodolist(id: string, title: string) {
        return instance.put<BaseResponse>(`/todo-lists/${id}`, {title})
    },
    createTodolist(title: string) {
        return instance.post<BaseResponse<{item: TodolistType}>>('/todo-lists', {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<BaseResponse>(`/todo-lists/${id}`)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    postTask(todolistId: string, title: string) {
        return instance.post<BaseResponse<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    changeTask(todolistId: string, taskId: string, task: UpdateTaskType) {
        return instance.put<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, {...task})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
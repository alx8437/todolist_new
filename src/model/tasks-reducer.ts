import {TaskStateType, TaskType} from "../app/App";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";


export const deleteTaskAC = createAction<{taskId: string, todolistId: string}>('tasks/deleteTaskAC')
export const addTaskAC = createAction<{title: string, todolistId: string}>('tasks/addTask')
export const changeTaskStatusAC = createAction<{todolistId: string, taskId: string, isDone: boolean}>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{todolistId: string, taskId: string, title: string}>('tasks/changeTaskTitle')

const initialState: TaskStateType =  {}

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTaskAC, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex(task => task.id === action.payload.taskId)
        if (index !== -1) tasks.splice(index, 1);
    })
        .addCase(addTaskAC, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const newTask: TaskType = {id: nanoid(), title: action.payload.title, isDone: false};
            tasks.unshift(newTask);
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const task = tasks.find(task => task.id === action.payload.taskId);
            if (task) task.isDone = action.payload.isDone;
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const task = tasks.find(task => task.id === action.payload.taskId);
            if (task) task.title = action.payload.title;
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id];
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })


})

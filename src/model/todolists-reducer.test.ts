import {v1} from 'uuid'
import { expect, test, beforeEach } from 'vitest'
import {TaskFilterType, TodolistType} from "../app/App";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: TodolistType[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

})

test('correct todolist should be deleted', () => {
    const action = deleteTodolistAC(todolistId1)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const title = 'New todolist'

    const action = createTodolistAC(title)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(title);
})

test('Todolist name should be changed', () => {
    const newTitle = 'changedTitle'

    const action = changeTodolistTitleAC({id: todolistId1, title: newTitle})
    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe(newTitle);
    expect(endState[1].title).toBe('What to buy');
})

test('Todolist filter should be changed', () => {
    const newFilterValue: TaskFilterType = 'completed'

    const action = changeTodolistFilterAC({id: todolistId1, filter: "completed"});
    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe(newFilterValue);
    expect(endState[1].filter).toBe('all');
})
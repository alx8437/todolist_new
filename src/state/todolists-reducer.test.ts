import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

test('Correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to buy', filter: 'all'},
        {id: todolistId2, title: 'What to learn', filter: 'all'},
    ];

    const endState: Array<TodolistType> = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('Correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const newTodolistTitle = 'New todolist'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to buy', filter: 'all'},
        {id: todolistId2, title: 'What to learn', filter: 'all'},
    ];

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all')
})

test('correct todolist change title', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTitle = 'New todolist title'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to buy', filter: 'all'},
        {id: todolistId2, title: 'What to learn', filter: 'all'},
    ];

    const action = changeTodolistTitleAC(todolistId2, newTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to buy')
    expect(endState[1].title).toBe(newTitle)
})


test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newFilterValue: FilterValuesType = "completed"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to buy', filter: 'all'},
        {id: todolistId2, title: 'What to learn', filter: 'all'},
    ];

    const action = changeTodolistFilterAC(todolistId2, newFilterValue)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilterValue)
})
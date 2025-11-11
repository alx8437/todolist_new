import {v1} from "uuid";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer, TodolistDomainType, FilterValuesType, setTodolistsAC
} from "./todolists-reducer";
import {TodolistType} from "../../api/types";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: 'What to buy', filter: 'all', addedDate: new Date().toString(), order: 0},
        {id: todolistId2, title: 'What to learn', filter: 'all', addedDate: new Date().toString(), order: 0},
    ];
})

test('Correct todolist should be removed', () => {
    const endState: Array<TodolistDomainType> = todolistsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

// test('Correct todolist should be added', () => {
//     let todolistId1 = v1()
//     let todolistId2 = v1()
//
//     const newTodolistTitle = 'New todolist'
//
//     const startState: Array<TodolistDomainType> = [
//         {id: todolistId1, title: 'What to buy', filter: 'all', addedDate: new Date().toString(), order: 0},
//         {id: todolistId2, title: 'What to learn', filter: 'all', addedDate: new Date().toString(), order: 0},
//     ];
//
//     const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))
//
//     expect(endState.length).toBe(3);
//     expect(endState[0].title).toBe(newTodolistTitle);
//     expect(endState[0].filter).toBe('all')
// })

test('correct todolist change title', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTitle = 'New todolist title'

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'What to buy', filter: 'all', addedDate: new Date().toString(), order: 0},
        {id: todolistId2, title: 'What to learn', filter: 'all', addedDate: new Date().toString(), order: 0},
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

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'What to buy', filter: 'all', addedDate: new Date().toString(), order: 0},
        {id: todolistId2, title: 'What to learn', filter: 'all', addedDate: new Date().toString(), order: 0},
    ];

    const action = changeTodolistFilterAC(todolistId2, newFilterValue)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilterValue)
})

test('todolists set correct', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const todolists: TodolistType[] = [
        {id: todolistId1, title: 'What to buy', addedDate: new Date().toString(), order: 0},
        {id: todolistId2, title: 'What to learn', addedDate: new Date().toString(), order: 0},
    ]

    const action = setTodolistsAC(todolists)

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe('all');
})
import {TaskStateType} from "../App";
import {beforeEach, test, expect} from 'vitest'

import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, taskReducer} from "./task-reducer";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer";


let startState: TaskStateType = {}

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        'todolistId2': [
            {id: '5', title: 'Bread', isDone: true},
            {id: '6', title: 'Milk', isDone: false},
        ]
    }
})

test('New array should be created for new todolist', () => {
    const action = createTodolistAC('New todolist')
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)

    const newKey = keys.find(key => key !== 'todolistId1' && key !== 'todolistId2')

    expect(newKey).toBeDefined()
    expect(keys.length).toBe(3);
})

test('Property with todolist should be deleted', () => {
    const action = deleteTodolistAC('todolistId2')
    const endState = taskReducer(startState, action);

    const keys = Object.keys(endState);

    expect(endState['todolistId2']).toBeUndefined();
    expect(keys.length).toBe(1);

})

test('Correct task should be deleted', () => {
    const action = deleteTaskAC({taskId: '1', todolistId: 'todolistId1'})

    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState).toEqual({
        'todolistId1': [
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false},
        ],
        'todolistId2': [
            {id: '5', title: 'Bread', isDone: true},
            {id: '6', title: 'Milk', isDone: false},
        ]
    })
})

test('Task added correct', () => {
    const action = addTaskAC({todolistId: 'todolistId1', title: 'newTask'})

    const endState = taskReducer(startState, action);

    expect(endState.todolistId1.length).toBe(5)
    expect(endState.todolistId2.length).toBe(2)
    expect(endState.todolistId1[3].id).toBeDefined()
})

test('Task status should be changed', () => {
    const action = changeTaskStatusAC({todolistId: 'todolistId1', taskId: '1', newStatus: false})

    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'][0].isDone).toBeFalsy()
})

test('Task title should be changed', () => {
    const action = changeTaskTitleAC({todolistId: 'todolistId1', taskId: '1', title: 'newTitle'})

    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'][0].title).toBe('newTitle')
})

import {TaskStateType} from "../App";
import {beforeEach, test, expect} from 'vitest'
import {v1} from "uuid";
import {taskReducer} from "./task-reducer";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer";


let startState: TaskStateType = {}

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        'todolistId2': [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
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
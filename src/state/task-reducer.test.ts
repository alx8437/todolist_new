import {
    removeTaskAC, TaskPriorities,
    taskReducer,
    TaskStatuses
} from "./task-reducer";
import { removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TasksStateType} from "../App";
import {TodolistType} from "../api/types";


describe('taskReducer', () => {
    let startState: TasksStateType;

    beforeEach(() => {
        startState = {
            'todolistId1': [
                {
                    id: '1',
                    title: 'CSS',
                    status: TaskStatuses.Completed,
                    todoListId: 'todolistId1',
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '2',
                    title: 'JS',
                    status: TaskStatuses.Completed,
                    todoListId: 'todolistId1',
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '3',
                    title: 'REACT',
                    status: TaskStatuses.Completed,
                    todoListId: 'todolistId1',
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    description: '',
                    priority: TaskPriorities.Low
                },
            ],
            'todolistId2': [
                {
                    id: '1',
                    title: 'milk',
                    status: TaskStatuses.Completed,
                    todoListId: 'todolistId2',
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '2',
                    title: 'bread',
                    status: TaskStatuses.Completed,
                    todoListId: 'todolistId2',
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '3',
                    title: 'tea',
                    status: TaskStatuses.Completed,
                    todoListId: 'todolistId2',
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    description: '',
                    priority: TaskPriorities.Low
                },
            ],
        };
    });

    test('correct task should be deleted from correct array', () => {
        const action = removeTaskAC('todolistId2', '2');
        const endState = taskReducer(startState, action);

        expect(endState['todolistId1'].length).toBe(3);
        expect(endState['todolistId2'].length).toBe(2);
        expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy();
    });

    // test('correct task should be added to correct array', () => {
    //     const action = addTaskAC('todolistId1', 'Redux');
    //     const endState = taskReducer(startState, action);
    //
    //     expect(endState['todolistId1'].length).toBe(4);
    //     expect(endState['todolistId2'].length).toBe(3);
    //     expect(endState['todolistId1'][0].title).toBe('Redux');
    //     expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New);
    // });

    // test('status of specified task should be changed', () => {
    //     const action = changeTaskAC('todolistId2', '2', TaskStatuses.New);
    //     const endState = taskReducer(startState, action);
    //
    //     expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
    // });

    // test('title of specified task should be changed', () => {
    //     const action = changeTaskTitleAC('todolistId1', '3', 'Redux');
    //     const endState = taskReducer(startState, action);
    //
    //     expect(endState['todolistId1'][2].title).toBe('Redux');
    //     expect(endState['todolistId2'][2].title).toBe('tea');
    // });

    // test('new array for new todolist should be added', () => {
    //     const action = addTodolistAC('new title')
    //     const endState = taskReducer(startState, action)
    //
    //     const keys = Object.keys(endState);
    //
    //     const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    //
    //     if (!newKey) {
    //         throw Error("new key should be added")
    //     }
    //
    //     expect(keys.length).toBe(3);
    //     expect(endState[newKey]).toEqual([]);
    //
    // })

    test('array with tasks should be removed if todolist was deleted', () => {
        const action = removeTodolistAC('todolistId1')
        const endState = taskReducer(startState, action);

        const keys = Object.keys(endState);

        expect(keys.length).toBe(1)
        expect(endState['todolistId1']).toBeUndefined()
    })

    test('if action type is incorrect, reducer should return state without changes', () => {
        const action = {type: 'UNKNOWN_ACTION'} as any;
        const endState = taskReducer(startState, action);

        expect(endState).toEqual(startState);
    });

    test('empty array should be added when we set todolists', () => {
        const todolists: TodolistType[] = [
            {id: '1', title: 'What to buy', addedDate: new Date().toString(), order: 0},
            {id: '2', title: 'What to learn', addedDate: new Date().toString(), order: 0},
        ];

        const action = setTodolistsAC(todolists)

        const endState: TasksStateType = taskReducer({}, action)

        const keys = Object.keys(endState);

        expect(keys.length).toBe(2);
        expect(endState['1']).toBeDefined();
        expect(endState['2']).toBeDefined();
    })
});
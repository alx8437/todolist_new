import {TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./task-reducer";


describe('taskReducer', () => {
    let startState: TasksStateType;

    beforeEach(() => {
        startState = {
            'todolistId1': [
                {id: '1', title: 'CSS', isDone: false},
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'React', isDone: false}
            ],
            'todolistId2': [
                {id: '1', title: 'bread', isDone: false},
                {id: '2', title: 'milk', isDone: true},
                {id: '3', title: 'tea', isDone: false}
            ]
        };
    });

    test('correct task should be deleted from correct array', () => {
        const action = removeTaskAC('todolistId2', '2');
        const endState = taskReducer(startState, action);

        expect(endState['todolistId1'].length).toBe(3);
        expect(endState['todolistId2'].length).toBe(2);
        expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy();
    });

    test('correct task should be added to correct array', () => {
        const action = addTaskAC('todolistId1', 'Redux');
        const endState = taskReducer(startState, action);

        expect(endState['todolistId1'].length).toBe(4);
        expect(endState['todolistId2'].length).toBe(3);
        expect(endState['todolistId1'][0].title).toBe('Redux');
        expect(endState['todolistId1'][0].isDone).toBe(false);
    });

    test('status of specified task should be changed', () => {
        const action = changeTaskStatusAC('todolistId2', '2', false);
        const endState = taskReducer(startState, action);

        expect(endState['todolistId2'][1].isDone).toBe(false);
    });

    test('title of specified task should be changed', () => {
        const action = changeTaskTitleAC('todolistId1', '3', 'Redux');
        const endState = taskReducer(startState, action);

        expect(endState['todolistId1'][2].title).toBe('Redux');
        expect(endState['todolistId2'][2].title).toBe('tea');
    });

    test('if action type is incorrect, reducer should return state without changes', () => {
        const action = {type: 'UNKNOWN_ACTION'} as any;
        const endState = taskReducer(startState, action);

        expect(endState).toEqual(startState);
    });
});
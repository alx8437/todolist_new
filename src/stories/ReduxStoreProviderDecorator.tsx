import {Provider} from "react-redux";
import {AppRootState} from "../state/store";
import {combineReducers, legacy_createStore as createStore} from "redux";
import {todolistsReducer} from "../state/todolists-reducer";
import {TaskPriorities, taskReducer, TaskStatuses} from "../state/task-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: taskReducer,
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: 'todolistId1', filter: "all", title: 'What to learn',  addedDate: new Date().toString(), order: 0},
        {id: 'todolistId2', filter: "all", title: 'What to buy',  addedDate: new Date().toString(), order: 0},
    ],
    tasks: {
        "todolistId1": [
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
        ],
        "todolistId2": [
            {
                id: '3',
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
                id: '4',
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
        ],
    }
}

// @ts-ignore
const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}> {storyFn()};</Provider>
}
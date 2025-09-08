import {Provider} from "react-redux";
import {AppRootState} from "../state/store";
import {combineReducers, legacy_createStore as createStore} from "redux";
import {todolistsReducer} from "../state/todolists-reducer";
import {taskReducer} from "../state/task-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: taskReducer,
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: 'todolistId1', filter: "all", title: 'What to learn'},
        {id: 'todolistId2', filter: "all", title: 'What to buy'},
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        ["todolistId2"]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
    }
}

// @ts-ignore
const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}> {storyFn()};</Provider>
}
import {combineReducers, legacy_createStore as createStore} from 'redux'
import {taskReducer} from "./task-reducer";
import {todolistsReducer} from "./todolists-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: taskReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store
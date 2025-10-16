import {taskReducer} from "./task-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: taskReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store
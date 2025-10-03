import {taskReducer} from "./task-reducer";
import {todolistsReducer} from "./todolists-reducer";
import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: taskReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store
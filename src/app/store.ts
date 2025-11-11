import {taskReducer} from "../features/Todolists/task-reducer";
import {todolistsReducer} from "../features/Todolists/todolists-reducer";
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
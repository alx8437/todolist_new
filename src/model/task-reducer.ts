import {TaskStateType} from "../App";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer";


type ActionsTypes =
    ReturnType<typeof deleteTodolistAC> |
    ReturnType<typeof createTodolistAC>


export const taskReducer = (state: TaskStateType, action: ActionsTypes): TaskStateType => {
    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }

        case "delete_todolist": {
            const newState = {...state};
            delete newState[action.payload.id];

            return newState
        }

        default: {
            return state
        }
    }

}
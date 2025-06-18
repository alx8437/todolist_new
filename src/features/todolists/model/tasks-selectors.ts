import {RootState} from "../../../app/store";
import {TaskStateType} from "./tasks-reducer";

export const selectTasks = (state: RootState): TaskStateType => state.tasks;
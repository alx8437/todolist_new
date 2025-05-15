import {RootState} from "../app/store";
import {TaskStateType} from "../app/App";

export const selectTasks = (state: RootState): TaskStateType => state.tasks;
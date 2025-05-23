import React, {ChangeEvent} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, TaskType} from "./model/tasks-reducer";
import {Checkbox, IconButton, List, ListItem} from "@mui/material";
import {getListItemSx} from "./TodolistItem.styles";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {useAppDispatch} from "./common/hooks/useAppDispatch";
import {useAppSelector} from "./common/hooks/useAppSelector";
import {selectTasks} from "./model/tasks-selectors";
import {TodolistType} from "./model/todolists-reducer";

type TasksPropsType = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: TasksPropsType) => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(selectTasks);
    const {filter, id} = todolist

    let tasksForTodolist: Array<TaskType> = tasks[id];

    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
    }

    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
    }

    return (
        <List>
            {tasksForTodolist.map(task => {
                const removeTask = () => {
                    const action = deleteTaskAC({taskId: task.id, todolistId: id})
                    dispatch(action);
                }

                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    const newStatusValue = e.currentTarget.checked
                    const action = changeTaskStatusAC({todolistId: id, taskId: task.id, isDone: newStatusValue})

                    dispatch(action)
                }

                const changeTaskTitle = (title: string) => {
                    const action = changeTaskTitleAC({todolistId: id, taskId: task.id, title})
                    dispatch(action)
                }

                return <ListItem
                    key={task.id}
                    sx={getListItemSx(task.isDone)}
                >
                    <div>
                        <Checkbox onChange={changeTaskStatus} checked={task.isDone}/>
                        <EditableSpan onChange={changeTaskTitle} value={task.title}/>
                    </div>
                    <IconButton onClick={removeTask}>
                        <Delete />
                    </IconButton>
                </ListItem>
            })}
        </List>
    );
};

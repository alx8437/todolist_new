import React from 'react';
import {TaskType} from "./model/tasks-reducer";
import {List} from "@mui/material";
import {useAppSelector} from "./common/hooks/useAppSelector";
import {selectTasks} from "./model/tasks-selectors";
import {TodolistType} from "./model/todolists-reducer";
import {TaskItem} from "./TaskItem";

type TasksPropsType = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: TasksPropsType) => {
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
            {tasksForTodolist.map(task => (
                 <TaskItem key={task.id} task={task} todolistId={todolist.id}/>
            ))}
        </List>
    );
};

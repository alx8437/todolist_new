import React, {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm";
import {EditableSpan} from "./EditableSpan";
import {Box, Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {containerSx, getListItemSx} from "./TodolistItem.styles";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTaskAC,
    TaskFilterType,
    TaskType
} from "./model/tasks-reducer";
import {useAppSelector} from "./common/hooks/useAppSelector";
import {selectTasks} from "./model/tasks-selectors";
import {changeTodolistFilterAC, TodolistType} from "./model/todolists-reducer";
import {useAppDispatch} from "./common/hooks/useAppDispatch";
import {TodolistTitle} from "./TodolistTitle";

type PropsType = {
    todolist: TodolistType
}

export function TodolistItem({todolist}: PropsType) {
    const {id, filter} = todolist;

    const tasks = useAppSelector(selectTasks);

    let tasksForTodolist: Array<TaskType> = tasks[id];

    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
    }

    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
    }

    const dispatch = useAppDispatch();

    const addTask = (title: string) => {
        const action = addTaskAC({title, todolistId: id})
        dispatch(action)
    }

    const changeTodolistFilter = (value: TaskFilterType, todolistId: string) => {
        const action = changeTodolistFilterAC({id: todolistId, filter: value});
        dispatch(action)
    }

    return (
        <div>
            <TodolistTitle todolist={todolist} />
            <CreateItemForm onCreateItem={addTask} />
            <div>
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
                <Box sx={containerSx}>
                    <Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={() => changeTodolistFilter('all', id)}>All</Button>
                    <Button variant={filter === 'active' ? 'contained' : 'outlined'} onClick={() => changeTodolistFilter("active", id)}>Active</Button>
                    <Button variant={filter === 'completed' ? 'contained' : 'outlined'} onClick={() => changeTodolistFilter("completed", id)}>Completed</Button>
                </Box>
            </div>
        </div>
    )
}
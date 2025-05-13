import React, {ChangeEvent} from "react";
import {TaskFilterType, TaskType} from "./app/App";
import {CreateItemForm} from "./CreateItemForm";
import {EditableSpan} from "./EditableSpan";
import {Box, Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {containerSx, getListItemSx} from "./TodolistItem.styles";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void;
    changeFilter: (filter: TaskFilterType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, status: boolean, todolistId: string) => void
    filter: TaskFilterType
    todolistId: string
    removeTodolist: (todolistId: string) => void;
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
    onChangeTodolistTitle: (todolistId: string, title: string) => void;
}

export function TodolistItem(props: PropsType) {
    const {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        filter,
        todolistId,
        removeTodolist,
        changeTaskTitle,
        onChangeTodolistTitle,
    } = props


    const onAllClickHandler = () => changeFilter('all', todolistId);
    const onActiveClickHandler = () => changeFilter('active', todolistId);
    const onCompletedClickHandler = () => changeFilter('completed', todolistId);
    const onRemoveTodolist = () => removeTodolist(todolistId);
    const changeTodolistTitleHandler = (title: string) => onChangeTodolistTitle(todolistId, title)

    const createTaskHandler = (title: string) => {
        addTask(title, todolistId)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
                <IconButton onClick={onRemoveTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <CreateItemForm onCreateItem={createTaskHandler} />
            <div>
                <List>
                    {tasks.map(task => {
                        const removeTaskHandler = () => {
                            removeTask(task.id, todolistId);
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue, todolistId)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(todolistId, task.id, title)
                        }

                        return <ListItem
                                    key={task.id}
                                    sx={getListItemSx(task.isDone)}
                                >
                            <div>
                                <Checkbox onChange={changeTaskStatusHandler} checked={task.isDone}/>
                                <EditableSpan onChange={changeTaskTitleHandler} value={task.title}/>
                            </div>
                                    <IconButton onClick={removeTaskHandler}>
                                        <Delete />
                                    </IconButton>
                        </ListItem>
                    })}
                </List>
                <Box sx={containerSx}>
                    <Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={onAllClickHandler}>All</Button>
                    <Button variant={filter === 'active' ? 'contained' : 'outlined'} onClick={onActiveClickHandler}>Active</Button>
                    <Button variant={filter === 'completed' ? 'contained' : 'outlined'} onClick={onCompletedClickHandler}>Completed</Button>
                </Box>
            </div>
        </div>
    )
}
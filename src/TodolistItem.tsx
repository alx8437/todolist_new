import React, {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm";
import {EditableSpan} from "./EditableSpan";
import {Box, Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {containerSx, getListItemSx} from "./TodolistItem.styles";
import {TaskFilterType, TaskType} from "./model/tasks-reducer";
import {useAppSelector} from "./common/hooks/useAppSelector";
import {selectTasks} from "./model/tasks-selectors";
import {TodolistType} from "./model/todolists-reducer";

type PropsType = {
    todolist: TodolistType
    removeTask: (taskId: string, todolistId: string) => void;
    changeFilter: (filter: TaskFilterType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, status: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void;
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
    onChangeTodolistTitle: (todolistId: string, title: string) => void;
}

export function TodolistItem(props: PropsType) {
    const {
        todolist: {title, filter, id},
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        removeTodolist,
        changeTaskTitle,
        onChangeTodolistTitle,
    } = props

    const tasks = useAppSelector(selectTasks);

    let tasksForTodolist: Array<TaskType> = tasks[id];

    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
    }

    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
    }

    const onAllClickHandler = () => changeFilter('all', id);
    const onActiveClickHandler = () => changeFilter('active', id);
    const onCompletedClickHandler = () => changeFilter('completed', id);
    const onRemoveTodolist = () => removeTodolist(id);
    const changeTodolistTitleHandler = (title: string) => onChangeTodolistTitle(id, title)

    const createTaskHandler = (title: string) => {
        addTask(title, id)
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
                    {tasksForTodolist.map(task => {
                        const removeTaskHandler = () => {
                            removeTask(task.id, id);
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue, id)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, task.id, title)
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
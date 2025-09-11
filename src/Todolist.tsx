import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {FilterValuesType, TaskType} from "./App";
import {Task} from "./Task";

type TodolistPropsType = {
    todolistId: string
    title: string
    changeFilter: (filterValue: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void;
    changeTodolistTitle: (todolistId: string, title: string) => void;
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    const {title, changeFilter, filter, todolistId, removeTodolist, changeTodolistTitle} = props

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[todolistId]);

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    const addTask = useCallback((title: string) => {
        const action = addTaskAC(todolistId, title)
        dispatch(action);
    }, [dispatch, todolistId])

    const changeFilterTasks = (filterValue: FilterValuesType) => {
        changeFilter(filterValue, todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const onChangeTodolistTitle = useCallback((title: string) => {
        changeTodolistTitle(todolistId, title)
    }, [changeTodolistTitle, todolistId])

    return (
        <div>
            <div className='todolist-title-container'>
                <h3>
                    <EditableSpan title={title} onChange={onChangeTodolistTitle}/>
                    <IconButton onClick={removeTodolistHandler}>
                        <Delete />
                    </IconButton>
                </h3>
            </div>
            <AddItemForm addItem={addTask} />
            <div>
                {tasksForTodolist.length === 0 ? (<div>Тасок нет</div>) : (<div>
                    {tasksForTodolist.map(task => <Task key={task.id} todolistId={todolistId} task={task} />)}
                </div>)}
                <div>
                    <Button variant={filter === 'all' ? 'contained' : 'text'} color={"inherit"} onClick={() => changeFilterTasks('all')}>All</Button>
                    <Button variant={filter === 'active' ? 'contained' : 'text'} color={"primary"}  onClick={() => changeFilterTasks('active')}>Active</Button>
                    <Button variant={filter === 'completed' ? 'contained' : 'text'} color={'secondary'} onClick={() => changeFilterTasks('completed')}>Completed</Button>
                </div>
            </div>
        </div>
    )
})
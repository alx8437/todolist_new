import React, {useState} from 'react';
import './App.css';
import {TodolistItem} from "../TodolistItem";

import {CreateItemForm} from "../CreateItemForm";
import {AppBar, CssBaseline, IconButton, Paper, Switch, Toolbar} from "@mui/material";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {Menu} from '@mui/icons-material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import {containerSx} from "../TodolistItem.styles";
import {NavButton} from "../NavButton";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
} from "../model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "../model/tasks-reducer";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {RootState} from "./store";
import {selectTodolists} from "../model/todolists-selectors";
import {selectTasks} from "../model/tasks-selectors";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TaskFilterType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string,
    title: string,
    filter: TaskFilterType,
}

export type TaskStateType = Record<string, TaskType[]>

type ThemeMode = 'dark' | 'light'


function App() {

    const todolists = useAppSelector(selectTodolists);
    const tasks = useAppSelector(selectTasks);

    const dispatch = useAppDispatch();

    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#5c10cd'
            }
        }
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    }

    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC({title, todolistId})

        dispatch(action)
    }

    const removeTask = (taskId: string, todolistId: string) => {
        const action = deleteTaskAC({taskId, todolistId})
        dispatch(action);
    }

    const changeTodolistFilter = (value: TaskFilterType, todolistId: string) => {
        const action = changeTodolistFilterAC({id: todolistId, filter: value});
        dispatch(action)
    }

    const changeTaskStatus = (taskId: string, status: boolean, todolistId: string) => {
        const action = changeTaskStatusAC({todolistId, taskId, newStatus: status})

        dispatch(action)
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        const action = changeTaskTitleAC({todolistId, taskId, title})
        dispatch(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = deleteTodolistAC({id: todolistId})
        dispatch(action)
    }

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title);
        dispatch(action)
    }

    const onChangeTodolistTitle = (todolistId: string, title: string) => {
        const action = changeTodolistTitleAC({title, id: todolistId})
        dispatch(action)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar sx={{mb: '30px'}} position={'static'}>
                <Toolbar>
                    <Container maxWidth={'lg'} sx={containerSx}>
                        <IconButton color={'inherit'}>
                            <Menu/>
                        </IconButton>
                        <div>
                            <NavButton>Sign in</NavButton>
                            <NavButton>Sign up</NavButton>
                            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                            <Switch color={'default'} onChange={changeMode} />
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>

            <Container maxWidth={'lg'}>
                <Grid sx={{mb: '30px'}} container>
                    <CreateItemForm onCreateItem={createTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolists.map(tl => {
                        let tasksForTodolist: Array<TaskType> = tasks[tl.id];

                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                        }

                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                        }

                        return <Paper key={tl.id} sx={{p: '0 20px 20px 20px'}}>
                            <TodolistItem
                                todolistId={tl.id}
                                filter={tl.filter}
                                changeTaskStatus={changeTaskStatus}
                                addTask={addTask}
                                changeFilter={changeTodolistFilter}
                                removeTask={removeTask} title={tl.title}
                                tasks={tasksForTodolist}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                onChangeTodolistTitle={onChangeTodolistTitle}
                            />
                        </Paper>
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App;

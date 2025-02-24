import React, {useState} from 'react';
import './App.css';
import { TodolistItem } from "./TodolistItem";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm";
import {AppBar, IconButton, Paper, Toolbar} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {Menu} from '@mui/icons-material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import {containerSx} from "./TodolistItem.styles";
import {NavButton} from "./NavButton";

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

type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#5c10cd'
            }
        }
    })

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: "What to bye", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
        ]
    })

    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false};
        tasks[todolistId] = [newTask, ...tasks[todolistId]]

        setTasks({...tasks});
    }

    const removeTask = (taskId: string, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].filter(task => task.id !== taskId)
        setTasks({...tasks});
    }

    const changeFilter = (value: TaskFilterType, todolistId: string) => {
        const filteredTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl)
        setTodolists(filteredTodolists)
    }

    const changeTaskStatus = (taskId: string, status: boolean, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: status} : task)
        setTasks({...tasks})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }

    const removeTodolist = (todolistId: string) => {
        const filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist);

        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const createTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {id: todolistId, title, filter: 'all'};

        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const onChangeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
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
                                            changeFilter={changeFilter}
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
            </div>
        </ThemeProvider>
    );
}

export default App;

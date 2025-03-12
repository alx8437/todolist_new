import {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {Menu} from "@mui/icons-material";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, filter: 'all', title: 'What to learn'},
        {id: todolistId2, filter: 'all', title: 'What to buy'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Jam', isDone: true},
            {id: v1(), title: 'Tomato', isDone: false},
            {id: v1(), title: 'Onion', isDone: true}
        ]
    })

    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false,
        }

        setTasks({
            ...tasks,
            [todolistId]: [
                newTask,
                ...tasks[todolistId]
            ]
        })
    }

    const removeTask = (taskId: string, todolistId: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
        }

        setTasks(newTodolistTasks)
    };

    const changeFilter = (filterValue: FilterValuesType, todolistId: string) => {
        const newTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, filter: filterValue} : tl)

        setTodolists(newTodolists)
    }


    const changeStatus = (taskId: string, todolistId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)
        })
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))

        delete tasks[todolistId]

        setTasks({...tasks})
    }

    const addTodolistHandler = (title: string) => {
        const todolistId =  v1();

        const newTodolist: TodolistType = {
            id: todolistId,
            title,
            filter: "all",
        }

        setTodolists([newTodolist, ...todolists])

        setTasks({...tasks, [todolistId]: []})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolistHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        const allTodolistTasks = tasks[tl.id]

                        let tasksForTodolist = allTodolistTasks

                        if (tl.filter === 'active') {
                            tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                        }

                        if (tl.filter === 'completed') {
                            tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                        }

                        return (
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    todolistId={tl.id}
                                    key={tl.id}
                                    filter={tl.filter}
                                    changeStatus={changeStatus}
                                    addTask={addTask}
                                    changeFilter={changeFilter}
                                    removeTask={removeTask}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        )
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default App;

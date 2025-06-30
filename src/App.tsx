import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {useCallback} from "react";

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

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function App() {
    const dispatch = useDispatch();

    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((filterValue: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, filterValue);
        dispatch(action);
    },[dispatch])

    const addTodolistHandler = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        const action = changeTodolistTitleAC(todolistId, title);
        dispatch(action);
    }, [dispatch])

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
                        return (
                            <Paper key={tl.id} style={{padding: "10px"}}>
                                <Todolist
                                    todolistId={tl.id}
                                    filter={tl.filter}
                                    changeFilter={changeFilter}
                                    title={tl.title}
                                    removeTodolist={removeTodolist}
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


import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC, fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {useCallback, useEffect} from "react";
import {Paper} from "@mui/material";
import {Todolist} from "./Todolist/Todolist";
import Grid from "@mui/material/Grid2";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";

export const Todolists = () => {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])

    const changeFilter = useCallback((filterValue: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, filterValue);
        dispatch(action);
    },[dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])

    const addTodolistHandler = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    },[dispatch])

    return (
        <>
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
        </>
    )
}
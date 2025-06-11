import React from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {CreateItemForm} from "../CreateItemForm";
import {createTodolistAC} from "../model/todolists-reducer";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {Todolists} from "../Todolists";

export const Main = () => {

    const dispatch = useAppDispatch();

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title);
        dispatch(action)
    }

    return (
        <Container maxWidth={'lg'}>
            <Grid sx={{mb: '30px'}} container>
                <CreateItemForm onCreateItem={createTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>

    );
};

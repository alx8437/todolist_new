import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskType} from "../api/types";
import {Todolists} from "../features/Todolists/Todolists";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function App() {
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
                <Todolists />
            </Container>

        </div>
    );
}


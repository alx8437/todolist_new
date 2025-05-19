import React from 'react';
import './App.css';
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles'
import {useAppSelector} from "common/hooks/useAppSelector";
import {selectTheme} from "app/app-seleclors";
import {getTheme} from "common/theme/theme";
import Header from "../Header";
import {Main} from "./Main";

function App() {
    const themeMode = useAppSelector(selectTheme);
    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Main />
        </ThemeProvider>
    );
}

export default App;

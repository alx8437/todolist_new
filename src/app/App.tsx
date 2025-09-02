import React from 'react';
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles'
import {useAppSelector} from "common/hooks";
import {selectTheme} from "app/app-seleclors";
import {Main} from "./Main";
import styles from './App.module.css';
import {Header} from "../common/components";
import {getTheme} from "../common/theme";

function App() {
    const themeMode = useAppSelector(selectTheme);
    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.app}>
                <CssBaseline/>
                <Header/>
                <Main/>
            </div>
        </ThemeProvider>
    );
}

export default App;

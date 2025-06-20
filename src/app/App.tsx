import React from 'react';
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles'
import {useAppSelector} from "common/hooks/useAppSelector";
import {selectTheme} from "app/app-seleclors";
import {getTheme} from "common/theme/theme";
import Header from "../common/components/Header/Header";
import {Main} from "./Main";
import styles from './App.module.css';

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

import React from 'react';
import {AppBar, IconButton, Switch, Toolbar} from "@mui/material";
import Container from "@mui/material/Container";
import {containerSx} from "./TodolistItem.styles";
import {Menu} from "@mui/icons-material";
import {NavButton} from "./NavButton";
import {changeThemeModeAC} from "./app/app-reducer";
import {useAppDispatch} from "./common/hooks/useAppDispatch";
import {useAppSelector} from "./common/hooks/useAppSelector";
import {selectTheme} from "./app/app-seleclors";
import {getTheme} from "./common/theme/theme";

export const Header = () => {
    const dispatch = useAppDispatch();
    const themeMode = useAppSelector(selectTheme);
    const theme = getTheme(themeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }

    return (
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
    );
};

export default Header;
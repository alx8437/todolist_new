import React from 'react';
import {AppBar, IconButton, Switch, Toolbar} from "@mui/material";
import Container from "@mui/material/Container";
import {Menu} from "@mui/icons-material";
import {changeThemeModeAC} from "../../../app/app-reducer";
import {selectTheme} from "../../../app/app-seleclors";
import {getTheme} from "../../theme";
import {containerSx} from "../../styles";
import {NavButton} from "../NavButton/NavButton";
import {useAppDispatch, useAppSelector} from "../../hooks";

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
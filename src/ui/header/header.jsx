import React from 'react';
import {AppBar, Container, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Menu from "../menu/menu";
import {observer} from "mobx-react-lite";
import AuthStore from "../../bll/auth-store";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 0',
        [theme.breakpoints.down('xs')]: {
            width: 340
        },
    },
    brand: {
        fontSize: 25,
        fontFamily: "'Montserrat', sans-serif",
        textShadow: '#000 2px 2px 5px',
        textTransform: 'uppercase',
        margin: '0 20px',
        textAlign: 'center',
        flexGrow: 1,
        '& span' : {
            whiteSpace: 'pre'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 16,
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
        },
    },
    contact: {
        fontSize: 16,
        display: 'flex',
        flexDirection: 'column',
        textShadow: '#000 2px 2px 5px',
        '& span': {
            whiteSpace: 'pre'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 10,
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    }
}))


const Header = (props) => {
    const classes = useStyles()

    const isAuth = AuthStore.isAuth

    return (
        <AppBar position="static">
            <Container fixed className={classes.root}>
                <Menu isAuth={isAuth} logout={AuthStore.logout}/>
                <div className={classes.brand}>
                    <span>Федерация плавания</span> <span>Самарской области</span>
                </div>
                <div className={classes.contact}>
                    <span>Самара, Волжский проспект, 10</span>
                    <span>8 (846) 375-92-45</span>
                    <span>swimclub@mail.ru</span>
                </div>
            </Container>
        </AppBar>
    );
};

export default observer(Header);




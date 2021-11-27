import React from 'react';
import {observer} from "mobx-react-lite";
import {Box, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Header from "../header/header";


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 50
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))


const Competitions = (props) => {
    const classes = useStyles();

    return (
        <>
            <Header title={'Соревнования'}/>
            <Box className={classes.root}>
                <Container fixed>
                    Competitions
                </Container>
            </Box>
        </>

    );
};

export default observer(Competitions);
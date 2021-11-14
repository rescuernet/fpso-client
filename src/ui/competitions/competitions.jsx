import React from 'react';
import {observer} from "mobx-react-lite";
import {Box, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 50
    }
}))


const Competitions = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Container fixed>
                Competitions
            </Container>
        </Box>
    );
};

export default observer(Competitions);
import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        backgroundColor: '#f7f7f7',
        paddingTop: 50,
    },
}))

const CompetitionsEdit = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>

        </Box>
    );
};

export default observer(CompetitionsEdit);
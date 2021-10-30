import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {

    },
}))

const MainNews = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>

        </Box>
    );
};

export default MainNews;
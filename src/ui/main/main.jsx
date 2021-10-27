import React from 'react';
import {observer} from "mobx-react-lite";
import {Box, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Brand from "./brand";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 50
    }
}))


const Main = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Brand/>
            <Container fixed style={{backgroundColor: '#ccc', padding: 0, display: 'flex',justifyContent: "space-evenly", flexWrap:"wrap" }}>
                <div style={{backgroundColor: 'red',width: 360,height: 300, border: '1px solid #ccc'}}>sdf</div>
                <div style={{backgroundColor: 'red',width: 360,height: 300, border: '1px solid #ccc'}}>sdf</div>
                <div style={{backgroundColor: 'red',width: 360,height: 300, border: '1px solid #ccc'}}>sdf</div>
            </Container>
        </Box>

    );
};

export default observer(Main);
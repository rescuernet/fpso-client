import React from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Brand from "./brand";

const useStyles = makeStyles((Theme) => ({

}))


const Main = () => {
    const classes = useStyles();

    return (
        <div>
            <Brand/>
            <Container fixed>
            </Container>
        </div>

    );
};

export default observer(Main);
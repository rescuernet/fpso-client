import React from 'react';
import {observer} from "mobx-react-lite";
import AuthStore from "../../bll/auth-store";
import {Grid} from "@material-ui/core";


const Main = (props) => {
    const isAuth = AuthStore.isAuth
    return (
        <>
            <Grid container>
                <Grid xs={2} style={{border:'1px solid #333'}}>1</Grid>
                <Grid xs={2} style={{border:'1px solid #333'}}>2</Grid>
                <Grid xs={8} style={{border:'1px solid #333'}}>1</Grid>
                <Grid xs={12} style={{border:'1px solid #333'}}>2</Grid>
            </Grid>
        </>

    );
};

export default observer(Main);
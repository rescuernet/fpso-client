import React from 'react';
import {observer} from "mobx-react-lite";
import {Grid} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {RM} from "../../routes/routes";


const Main = (props) => {

    return (
        <>
            <Grid container>
                <Grid xs={2} style={{border:'1px solid #333'}}>1sdfsd</Grid>
                <Grid xs={2} style={{border:'1px solid #333'}}>2</Grid>
                <Grid xs={8} style={{border:'1px solid #333'}}>1</Grid>
                <Grid xs={12} style={{border:'1px solid #333'}}>2</Grid>
            </Grid>
            
            <NavLink to={RM.AdminA.getUrl('a')}>adminA</NavLink>
        </>

    );
};

export default observer(Main);
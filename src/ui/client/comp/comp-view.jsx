import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import {runInAction, toJS} from "mobx";
import UiCompStore from "../../../bll/ui/ui-comp-store";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Header from "../header/header";

const useStyles = makeStyles({
    root: {
        height: '100%',
        backgroundColor: '#f7f7f7',
        paddingTop: 50,
    },
})

const CompView = (props) => {
    const classes = useStyles();
    const comp = toJS(UiCompStore.compOne)
    const { id } = useParams();

    /*useEffect(()=>{
        runInAction(()=>{
            UiCompStore.getCompId(id)
        })
        return ()=> {
            runInAction(()=>{
                UiCompStore.compOne = null
            })
        }
    },[id])*/

    return (
        <>
            <Header title={'Соревнования'}/>
            <Box className={classes.root}>
                CompView
            </Box>
        </>

    );
};

export default observer(CompView);
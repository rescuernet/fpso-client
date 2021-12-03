import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Container} from "@material-ui/core";
import {runInAction, toJS} from "mobx";
import UiCompStore from "../../../bll/ui/ui-comp-store";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Header from "../header/header";
import {API_URL} from "../../../const/const";
import {useGridPoint} from "../../../utils/breakpoints";
import s from "./comp-view.module.css"

const useStyles = makeStyles({
    root: {
        height: '100%',
        paddingTop: 50,
    },
    container: {
        minHeight: '100%',
        display: "flex",
        justifyContent: "center",
    },
    comp: {
        width: 760,
        [useGridPoint.breakpoints.down('md')]: {
            width: 600,
        },
        [useGridPoint.breakpoints.down('xs')]: {
            width: 340,
        },
        backgroundColor: '#fff',
        padding: 20
    },
    header: {
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
        [useGridPoint.breakpoints.down('xs')]: {
            flexDirection: 'column',
            marginBottom: 0
        },
    },
    avatar: {
        display: "flex",
        justifyContent: "center",
        flex: '0 0 auto',
        fontSize: 0,
        '& img': {
            borderRadius: 10,
        }
    },
    headerFirst: {
        fontSize: '130%',
        fontWeight: 700,
        fontFamily: 'Roboto',
        margin: '0 40px',
        [useGridPoint.breakpoints.down('md')]: {
            margin: '0 20px',
        },
        [useGridPoint.breakpoints.down('xs')]: {
            margin: '20px 0',
        },
    },
})

const CompView = (props) => {
    const classes = useStyles();
    const comp = toJS(UiCompStore.compOne)
    const { id } = useParams();


    useEffect(()=>{
        runInAction(()=>{
            UiCompStore.getCompId(id)
        })
        return ()=> {
            runInAction(()=>{
                UiCompStore.compOne = null
            })
        }
    },[id])

    return (
        <>
            <Header title={'Соревнования'}/>
            {comp &&
            <Box className={classes.root}>
                <Container className={classes.container} fixed>
                    <Box className={classes.comp}>
                        <div className={classes.header}>
                            <div className={classes.avatar}>
                                <img src={
                                    comp.avatar
                                        ? `${API_URL}/competitions/${comp._id}/avatar/${comp.avatar}`
                                        : null
                                } alt=""/>
                            </div>
                            <div>
                                <div className={`${classes.headerFirst} ${s.headerText}`}>
                                    {comp.headerFirst}
                                </div>
                            </div>
                        </div>
                    </Box>
                </Container>
            </Box>
            }

        </>

    );
};

export default observer(CompView);
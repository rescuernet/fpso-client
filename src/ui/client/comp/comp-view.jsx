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
import * as dateFns from "date-fns";

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
        marginBottom: 20,
        [useGridPoint.breakpoints.down('xs')]: {
            flexDirection: 'column',
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
    dateWrap: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column"
    },
    date: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ff6000',
        fontWeight: 'bold',
        fontSize: '100%',
        color: '#fff',
        margin: '20px 10px 0 10px',
        padding: '5px 0',
        [useGridPoint.breakpoints.down('xs')]: {
            margin: '20px 0',
        },
    },
    headerFirstWrap: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
    },
    headerFirst: {
        fontSize: '130%',
        fontWeight: 700,
        margin: '0 40px',
        lineHeight: '1.5',
        [useGridPoint.breakpoints.down('md')]: {
            margin: '0 20px',
        },
        [useGridPoint.breakpoints.down('xs')]: {
            margin: 0,
            lineHeight: 'normal',
        },
    },
    location: {
        backgroundColor: '#ff6000',
        color: '#fff',
        padding: '5px 0',
        textAlign: "center",
        marginBottom: 20
    },
    text: {
        fontSize: '110%',
        lineHeight: '1.8',
    }
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

    const curDate = Date.parse(dateFns.format(new Date(), 'MM.dd.yyyy'))
    const compDateEnd = comp?.dateEnd && Date.parse(dateFns.format(new Date(comp.dateEnd), 'MM.dd.yyyy'))

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
                            <div className={classes.dateWrap}>
                                <div className={classes.date}>
                                    {comp.dateStart === comp.dateEnd
                                        ? dateFns.format(new Date(comp.dateStart), 'dd.MM.yyyy')
                                        : `${dateFns.format(new Date(comp.dateStart), 'dd.MM.yyyy')} - ${dateFns.format(new Date(comp.dateEnd), 'dd.MM.yyyy')}`}
                                </div>
                                <div className={classes.headerFirstWrap}>
                                    <div className={`${classes.headerFirst} ${s.headerText}`}>
                                        {comp.headerFirst}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={classes.location}>
                            {comp.location}
                        </div>
                        <div className={classes.text}>
                            {comp.textMain}
                        </div>
                    </Box>
                </Container>
            </Box>
            }

        </>

    );
};

export default observer(CompView);
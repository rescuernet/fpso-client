import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Container, Divider} from "@material-ui/core";
import {runInAction, toJS} from "mobx";
import UiCompStore from "../../../../bll/ui/ui-comp-store";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Header from "../../header/header";
import {HTTPS_PROTOCOL, YA_ENDPOINT, YA_PUBLIC_BUCKET} from "../../../../const/const";
import {useGridPoint} from "../../../../utils/breakpoints";
import s from "./comp-view.module.css"
import * as dateFns from "date-fns";
import CompViewDocs from "./comp-view-docs";
import CompViewResults from "./comp-view-results/comp-view-results";

const useStyles = makeStyles({
    root: {
        height: '100%',
        paddingTop: 50,
        '& .MuiDivider-root': {
            marginBottom: 20
        }
    },
    container: {
        minHeight: '100%',
        display: "flex",
        justifyContent: "center",
    },
    comp: {
        width: 760,
        [useGridPoint.breakpoints.down('md')]: {
            width: 700,
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
        margin: '0 20px 0 0',
        fontSize: 0,
        '& img': {
            borderRadius: 10,
        },
        [useGridPoint.breakpoints.down('xs')]: {
            margin: '0 0 20px 0',
        },
    },
    dateWrap: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column"
    },
    date: {
        textAlign: "center",
        backgroundColor: '#ff6000',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        padding: '5px 0',
    },
    location: {
        padding: '5px 5px 15px 5px',
        marginBottom: 10,
        borderBottom: '1px solid #ccc'
    },
    headerFirstWrap: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
    },
    headerFirst: {
        fontSize: '130%',
        fontWeight: 700,
        lineHeight: '1.5',
        [useGridPoint.breakpoints.down('xs')]: {
            margin: 0,
            lineHeight: 'normal',
        },
    },

    text: {
        fontSize: '110%',
        lineHeight: '1.8',
        marginBottom: 20
    },
    docs: {},
    docsHeader: {
        fontWeight: 'bold',
        textAlign: "center"
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
                                        ? `${HTTPS_PROTOCOL}${YA_PUBLIC_BUCKET}.${YA_ENDPOINT}/${comp.avatar}`
                                        : null
                                } alt=""/>
                            </div>
                            <div className={classes.dateWrap}>
                                <div className={classes.date}>
                                    {comp.dateStart === comp.dateEnd
                                        ? dateFns.format(new Date(comp.dateStart), 'dd.MM.yyyy')
                                        : `${dateFns.format(new Date(comp.dateStart), 'dd.MM.yyyy')} - ${dateFns.format(new Date(comp.dateEnd), 'dd.MM.yyyy')}`}
                                </div>
                                <div className={classes.location}>{comp.location}</div>
                                <div className={classes.headerFirstWrap}>
                                    <div className={`${classes.headerFirst} ${s.headerText}`}>
                                        {comp.headerFirst}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <Divider/>
                        <div className={classes.text}>{comp.textMain}</div>
                        <Divider/>

                        {comp.docs.length > 0 &&
                            <>
                                <div className={classes.docs}>
                                    <div className={classes.docsHeader}>Документы соревнования</div>
                                    {comp.docs.map((item,index)=>(
                                        <CompViewDocs key={index} index={index} item={item} compId={id}/>
                                    ))}
                                </div>
                                <Divider/>
                            </>
                        }

                        {comp.results.length > 0 &&
                            <CompViewResults/>
                        }
                    </Box>
                </Container>
            </Box>
            }

        </>

    );
};

export default observer(CompView);
import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Box, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Brand from "./brand";
import MainNews from "./news/main-news";
import {runInAction, toJS} from "mobx";
import UiNewsStore from '../../bll/ui-news-store'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        backgroundColor: '#f7f7f7',
    },
    container: {
        marginTop: 30
    },
    headerSection: {
        fontFamily: 'Roboto',
        fontSize: '1.5rem',
        color: '#005580',
        marginBottom: 10,
        display: 'inline-block',
        borderBottom: '1px solid #005580',
        padding: '0 30px 5px 0'
    },
    lastNews: {

    }
}))


const Main = () => {
    const classes = useStyles();

    const lastNews = toJS(UiNewsStore.news_for_main)

    useEffect(()=>{
        runInAction(()=>{
            UiNewsStore.getNewsForMain(3)
        })
    },[])

    console.log(lastNews)


    return (
        <Box className={classes.root}>
            <Brand/>
            <Container className={classes.container} fixed>
                <div className={classes.lastNews}>
                    <div className={classes.headerSection}>Последние новости</div>
                </div>
                <MainNews/>
            </Container>
        </Box>

    );
};

export default observer(Main);
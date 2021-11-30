import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Box, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Brand from "./brand";
import {runInAction, toJS} from "mobx";
import UiNewsStore from '../../../bll/ui/ui-news-store'
import NewsCardDesktop from "../news/news-card/news-card-desktop";
import Store from "../../../bll/store";
import {NewsCardMobile} from "../news/news-card/news-card-mobile";
import {useGridPoint} from "../../../utils/breakpoints";
import Header from "../header/header";
import {NavLink} from "react-router-dom";
import {UI_RM} from "../../../routes/ui-routes";


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 50,
    },
    container: {
        marginTop: 30
    },
    headerSection: {
        fontFamily: 'Roboto',
        fontSize: '1rem',
        color: '#005580',
        marginBottom: 10,
        display: 'inline-block',
        borderBottom: '1px solid #005580',
        padding: '0 30px 5px 0'
    },
    lastNews: {

    },
    lastNewsItems: {
        marginTop: 10,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        [useGridPoint.breakpoints.down('md')]: {
            justifyContent: "center",
        }
    }
}))


const Main = () => {
    const classes = useStyles();

    const lastNews = toJS(UiNewsStore.news_for_main)

    useEffect(()=>{
        runInAction(()=>{UiNewsStore.getNewsForMain(2)})
        return ()=> {
            runInAction(()=>{
                UiNewsStore.news_for_main= []
            })
        }
    },[])


    return (
        <>
            <Header title={'Главная'}/>
            <Box className={classes.root}>
                <Brand/>
                <Container className={classes.container} fixed>
                    <div className={classes.lastNews}>
                        <NavLink to={UI_RM.News.path}>
                            <div className={classes.headerSection}>Последние новости</div>
                        </NavLink>
                        <div className={classes.lastNewsItems}>
                            {Store.width < 750 &&
                            lastNews.map((i,index)=>(
                                <NewsCardMobile key={index} news={i} />
                            ))
                            }

                            {Store.width >= 750 &&
                            lastNews.map((i,index)=>(
                                <NewsCardDesktop key={index} news={i} />
                            ))
                            }
                        </div>
                    </div>

                </Container>
            </Box>
        </>


    );
};

export default observer(Main);
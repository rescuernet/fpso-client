import React, {useEffect} from 'react';
import {runInAction, toJS} from "mobx";
import UiStore from '../../bll/ui-store'
import {observer} from "mobx-react-lite";
import {NewsCard} from "./news-card";
import {Box, Button, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    newsListItem: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        margin: '20px 0'
    }
}))

const News = () => {

    const classes = useStyles();

    useEffect(()=>{
        runInAction(()=>{UiStore.getNews()})
    },[])
    const news = toJS(UiStore.news)


    return (
        <Container fixed>
            <Box className={classes.newsListItem}>
                {news.map((i)=>(
                    <NewsCard news={i} />
                ))}
            </Box>


        </Container>
    );
};

export default observer(News);
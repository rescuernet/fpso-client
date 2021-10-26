import React, {useEffect} from 'react';
import {runInAction, toJS} from "mobx";
import UiStore from '../../bll/ui-store'
import {observer} from "mobx-react-lite";
import {NewsCard} from "./news-card";
import {Box, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Store from "../../bll/store";
import {Pagination} from "@material-ui/lab";




const useStyles = makeStyles((theme) => ({
    newsListItem: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        margin: '20px 0'
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        margin: 40
    }
}))

const News = () => {

    const classes = useStyles();

    useEffect(()=>{
        runInAction(()=>{UiStore.getNews()})
    },[])

    const news = toJS(UiStore.news)
    const newsItem = toJS(UiStore.news.docs)


    const ChangePage = (e, page) => {
        runInAction(()=>{UiStore.getNews(page)})
    };

    return (
        <Container fixed>
            <div className={classes.pagination}>
                <Pagination
                    count={news.pages}
                    color={"primary"}
                    onChange={ChangePage}
                />
            </div>

            {newsItem &&
                <Box className={classes.newsListItem}>
                    {newsItem.map((i)=>(
                        <NewsCard news={i} />
                    ))}
                </Box>
            }
        </Container>
    );
};

export default observer(News);
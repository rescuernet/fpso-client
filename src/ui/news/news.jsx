import React, {useEffect, useState} from 'react';
import {runInAction, toJS} from "mobx";
import UiStore from '../../bll/ui-store'
import {observer} from "mobx-react-lite";
import {NewsCard} from "./news-card";
import {Box, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Store from "../../bll/store";
import {Pagination} from "@material-ui/lab";
import {useGridPoint} from "../../utils/breakpoints";


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 50,
    },
    newsListItem: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
    },
    paginationTop: {
        display: "flex",
        justifyContent: "center",
        margin: '40px 0',
        [useGridPoint.breakpoints.down('xs')]: {
            margin: '20px 0',
        }
    },
    paginationBottom: {
        display: "flex",
        justifyContent: "center",
        margin: '20px 0 40px 0'
    }
}))

const News = () => {

    const news = toJS(UiStore.news)
    const newsItem = toJS(UiStore.news.docs)

    const [pageNum,setPageNum] = useState(1)

    const classes = useStyles();

    useEffect(()=>{
        runInAction(()=>{UiStore.getNews()})
        return ()=> {
            runInAction(()=>{UiStore.news = []})
        }
    },[])

    const ChangePage = (e, page) => {
        window.scrollTo(0,0)
        setPageNum(page)
        runInAction(()=>{UiStore.getNews(page)})
    };

    return (
        <Box className={classes.root}>
            <Container fixed>
                {newsItem &&
                <>
                    <div className={classes.paginationTop}>
                        <Pagination
                            count={news.pages}
                            page={pageNum}
                            color={"primary"}
                            size={Store.width < 750 ? 'small' : 'medium'}
                            onChange={ChangePage}
                        />
                    </div>

                    <Box className={classes.newsListItem}>
                        {newsItem.map((i,index)=>(
                            <NewsCard key={index} news={i} />
                        ))}
                    </Box>

                    <div className={classes.paginationBottom}>
                        <Pagination
                            count={news.pages}
                            page={pageNum}
                            color={"primary"}
                            size={Store.width < 750 ? 'small' : 'medium'}
                            onChange={ChangePage}
                        />
                    </div>
                </>
                }
            </Container>
        </Box>

    );
};

export default observer(News);
import React, {useEffect, useState} from 'react';
import {runInAction, toJS} from "mobx";
import UiStore from '../../bll/ui-store'
import {observer} from "mobx-react-lite";
import {Box, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Store from "../../bll/store";
import {Pagination} from "@material-ui/lab";
import {useGridPoint} from "../../utils/breakpoints";
import {NewsCardMobile} from "./news-card/news-card-mobile";
import {NewsItemViewModal} from "./news-item-view-modal";
import NewsCardDesktop from "./news-card/news-card-desktop";


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 50,
        backgroundColor: '#f2f2f2'
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

    const width = Store.width

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
                        {Store.width < 750 &&
                            newsItem.map((i,index)=>(
                                <NewsCardMobile key={index} index={index} news={i} />
                            ))
                        }

                        {Store.width >= 750 &&
                        newsItem.map((i,index)=>(
                            <NewsCardDesktop key={index} index={index} news={i} />
                        ))
                        }
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
                {UiStore.newsViewModal_open &&
                    <NewsItemViewModal
                        open={UiStore.newsViewModal_open}
                    />
                }
            </Container>
        </Box>

    );
};

export default observer(News);
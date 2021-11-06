import React, {useEffect, useState} from 'react';
import {runInAction, toJS} from "mobx";
import UiNewsStore from '../../bll/ui/ui-news-store'
import {observer} from "mobx-react-lite";
import {Box, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Store from "../../bll/store";
import {Pagination} from "@material-ui/lab";
import {useGridPoint} from "../../utils/breakpoints";
import {NewsCardMobile} from "./news-card/news-card-mobile";
import {NewsItemViewModal} from "./news-view/news-item-view-modal";
import NewsCardDesktop from "./news-card/news-card-desktop";


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 50,
    },
    newsListItem: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        [useGridPoint.breakpoints.down('md')]: {
            justifyContent: "space-evenly",
        }
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

    const pagesCount = toJS(UiNewsStore.news.pages)
    const newsItem = toJS(UiNewsStore.news.docs)

    const [pageNum,setPageNum] = useState(1)

    const classes = useStyles();

    useEffect(()=>{
        runInAction(()=>{UiNewsStore.getNews()})
        return ()=> {
            runInAction(()=>{UiNewsStore.news = []})
        }
    },[])

    const ChangePage = (e, page) => {
        window.scrollTo(0,0)
        setPageNum(page)
        runInAction(()=>{UiNewsStore.getNews(page)})
    };

    return (
        <Box className={classes.root}>
            <Container fixed>
                {newsItem &&
                <>
                    <div className={classes.paginationTop}>
                        <Pagination
                            count={pagesCount}
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
                            count={pagesCount}
                            page={pageNum}
                            color={"primary"}
                            size={Store.width < 750 ? 'small' : 'medium'}
                            onChange={ChangePage}
                        />
                    </div>
                </>
                }
                {UiNewsStore.newsViewModal_open &&
                    <NewsItemViewModal
                        open={UiNewsStore.newsViewModal_open}
                    />
                }
            </Container>
        </Box>

    );
};

export default observer(News);
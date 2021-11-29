import React, {useEffect} from 'react';
import {runInAction, toJS} from "mobx";
import UiNewsStore from '../../../bll/ui/ui-news-store'
import {observer} from "mobx-react-lite";
import {Box, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Store from "../../../bll/store";
import {Pagination} from "@material-ui/lab";
import {useGridPoint} from "../../../utils/breakpoints";
import {NewsCardMobile} from "./news-card/news-card-mobile";
import NewsCardDesktop from "./news-card/news-card-desktop";
import Header from "../../client/header/header";
import {useHistory, useParams} from "react-router-dom";
import {UI_RM} from "../../../routes/ui-routes";


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
        },
        marginTop: 40
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

    const history = useHistory()
    const {page} = useParams()

    const pagesCount = toJS(UiNewsStore.news.pages)
    const pageCur = toJS(UiNewsStore.news.page)
    const newsItem = toJS(UiNewsStore.news.docs)

    const classes = useStyles();

    useEffect(()=>{
        runInAction(()=>{UiNewsStore.getNews(page)})
        return ()=> {runInAction(()=>{UiNewsStore.news = []})}
    },[page])

    const ChangePage = (e, toPage) => {
        window.scrollTo(0,0)
        history.push(UI_RM.NewsPage.getUrl(toPage))
    };

    return (
        <>
            <Header title={'Новости'}/>
            <Box className={classes.root}>
                <Container fixed className={classes.container}>
                    {newsItem &&
                    <>
                        {pagesCount > 1 &&
                        <div className={classes.paginationTop}>
                            <Pagination
                                count={pagesCount}
                                page={pageCur}
                                color={"primary"}
                                size={Store.width < 750 ? 'small' : 'medium'}
                                onChange={ChangePage}
                            />
                        </div>
                        }
                        <Box className={classes.newsListItem}>
                            {Store.width < 750 &&
                            newsItem.map((i,index)=>(
                                <NewsCardMobile key={index} news={i} />
                            ))
                            }

                            {Store.width >= 750 &&
                            newsItem.map((i,index)=>(
                                <NewsCardDesktop key={index} news={i} />
                            ))
                            }
                        </Box>
                        {pagesCount > 1 &&
                        <div className={classes.paginationBottom}>
                            <Pagination
                                count={pagesCount}
                                page={pageCur}
                                color={"primary"}
                                size={Store.width < 750 ? 'small' : 'medium'}
                                onChange={ChangePage}
                            />
                        </div>
                        }
                    </>
                    }
                </Container>
            </Box>
        </>


    );
};

export default observer(News);
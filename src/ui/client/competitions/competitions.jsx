import React, {useEffect} from 'react';
import {runInAction, toJS} from "mobx";
import UiCompStore from '../../../bll/ui/ui-comp-store'
import {observer} from "mobx-react-lite";
import {Box, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Store from "../../../bll/store";
import {Pagination} from "@material-ui/lab";
import {useGridPoint} from "../../../utils/breakpoints";
import Header from "../../client/header/header";
import {useHistory, useParams} from "react-router-dom";
import {UI_RM} from "../../../routes/ui-routes";
import CompItem from "./comp-item";


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 50,
    },
    item: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
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

const Comp = () => {

    const history = useHistory()
    const {page} = useParams()

    const pagesCount = toJS(UiCompStore.comp.pages)
    const pageCur = toJS(UiCompStore.comp.page)
    const compItem = toJS(UiCompStore.comp.docs)

    const classes = useStyles();

    /*useEffect(()=>{
        runInAction(()=>{UiCompStore.getNews(page)})
        return ()=> {runInAction(()=>{UiCompStore.comp = []})}
    },[page])*/

    const ChangePage = (e, toPage) => {
        window.scrollTo(0,0)
        history.push(UI_RM.Competitions__Page.getUrl(toPage))
    };

    return (
        <>
            <Header title={'Соревнования'}/>
            <Box className={classes.root}>
                <Container fixed>
                    <div className={classes.item}>
                        <CompItem/>
                        <CompItem/>
                        <CompItem/>
                    </div>


                    {compItem &&
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
                            {/*{Store.width < 750 &&
                            compItem.map((i,index)=>(
                                <NewsCardMobile key={index} news={i} index={index} />
                            ))
                            }

                            {Store.width >= 750 &&
                            compItem.map((i,index)=>(
                                <NewsCardDesktop key={index} news={i} index={index} />
                            ))
                            }*/}
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

export default observer(Comp);
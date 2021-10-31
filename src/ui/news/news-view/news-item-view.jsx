import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {runInAction, toJS} from "mobx";
import {useParams} from "react-router-dom";
import UiStore from "../../../bll/ui-news-store";
import {NEWS_URL} from "../../../const/const";
import noNewsAvatar from "../../../common/assets/image/no_news_avatar.jpg";
import {Box, Container, Divider} from "@material-ui/core";
import pdfIcon from "../../../common/assets/image/icons/pdf.png";
import docIcon from "../../../common/assets/image/icons/doc.png";
import docxIcon from "../../../common/assets/image/icons/docx.png";
import xlsIcon from "../../../common/assets/image/icons/xls.png";
import xlsxIcon from "../../../common/assets/image/icons/xlsx.png";
import {makeStyles} from "@material-ui/core/styles";
import {useGridPoint} from "../../../utils/breakpoints";
import Header from "../../header/header";

const useStyles = makeStyles({
    root: {
        paddingTop: 50,
    },
    container: {
        display: "flex",
        justifyContent: "center",
    },
    newsWrap: {
        maxWidth: 760,
        backgroundColor: '#fff',
        padding: 20
    },
    avatar: {
        display: "flex",
        justifyContent: "center",
        flex: '0 0 auto',
        fontSize: 0,
        padding: '20px 0',
        '& img': {
            borderRadius: 100
        }
    },
    headerFirst: {
        padding: 40,
        fontSize: '130%',
        fontWeight: 700,
        fontFamily: 'Roboto',
        [useGridPoint.breakpoints.down('xs')]: {
            padding: '20px 0',
        }
    },
    textMain: {
        flex: '1 0',
        padding: '20px 0',
        fontFamily: 'Roboto',
        lineHeight: 1.8,
        fontSize: '120%',
        textAlign: "justify",
        [useGridPoint.breakpoints.down('xs')]: {
            lineHeight: 1.5,
            textAlign: "left",
        }
    },
    images: {
        margin: '10px 0',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        '& img': {
            maxWidth: 600,
            maxHeight: 600,
            borderRadius: 5,
            margin: '10px 0'
        },
        [useGridPoint.breakpoints.down('xs')]: {
            '& img': {
                maxWidth: 300,
                maxHeight: 300,
                borderRadius: 5,
                margin: '10px 0'
            },
        }
    },
    docs: {
        padding: '20px 0',
        display: "flex",
        flexDirection: "column",
    },
    docsItem: {
        display: "flex",
        alignItems: "center",
        margin: '5px 0',
        '& a': {
            margin: '3px 0',
            padding: '3px 0'
        },
        '& a:hover': {
            color: '#ff6200!important'
        },
        '& img': {
            height: 30,
            width: 'auto',
            marginRight: 10
        },
    }
})

const NewsItemView = () => {
    const classes = useStyles();

    const news = toJS(UiStore.news)

    const { id } = useParams();

    useEffect(()=>{
        runInAction(()=>{
            UiStore.getNewsId(id)
            console.log('use')
        })
        return ()=> {
            runInAction(()=>{
                UiStore.news = []
            })
        }
    },[id])

    return (
        <>
            <Header title={'Новости'}/>
            {news.length > 0 &&
                <Box className={classes.root}>
                    <Container className={classes.container} fixed>
                        <Box className={classes.newsWrap}>
                            <div className={classes.avatar}>
                                <img src={
                                    news[0].avatar
                                        ? `${NEWS_URL}/${news[0]._id}/avatar/${news[0].avatar}`
                                        : noNewsAvatar
                                } alt=""/>
                            </div>

                            <Divider/>

                            <div className={classes.headerFirst}>
                                {news[0].headerFirst}
                            </div>

                            <Divider/>

                            <div className={classes.textMain}>{news[0].textMain}</div>

                            <Divider/>

                            {news[0].docs.length > 0 &&
                            <div className={classes.docs}>
                                {news[0].docs.map((i) => (
                                    <div className={classes.docsItem}>
                                        {i.doc.slice(i.doc.lastIndexOf(".")+1) === 'pdf' &&
                                        <img src={pdfIcon} alt="" width={40}/>
                                        }
                                        {i.doc.slice(i.doc.lastIndexOf(".")+1) === 'doc' &&
                                        <img src={docIcon} alt="" width={40}/>
                                        }
                                        {i.doc.slice(i.doc.lastIndexOf(".")+1) === 'docx' &&
                                        <img src={docxIcon} alt="" width={40}/>
                                        }
                                        {i.doc.slice(i.doc.lastIndexOf(".")+1) === 'xls' &&
                                        <img src={xlsIcon} alt="" width={40}/>
                                        }
                                        {i.doc.slice(i.doc.lastIndexOf(".")+1) === 'xlsx' &&
                                        <img src={xlsxIcon} alt="" width={40}/>
                                        }
                                        <a href={`${NEWS_URL}/${news[0]._id}/docs/${i.doc}`} target={'_blank'} rel="noreferrer">{i.title}</a>
                                    </div>
                                ))}
                            </div>
                            }

                            <Divider/>

                            {news[0].images.length > 0 &&
                            <div className={classes.images}>
                                {news[0].images.map((i) => (
                                    <img src={`${NEWS_URL}/${news[0]._id}/images/${i}`} alt=""/>
                                ))}
                            </div>
                            }
                        </Box>
                    </Container>
                </Box>
            }
        </>


    );
};

export default observer(NewsItemView);
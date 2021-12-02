import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {runInAction, toJS} from "mobx";
import {useParams} from "react-router-dom";
import UiNewsStore from "../../../bll/ui/ui-news-store";
import {API_URL} from "../../../const/const";
import {Box, Container, Divider} from "@material-ui/core";
import pdfIcon from "../../../common/assets/image/icons/pdf.png";
import docIcon from "../../../common/assets/image/icons/doc.png";
import docxIcon from "../../../common/assets/image/icons/docx.png";
import xlsIcon from "../../../common/assets/image/icons/xls.png";
import xlsxIcon from "../../../common/assets/image/icons/xlsx.png";
import {makeStyles} from "@material-ui/core/styles";
import {useGridPoint} from "../../../utils/breakpoints";
import Header from "../header/header";
import s from "./news-view.module.css"

const useStyles = makeStyles({
    root: {
        minHeight: '100%',
        paddingTop: 50,
    },
    container: {
        minHeight: '100%',
        display: "flex",
        justifyContent: "center",
    },
    news: {
        width: 760,
        [useGridPoint.breakpoints.down('md')]: {
            width: 600,
        },
        [useGridPoint.breakpoints.down('xs')]: {
            width: 340,
        },
        backgroundColor: '#fff',
        padding: 20
    },
    header: {
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
        [useGridPoint.breakpoints.down('xs')]: {
            flexDirection: 'column',
            marginBottom: 0
        },
    },
    avatar: {
        display: "flex",
        justifyContent: "center",
        flex: '0 0 auto',
        fontSize: 0,
        '& img': {
            borderRadius: 10,
        }
    },
    headerFirst: {
        fontSize: '130%',
        fontWeight: 700,
        fontFamily: 'Roboto',
        margin: '0 40px',
        [useGridPoint.breakpoints.down('md')]: {
            margin: '0 20px',
        },
        [useGridPoint.breakpoints.down('xs')]: {
            margin: '20px 0',
        },
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


const NewsView = () => {
    const classes = useStyles();

    const news = toJS(UiNewsStore.newsOne)

    const { id } = useParams();


    useEffect(()=>{
        runInAction(()=>{
            UiNewsStore.getNewsId(id)
        })
        return ()=> {
            runInAction(()=>{
                UiNewsStore.newsOne = null
            })
        }
    },[id])

    return (
        <>
            <Header title={'Новости'}/>
            {news &&
                <Box className={classes.root}>
                    <Container className={classes.container} fixed>
                        <Box className={classes.news}>
                            <div className={classes.header}>
                                <div className={classes.avatar}>
                                    <img src={
                                        news.avatar
                                            ? `${API_URL}/news/${news._id}/avatar/${news.avatar}`
                                            : `${API_URL}/img/nonewsavatar/${Math.floor(Math.random() * 10)}.jpg`
                                    } alt=""/>
                                </div>
                                <div>
                                    <div className={`${classes.headerFirst} ${s.headerText}`}>
                                        {news.headerFirst}
                                    </div>
                                </div>
                            </div>

                            <Divider/>

                            <div className={classes.textMain}>{news.textMain}</div>

                            <Divider/>

                            {news.docs.length > 0 &&
                            <div className={classes.docs}>
                                {news.docs.map((i) => (
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
                                        <a href={`${API_URL}/news/${news._id}/docs/${i.doc}`} target={'_blank'} rel="noreferrer">{i.title}</a>
                                    </div>
                                ))}
                            </div>
                            }

                            <Divider/>

                            {news.images.length > 0 &&
                            <div className={classes.images}>
                                {news.images.map((i) => (
                                    <img src={`${API_URL}/news/${news._id}/images/${i}`} alt=""/>
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

export default observer(NewsView);
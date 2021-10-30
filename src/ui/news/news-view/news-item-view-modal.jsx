import React, {useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {runInAction, toJS} from "mobx";
import UiStore from "../../../bll/ui-store";
import {makeStyles} from "@material-ui/core/styles";
import {NEWS_URL} from "../../../const/const";
import noNewsAvatar from "../../../common/assets/image/no_news_avatar.jpg";
import {Divider, Fab} from "@material-ui/core";
import Close from '@material-ui/icons/Close';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import {useGridPoint} from "../../../utils/breakpoints";
import Snackbar from '@material-ui/core/Snackbar';
import pdfIcon from "../../../common/assets/image/icons/pdf.png";
import docIcon from "../../../common/assets/image/icons/doc.png";
import docxIcon from "../../../common/assets/image/icons/docx.png";
import xlsIcon from "../../../common/assets/image/icons/xls.png";
import xlsxIcon from "../../../common/assets/image/icons/xlsx.png";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles({
    Paper: {
        width: 650,
        margin: 20,
        position: "relative",
        height: 'calc(100% - 40px)',
        '& .MuiSnackbar-root': {
            display: 'block',
            position: 'absolute',
            top: 55,
        },
        [useGridPoint.breakpoints.down('xs')]: {
            height: '100%',
            margin: 0,
            maxHeight: '100%'
        },
    },
    header: {
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        margin: 10,
        '& button': {
            marginBottom: 10
        },
    },
    avatar: {
        display: "flex",
        justifyContent: "center",
        flex: '0 0 auto',
        fontSize: 0,
        padding: 20,
        '& img': {
            borderRadius: 100
        }
    },
    headerFirst: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 40,
        fontSize: '120%',
        fontWeight: 700,
        fontFamily: 'Roboto',
        [useGridPoint.breakpoints.down('xs')]: {
            padding: 30,
        }
    },
    textMain: {
        flex: '1 0',
        padding: 30,
        fontFamily: 'Roboto',
        lineHeight: 1.5,
        textAlign: "justify",
        [useGridPoint.breakpoints.down('xs')]: {
            padding: 20,
            lineHeight: 1.8,
            textAlign: "left",
            fontSize: '120%',
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
        padding: 20,
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
});

export const NewsItemViewModal = (props)=> {

    const classes = useStyles();

    const location = document.location.href

    const [open, setOpen] = React.useState(props.open);
    const [close, setClose] = React.useState(null);

    useEffect(()=>{
        return ()=> {
            runInAction(()=>{
                UiStore.newsViewModal_open = false
                UiStore.newsViewModal_index = null
            })
        }
    },[close])

    const handleClose = () => {
        setOpen(false)
        setTimeout(()=>{setClose(true)},500)
    };

    const [openCopyLink, setOpenCopyLink] = React.useState(false);

    const copyLink = () => {
        setOpenCopyLink(true);
        const el = document.getElementById('copyButton').getAttribute('data-link')
        navigator.clipboard.writeText(el)
    };

    const closeCopyLink = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenCopyLink(false);
    };

    const news = toJS(UiStore.news.docs[UiStore.newsViewModal_index])
    const shareLink = location + '/' + news._id


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            classes={{
                paper: classes.Paper
            }}
        >

            <div className={classes.header}>

                <Fab
                    id={'closeButton'}
                    size="small"
                    color="secondary"
                    onClick={handleClose}
                    data-name={'Закрыть'}
                >
                    <Close />
                </Fab>

                <Fab
                    id={'copyButton'}
                    size="small"
                    color="primary"
                    onClick={copyLink}
                    data-name={'копировать ссылку на новость'}
                    data-link={shareLink}
                >
                    <ShareOutlinedIcon />
                </Fab>

            </div>

            <div className={classes.avatar}>
                <img src={
                    news.avatar
                        ? `${NEWS_URL}/${news._id}/avatar/${news.avatar}`
                        : noNewsAvatar
                } alt=""/>
            </div>

            <Divider/>

            <div className={classes.headerFirst}>
                {news.headerFirst}
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
                            <a href={`${NEWS_URL}/${news._id}/docs/${i.doc}`} target={'_blank'} rel="noreferrer">{i.title}</a>
                        </div>
                    ))}
                </div>
            }
            <Snackbar
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                open={openCopyLink}
                autoHideDuration={8000}
                onClose={closeCopyLink}
            >
                <Alert onClose={closeCopyLink} variant="filled" severity="success">
                    Ссылка на новость скопирована в буфер
                </Alert>
            </Snackbar>

            <Divider/>

            {news.images.length > 0 &&
                <div className={classes.images}>
                    {news.images.map((i) => (
                        <img src={`${NEWS_URL}/${news._id}/images/${i}`} alt=""/>
                    ))}
                </div>
            }


        </Dialog>
    );
}

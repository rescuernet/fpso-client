import React, {useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {runInAction, toJS} from "mobx";
import UiStore from "../../../bll/ui-store";
import {makeStyles} from "@material-ui/core/styles";
import {NEWS_URL} from "../../../const/const";
import noNewsAvatar from "../../../common/assets/image/no_news_avatar.jpg";
import {Divider, Fab} from "@material-ui/core";
import Close from '@material-ui/icons/Close';
import {useGridPoint} from "../../../utils/breakpoints";
import AdminStore from "../../../bll/admin-store";
import pdfIcon from "../../../common/assets/image/icons/pdf.png";
import docIcon from "../../../common/assets/image/icons/doc.png";
import docxIcon from "../../../common/assets/image/icons/docx.png";
import xlsIcon from "../../../common/assets/image/icons/xls.png";
import xlsxIcon from "../../../common/assets/image/icons/xlsx.png";

const useStyles = makeStyles({
    Paper: {
        maxWidth: 650,
        margin: 20,
        position: "relative",
        maxHeight: 'calc(100% - 40px)'
    },
    header: {
        position: "fixed",
        margin: 10,
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
        flex: '1 0',
        padding: 40,
        fontSize: '120%',
        fontWeight: 700,
        fontFamily: 'Roboto',
        [useGridPoint.breakpoints.down('xs')]: {
            padding: 30,
        }
    },
    textMain: {
        padding: 30,
        fontFamily: 'Roboto',
        lineHeight: 1.5,
        [useGridPoint.breakpoints.down('xs')]: {
            padding: 20,
        }
    },
    imagesHeader: {
        textAlign: "center",
        textTransform: "uppercase",
        fontFamily: 'Roboto'
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
        '& a': {
            margin: '3px 0',
            padding: '3px 0'
        }
    },
    docsItem: {
        display: "flex",
        alignItems: "center",
        '& img': {
            height: 20,
            width: 'auto',
            marginRight: 10
        },
    }
});

export const NewsItemViewModal = (props)=> {

    const classes = useStyles();

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

    const news = toJS(UiStore.news.docs[UiStore.newsViewModal_index])


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            classes={{
                paper: classes.Paper
            }}
        >

            <div className={classes.header}>

                <Fab size="small" color="secondary" onClick={handleClose}>
                    <Close />
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
                            <a href={`${NEWS_URL}/${news._id}/docs/${i.doc}`} target={'_blank'}>{i.title}</a>
                        </div>
                    ))}
                </div>
            }

            <Divider/>

            {news.images.length > 0 &&
                <div className={classes.images}>
                    <div className={classes.imagesHeader}>фотографии</div>
                    {news.images.map((i) => (
                        <img src={`${NEWS_URL}/${news._id}/images/${i}`} alt=""/>
                    ))}
                </div>
            }


        </Dialog>
    );
}

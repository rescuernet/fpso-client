import React, {useEffect, useState} from 'react';
import AdminMenu from "../../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, Typography} from "@material-ui/core";
import AdminNewsStore from "../../../../bll/admin/admin-news-store";
import {runInAction, toJS} from "mobx";
import AdminHeader from "../../header/admin-header";
import {observer} from "mobx-react-lite";
import {AlertDialog} from "./news-alert";
import {useHistory, useParams} from "react-router-dom";
import {RM} from "../../../../routes/routes";
import Store from "../../../../bll/store";
import * as dateFns from "date-fns";
import NewsAvatar from "./news-avatar";
import NewsImages from "./news-images";
import NewsDocs from "./news-docs";
import NewsFields from "./news-fields";
import NewsCheckbox from "./news-checkbox";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        position: "relative"
    },
    wrapper: {
        flexGrow: 1,
        [theme.breakpoints.between('sm', 'md')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: 20
    },
    content: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 600,
        margin: '20px 40px',
        '@media (max-width: 1050px)' : {
            marginTop: 45,
            margin: '20px 10px',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            width: 600
        },
    },

    control: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
        '@media (max-width: 430px)' : {
            marginTop: 20,
        },
    },
    controlCheckBox: {
        display: "flex",
        flexDirection: 'column',
        flexWrap: "wrap",
        padding: 10
    },
    controlButton: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        padding: 20,
        '@media (max-width: 750px)' : {
            flexDirection: 'column',
            alignItems: "center",
        },
    },
    Button: {
        width: 120,
        '@media (max-width: 430px)' : {
            marginBottom: 20,
        },
    }
}));

const NewsCreateEdit = () => {
    const history = useHistory();
    const { id } = useParams();
    const newsEdit = id && toJS(AdminNewsStore.news).find(item => item._id === id)
    id && !newsEdit && history.push(RM.Admin__News.path)

    //установка OLD и очистка Store перед размонтированием
    useEffect(()=>{
        if(newsEdit){
            runInAction(() => {
                AdminNewsStore.news_tmp.dateStart = dateFns.format(new Date(newsEdit.dateStart), 'yyyy-MM-dd')
                AdminNewsStore.news_tmp.dateEnd = newsEdit.dateEnd && dateFns.format(new Date(newsEdit.dateEnd), 'yyyy-MM-dd')
                AdminNewsStore.news_tmp.headerFirst = newsEdit.headerFirst
                AdminNewsStore.news_tmp.headerSecond = newsEdit.headerSecond
                AdminNewsStore.news_tmp.textMain = newsEdit.textMain
                AdminNewsStore.news_tmp.fixedNews = newsEdit.fixedNews
                AdminNewsStore.news_tmp.importantNews = newsEdit.importantNews
                AdminNewsStore.news_tmp.published = newsEdit.published
                AdminNewsStore.news_tmp_avatar_old = newsEdit.avatar
                AdminNewsStore.news_tmp_images_old = newsEdit.images
                AdminNewsStore.news_tmp_docs_old = newsEdit.docs
            })
        }
        return ()=> {
            runInAction(() => {AdminNewsStore.clearData()})
        }
    },[newsEdit])


    const classes = useStyles();

    const [deleteNews, setDeleteNews] = useState(false);

    //отмена
    const Cancel = () => {
        history.push(RM.Admin__News.path)
    };

    //создание массива для сохранения
    const CreateArr = async () => {
        const result = await AdminNewsStore.newsCreate()
        if(result === 200){
            history.push(RM.Admin__News.path)
        }
    };

    //создание массива для обновления
    const UpdateArr = async () => {
        const result = await AdminNewsStore.newsUpdate(id)
        if(result === 200){
            history.push(RM.Admin__News.path)
        }
    };

    const newsDelete = () => {
        setDeleteNews(true)
    }

    const newsDeleteConfirm = async (id) => {
        setDeleteNews(false)
        const result = await AdminNewsStore.newsDelete(id)
        if(result === 200){
            history.push(RM.Admin__News.path)
        }
    }

    return (
        <div className={classes.root}>
            {Store.width > 1050 ? <AdminMenu open={true} variant={'permanent'} menuIconView={false}/> : <AdminHeader header={'Новости'}/>}
            <div className={classes.wrapper}>
                {Store.width > 1050 && <div className={classes.header}><Typography variant={'h5'}>Новости</Typography></div>}
                <Divider/>
                <div className={classes.content}>

                            <NewsAvatar id={id}/>

                    <Divider/>

                            <NewsFields/>

                    <Divider/>

                            <NewsImages id={id}/>

                    <Divider/>

                            <NewsDocs id={id}/>

                    <Divider/>

                    <div className={classes.control}>

                            <NewsCheckbox edit={!!newsEdit}/>

                        <Divider/>
                        <div className={classes.controlButton}>
                            <Button
                                className={classes.Button}
                                variant={"outlined"}
                                color={"primary"}
                                onClick={()=>{Cancel()}}
                            >
                                Отмена
                            </Button>
                            <Button
                                className={classes.Button}
                                variant="contained"
                                color={"primary"}
                                onClick={()=>{newsEdit ? UpdateArr() : CreateArr()}}
                            >
                                {newsEdit ? 'Обновить' : 'Сохранить'}
                            </Button>
                            {newsEdit &&
                                <Button
                                    className={classes.Button}
                                    variant="contained"
                                        color={"secondary"}
                                    onClick={()=>{newsDelete()}}
                                >
                                    удалить
                                </Button>
                            }
                            {deleteNews &&
                                <AlertDialog
                                    alertType={'confirm'}
                                    open={true}
                                    header={'Внимание!'}
                                    text={'Подтвердите удаление новости'}
                                    delete={()=>{newsDeleteConfirm(id)}}
                                    close={()=>{setDeleteNews(false)}}
                                />
                            }

                        </div>
                    </div>
                </div>
            </div>
            {AdminNewsStore.news_tmp_errors &&
                <AlertDialog
                    open={true}
                    header={'Ошибка!'}
                    text={AdminNewsStore.news_tmp_errors}
                />
            }
        </div>
    );
};

export default observer(NewsCreateEdit);
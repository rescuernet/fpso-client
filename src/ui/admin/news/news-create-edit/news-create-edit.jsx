import React, {useEffect, useState} from 'react';
import AdminMenu from "../../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, Typography} from "@material-ui/core";
import AdminNewsStore from "../../../../bll/admin/admin-news-store";
import {runInAction} from "mobx";
import AdminHeader from "../../header/admin-header";
import {observer} from "mobx-react-lite";
import {AlertDialog} from "./news-alert";
import {useHistory, useParams} from "react-router-dom";
import {RM} from "../../../../routes/routes";
import Store from "../../../../bll/store";
import NewsAvatar from "./news-avatar";
import NewsImages from "./news-images";
import NewsFields from "./news-fields";
import NewsCheckbox from "./news-checkbox";
import NewsDocs from "./news-docs";


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

    useEffect(()=>{
        runInAction(() => {
            AdminNewsStore.getNewsId(id)
        })
        return ()=> {
            runInAction(() => {AdminNewsStore.clearData()})
        }
    },[id])


    const classes = useStyles();

    const [deleteNews, setDeleteNews] = useState(false);

    //отмена
    const Cancel = () => {
        history.push(RM.Admin__News.path)
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

                    <NewsAvatar newsId={id}/>

                    <Divider/>

                    <NewsFields/>

                    <Divider/>

                    <NewsImages newsId={id}/>

                    <Divider/>

                    <NewsDocs newsId={id}/>

                    <Divider/>

                    <div className={classes.control}>

                        <NewsCheckbox />

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
                                onClick={()=>{UpdateArr()}}
                            >
                                Сохранить
                            </Button>
                            {!AdminNewsStore.newsOne.tmpNews &&
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
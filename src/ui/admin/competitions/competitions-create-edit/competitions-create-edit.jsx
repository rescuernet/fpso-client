import React, {useEffect, useState} from 'react';
import AdminMenu from "../../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, Typography} from "@material-ui/core";
import AdminCompetitionsStore from "../../../../bll/admin/admin-competitions-store";
import {runInAction, toJS} from "mobx";
import AdminHeader from "../../header/admin-header";
import {observer} from "mobx-react-lite";
import {AlertDialog} from "./competitions-alert";
import {useHistory, useParams} from "react-router-dom";
import {RM} from "../../../../routes/routes";
import Store from "../../../../bll/store";
import * as dateFns from "date-fns";
import CompetitionsAvatar from "./competitions-avatar";
import Images from "./competitions-images";
import Docs from "./competitions-docs";
import Fields from "./competitions-fields";
import Checkbox from "./competitions-checkbox";


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

const CompetitionsCreateEdit = () => {
    const history = useHistory();
    const { id } = useParams();
    const compEdit = id && toJS(AdminCompetitionsStore.competitions).find(item => item._id === id)
    id && !compEdit && history.push(RM.Admin__Competitions.path)

    //установка OLD и очистка Store перед размонтированием
    useEffect(()=>{
        if(compEdit){
            runInAction(() => {
                AdminCompetitionsStore.competitions_tmp.dateStart = dateFns.format(new Date(compEdit.dateStart), 'yyyy-MM-dd')
                AdminCompetitionsStore.competitions_tmp.dateEnd = compEdit.dateEnd && dateFns.format(new Date(compEdit.dateEnd), 'yyyy-MM-dd')
                AdminCompetitionsStore.competitions_tmp.headerFirst = compEdit.headerFirst
                AdminCompetitionsStore.competitions_tmp.headerSecond = compEdit.headerSecond
                AdminCompetitionsStore.competitions_tmp.textMain = compEdit.textMain
                AdminCompetitionsStore.competitions_tmp.fixedNews = compEdit.fixedNews
                AdminCompetitionsStore.competitions_tmp.importantNews = compEdit.importantNews
                AdminCompetitionsStore.competitions_tmp.published = compEdit.published
                AdminCompetitionsStore.competitions_tmp_avatar_old = compEdit.avatar
                AdminCompetitionsStore.competitions_tmp_images_old = compEdit.images
                AdminCompetitionsStore.competitions_tmp_docs_old = compEdit.docs
            })
        }
        return ()=> {
            runInAction(() => {AdminCompetitionsStore.clearData()})
        }
    },[compEdit])

    const classes = useStyles();

    const [deleteComp, setDeleteComp] = useState(false);


    //отмена
    const Cancel = () => {
        history.push(RM.Admin__Competitions.path)
    };

    //создание массива для сохранения
    const CreateArr = async () => {
        const result = await AdminCompetitionsStore.newsCreate()
        if(result === 200){
            history.push(RM.Admin__Competitions.path)
        }
    };

    //создание массива для обновления
    const UpdateArr = async () => {
        const result = await AdminCompetitionsStore.newsUpdate(id)
        if(result === 200){
            history.push(RM.Admin__Competitions.path)
        }
    };

    const compDelete = () => {
        setDeleteComp(true)
    }

    const compDeleteConfirm = async (id) => {
        setDeleteComp(false)
        const result = await AdminCompetitionsStore.newsDelete(id)
        if(result === 200){
            history.push(RM.Admin__Competitions.path)
        }
    }

    return (
        <div className={classes.root}>
            {Store.width > 1050 ? <AdminMenu open={true} variant={'permanent'} menuIconView={false}/> : <AdminHeader header={'Соревнования'}/>}
            <div className={classes.wrapper}>
                {Store.width > 1050 && <div className={classes.header}><Typography variant={'h5'}>Соревнования</Typography></div>}
                <Divider/>
                <div className={classes.content}>

                    <Fields/>

                    {AdminCompetitionsStore.competitions_tmp.dateEnd &&
                        <>
                            <CompetitionsAvatar id={id}/>
                            <Divider/>
                            <Images id={id}/>
                            <Divider/>
                            <Docs id={id}/>
                            <Divider/>
                        </>

                    }

                    <div className={classes.control}>
                        {AdminCompetitionsStore.competitions_tmp.dateEnd &&
                            <Checkbox edit={!!compEdit}/>
                        }
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
                                onClick={()=>{compEdit ? UpdateArr() : CreateArr()}}
                            >
                                {compEdit ? 'Обновить' : 'Сохранить'}
                            </Button>
                            {compEdit &&
                            <Button
                                className={classes.Button}
                                variant="contained"
                                color={"secondary"}
                                onClick={()=>{compDelete()}}
                            >
                                удалить
                            </Button>
                            }
                            {deleteComp &&
                            <AlertDialog
                                alertType={'confirm'}
                                open={true}
                                header={'Внимание!'}
                                text={'Подтвердите удаление новости'}
                                delete={()=>{compDeleteConfirm(id)}}
                                close={()=>{setDeleteComp(false)}}
                            />
                            }

                        </div>
                    </div>
                </div>
            </div>
            {AdminCompetitionsStore.news_tmp_errors &&
            <AlertDialog
                open={true}
                header={'Ошибка!'}
                text={AdminCompetitionsStore.news_tmp_errors}
            />
            }
        </div>
    );
};

export default observer(CompetitionsCreateEdit);
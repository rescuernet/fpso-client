import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, Typography} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import Store from "../../../../bll/store";
import AdminMenu from "../../menu/admin-menu";
import AdminHeader from "../../header/admin-header";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";
import CompAvatar from "./comp-avatar";
import {useHistory, useParams} from "react-router-dom";
import {runInAction} from "mobx";
import CompFields from "./comp-fields";
import CompDocs from "./comp-docs";
import {CompAlertDialog} from "./comp-alert";
import {ADM_RM} from "../../../../routes/admin-routes";
import CompCheckbox from "./comp-checkbox";
import CompResult from "./comp-result";


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

const CompEdit = (props) => {
    const history = useHistory();
    const { id } = useParams();

    useEffect(()=>{
        runInAction(() => {
            AdminCompStore.getCompId(id)
        })
        return ()=> {
            runInAction(() => {AdminCompStore.clearData()})
        }
    },[id])

    const classes = useStyles();

    const [deleteComp, setDeleteComp] = useState(false);

    //отмена
    const Cancel = () => {
        history.push(ADM_RM.Competitions.path)
    };


    //создание массива для обновления
    const UpdateArr = async () => {
        runInAction(()=>{
            AdminCompStore.compOne.tmp = false
        })
        const result = await AdminCompStore.compUpdate()
        if(result === 200){
            history.push(ADM_RM.Competitions.path)
        }
    };

    const compDelete = () => {
        setDeleteComp(true)
    }

    const compDeleteConfirm = async (id) => {
        setDeleteComp(false)
        const result = await AdminCompStore.compDelete(id)
        if(result === 200){
            history.push(ADM_RM.Competitions.path)
        }
    }

    return (
        <div className={classes.root}>
            {Store.width > 1050 ? <AdminMenu open={true} variant={'permanent'} menuIconView={false}/> : <AdminHeader header={'Соревнования'}/>}
            <div className={classes.wrapper}>
                {Store.width > 1050 && <div className={classes.header}><Typography variant={'h5'}>Соревнования</Typography></div>}
                <Divider/>
                <div className={classes.content}>
                    {AdminCompStore.compOne &&
                    <>
                        <CompAvatar compId={id}/>

                        <Divider/>

                        <CompFields/>

                        <Divider/>

                        <CompDocs compId={id}/>

                        <Divider/>

                        <CompResult compId={id}/>
                        <Divider/>

                        <CompCheckbox />

                        <Divider/>

                        <div className={classes.control}>

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
                                {!AdminCompStore.compOne.tmp &&
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
                                <CompAlertDialog
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

                        {/*
                        <NewsImages newsId={id}/>

                        <Divider/>
                        */}
                    </>
                    }
                </div>
            </div>
            {AdminCompStore.tmp_errors &&
            <CompAlertDialog
                open={true}
                header={'Ошибка!'}
                text={AdminCompStore.tmp_errors}
            />
            }
        </div>
    );
};

export default observer(CompEdit);
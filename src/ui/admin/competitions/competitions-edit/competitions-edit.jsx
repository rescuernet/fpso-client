import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Divider, Typography} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import Store from "../../../../bll/store";
import AdminMenu from "../../menu/admin-menu";
import AdminHeader from "../../header/admin-header";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";
import CompAvatar from "./comp-avatar";
import {useParams} from "react-router-dom";
import {runInAction} from "mobx";
import CompFields from "./comp-fields";


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

const CompetitionsEdit = (props) => {
    /*const history = useHistory();*/
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

                        {/*

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
                        </div>*/}
                    </>
                    }
                </div>
            </div>
            {/*{AdminNewsStore.news_tmp_errors &&
            <AlertDialog
                open={true}
                header={'Ошибка!'}
                text={AdminNewsStore.news_tmp_errors}
            />
            }*/}
        </div>
    );
};

export default observer(CompetitionsEdit);
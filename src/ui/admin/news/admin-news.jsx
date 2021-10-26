import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import AdminMenu from "../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import {RM} from "../../../routes/routes";
import {Button, Divider, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import AdminStore from '../../../bll/admin-store';
import Store from '../../../bll/store';
import {runInAction, toJS} from "mobx";
import AdminHeader from "../header/admin-header";
import AdminNewsItem from "./admin-news-item";



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        '@media (max-width: 1050px)' : {
            justifyContent: 'center'
        },
        position: "relative"
    },
    wrapper: {
        flexGrow: 1,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: 20
    },
    content: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 1200,
        padding: '20px 10px',
        '@media (max-width: 1050px)' : {
            marginTop: 55,
        },
        '@media (max-width: 600px)' : {
            marginTop: 45,
        },
    },
    control: {
        marginBottom: 20,
    },
    newsList: {
        margin: '20px 0'
    },
    table: {
        width: '100%',
        borderCollapse: "collapse",
        fontFamily: 'Roboto',
        color: '#545454',
        '& tr': {
            borderTop: '1px solid #ccc',
            borderBottom: '1px solid #ccc'
        },
        '& tr:hover': {
            transition: '0.3s',
            backgroundColor: '#f2f2f2',
            cursor: 'pointer'
        },
        '& td': {
            padding: '20px 10px',
            [theme.breakpoints.down('xs')]: {
                padding: '10px 5px',
            }
        }
    },
    min: {
        width: 100,
        textAlign: "center",
        padding: '0 5px',
        '@media (max-width: 1050px)' : {
            width: 50,
        },
    },

}));

const AdminNews = (props) => {
    window.scrollTo(0,0)
    const classes = useStyles();
    const history = useHistory();

    useEffect(()=>{
        runInAction(()=>{AdminStore.getNews()})
    },[])

    const news = toJS(AdminStore.news)


    const createNews = () => {
        history.push(RM.Admin__News__Create.path);
    }


    return (
        <div className={classes.root}>
            {Store.width > 1050 ? <AdminMenu open={true} variant={'permanent'} menuIconView={false}/> : <AdminHeader header={'Новости'}/>}
            <div className={classes.wrapper}>
                {Store.width > 1050 && <div className={classes.header}><Typography variant={'h5'}>Новости</Typography></div>}
                <Divider/>
                <div className={classes.content}>
                    <div className={classes.control}>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={() => {createNews()}}
                        >
                            Создать новость
                        </Button>
                    </div>
                    <div className={classes.newsList}>
                        <table className={classes.table}>
                            {Store.width > 750 && AdminStore.news.length > 0 &&
                                <>
                                    {Store.width > 1000 &&
                                        <th className={classes.min}>Создана</th>
                                    }

                                    <th></th>
                                    <th>Заголовок</th>
                                    <th className={classes.min}>старт</th>
                                    <th className={classes.min}>финиш</th>
                                    <th className={classes.min}>закреплена</th>
                                    <th className={classes.min}>важная</th>
                                </>
                             }
                            {news.map((i) => (
                                <AdminNewsItem key={i._id} news={i}/>
                            ))}
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(AdminNews);
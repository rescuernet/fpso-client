import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import AdminMenu from "../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import {RM} from "../../../routes/routes";
import {Button, Divider, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import AdminStore from '../../../bll/admin-store';
import Store from '../../../bll/store';
import {toJS} from "mobx";
import AdminHeader from "../header/admin-header";
import AdminNewsItem from "./admin-news-item";



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        '@media (max-width: 750px)' : {
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
        padding: 20,
        '@media (max-width: 750px)' : {
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
        width: 120,
        textAlign: "center"
    },

}));

const AdminNews = (props) => {
    const classes = useStyles();
    const history = useHistory();

    useEffect(()=>{
        AdminStore.getNews()
    },[])

    const news = toJS(AdminStore.news)


    const createNews = () => {
        AdminStore.news_tmp_avatar = '';
        history.push(RM.Admin__News__Create.path);
    }


    return (
        <div className={classes.root}>
            {Store.width > 1050 ? <AdminMenu open={true} variant={'permanent'} menuIconView={false}/> : <AdminHeader header={'Новости'}/>}
            <div className={classes.wrapper}>
                {Store.width > 750 && <div className={classes.header}><Typography variant={'h5'}>Новости</Typography></div>}
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
                            {Store.width > 750 &&
                            <>
                                <th className={Store.width > 750 && classes.min}>Создана</th>
                                <th>Заголовок</th>
                            </>
                             }
                            {Store.width > 750 &&
                            <>
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
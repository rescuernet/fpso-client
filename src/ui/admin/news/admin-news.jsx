import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import AdminMenu from "../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import {RM} from "../../../routes/routes";
import {Button, Divider, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import AdminStore from '../../../bll/admin-store';
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
        maxWidth: 600,
        padding: 20,
        '@media (max-width: 750px)' : {
            marginTop: 45,
        },
    },
    control: {
        padding: 20
    },
    newsList: {

    }

}));


const AdminNews = () => {
    const classes = useStyles();
    const width = window.outerWidth
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
            {width > 750 ? <AdminMenu/> : <AdminHeader header={'Новости'}/>}
            <div className={classes.wrapper}>
                {width > 750 && <div className={classes.header}><Typography variant={'h5'}>Новости</Typography></div>}
                <Divider/>
                <div className={classes.control}>
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={() => {createNews()}}
                    >
                        Создать новость
                    </Button>
                </div>
                <Divider />
                <div className={classes.content}>
                    <div className={classes.newsList}>
                        {news.map((i) => (
                            <AdminNewsItem key={i._id} news={i}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(AdminNews);
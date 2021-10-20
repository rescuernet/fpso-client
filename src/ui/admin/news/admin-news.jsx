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
import useMediaQuery from "@material-ui/core/useMediaQuery";



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

}));


const AdminNews = () => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:750px)');
    const history = useHistory();

    useEffect(()=>{
        AdminStore.getNews()
    },[])

    const news = toJS(AdminStore.news)
    console.log(news)

    const createNews = () => {
        AdminStore.news_tmp_avatar = '';
        history.push(RM.Admin__News__Create.path);
    }


    return (
        <div className={classes.root}>
            {matches ? <AdminMenu/> : <AdminHeader header={'Новости'}/>}
            <div className={classes.wrapper}>
                {matches && <div className={classes.header}><Typography>Новости</Typography></div>}
                <Divider/>
                <div className={classes.content}>
                    <div>
                        <Button onClick={() => {
                            createNews()
                        }}>Создать</Button>
                    </div>
                    <div>
                        {/*{news.map((i) => (

                        ))}*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(AdminNews);
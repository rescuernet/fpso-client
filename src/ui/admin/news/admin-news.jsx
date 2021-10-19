import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import AdminMenu from "../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import {RM} from "../../../routes/routes";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import AdminStore from '../../../bll/admin-store';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
    },
}));


const AdminNews = () => {
    const classes = useStyles();
    const history = useHistory()

    const createNews = () => {
        AdminStore.news_tmp_avatar = '';
        history.push(RM.Admin__News__Create.path);
    }

    /*useEffect(()=>{
        console.log('effect')
    },[])*/

    return (
        <div className={classes.root}>
            <AdminMenu/>
            <div className={classes.content}>
                <div>AdminNews</div>
                <Button onClick={()=>{createNews()}}>Создать</Button>
            </div>
        </div>
    );
};

export default observer(AdminNews);
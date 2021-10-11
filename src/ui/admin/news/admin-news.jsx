import React from 'react';
import {observer} from "mobx-react-lite";
import AdminMenu from "../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import {RM} from "../../../routes/routes";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));


const AdminNews = () => {
    const classes = useStyles();
    const history = useHistory()

    return (
        <div className={classes.root}>
            <AdminMenu/>
            <div className={classes.content}>
                <div>AdminNews</div>
                <Button onClick={()=>{history.push(RM.Admin__News__Create.path)}}>Создать</Button>
            </div>
        </div>
    );
};

export default observer(AdminNews);
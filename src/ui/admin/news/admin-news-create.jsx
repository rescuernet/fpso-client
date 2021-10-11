import React from 'react';
import {observer} from "mobx-react-lite";
import AdminMenu from "../admin-menu";
import {makeStyles} from "@material-ui/core/styles";

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


const AdminNewsCreate = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AdminMenu/>
            <div className={classes.content}>
                AdminNewsCreate
            </div>
        </div>
    );
};

export default observer(AdminNewsCreate);
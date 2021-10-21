import React from 'react';
import {observer} from "mobx-react-lite";
import AdminMenu from "../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import Store from "../../../bll/store";
import AdminHeader from "../header/admin-header";
import {Divider, Typography} from "@material-ui/core";

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


const AdminCompetitions = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {Store.width > 750 ? <AdminMenu open={true} variant={'permanent'} menuIconView={false}/> : <AdminHeader header={'Соревнования'}/>}
            <div className={classes.wrapper}>
                {Store.width > 750 && <div className={classes.header}><Typography variant={'h5'}>Соревнования</Typography></div>}
                <Divider/>
                <div className={classes.content}>
                    Соревнования
                </div>
            </div>
        </div>
    );
};

export default observer(AdminCompetitions);
import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import Store from "../../../bll/store";
import AdminMenu from "../menu/admin-menu";
import AdminHeader from "../header/admin-header";
import {Divider, Typography} from "@material-ui/core";

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
        maxWidth: 1000,
        margin: '20px 40px',
        '@media (max-width: 1050px)': {
            marginTop: 45,
            margin: '20px 10px',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            width: 600
        },
    },
}))

const AdminPageWrapper = ({title, children}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {Store.width > 1050 ? <AdminMenu open={true} variant={'permanent'} menuIconView={false}/> : <AdminHeader header={title}/>}
            <div className={classes.wrapper}>
                {Store.width > 1050 && <div className={classes.header}><Typography variant={'h5'}>{title}</Typography></div>}
                <Divider/>
                <div className={classes.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default observer(AdminPageWrapper);
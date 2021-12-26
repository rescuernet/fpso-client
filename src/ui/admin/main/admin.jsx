import React from 'react';
import {observer} from "mobx-react-lite";
import AdminMenu from "../menu/admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import Store from "../../../bll/store";
import AdminHeader from "../header/admin-header";
import {Divider, Typography} from "@material-ui/core";

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
}));

let aaa = [1, 3, 4, 5, 7, 8],
    bbb = [1, 2, 3, 4, 5, 6];

const diff = function(aaa, bbb) {
    return bbb.filter(i=>!aaa.includes(i))
}

console.log(diff(aaa,bbb))



const Admin = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {Store.width > 1050 ? <AdminMenu open={true} variant={'permanent'} menuIconView={false}/> : <AdminHeader header={'Главная панель'}/>}
            <div className={classes.wrapper}>
                {Store.width > 1050 && <div className={classes.header}><Typography variant={'h5'}>Главная панель</Typography></div>}
                <Divider/>
                <div className={classes.content}>
                    Главная панель
                </div>
            </div>
        </div>
    );
}

export default observer(Admin)


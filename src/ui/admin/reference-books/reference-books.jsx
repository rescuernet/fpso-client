import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Divider, Typography} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import Store from "../../../bll/store";
import AdminMenu from "../admin-menu";
import AdminHeader from "../header/admin-header";
import PoolIcon from '@material-ui/icons/Pool';
import {NavLink} from "react-router-dom";
import {RM} from "../../../routes/routes";

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
        padding: '20px 10px',
        '@media (max-width: 1050px)' : {
            marginTop: 55,
        },
        '@media (max-width: 600px)' : {
            marginTop: 45,
        },
    },
    reference: {
        display: "flex",
        justifyContent: "center"
    },
    referenceItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: 'center',
        width: 150,
        height: 150,
        border: '1px solid #007eff',
        borderRadius: 5,
        transition: '0.2s',
        '& svg': {
            fontSize: 100,
            color: '#007eff',
            transition: '0.3s',
        },
        '&:hover': {
            cursor: 'pointer',
            borderColor: '#ff7600',
            '& svg': {
                color: '#ff7600'
            }
        }
    },
    referenceTitle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexGrow: 1
    }
}))

const ReferenceBooks = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {Store.width > 1050 ? <AdminMenu open={true} variant={'permanent'} menuIconView={false}/> : <AdminHeader header={'Справочники'}/>}
            <div className={classes.wrapper}>
                {Store.width > 1050 && <div className={classes.header}><Typography variant={'h5'}>Справочники</Typography></div>}
                <Divider/>
                <div className={classes.content}>
                    <div className={classes.reference}>
                        <NavLink to={RM.Admin__Reference__Books__Pool.path}>
                            <div className={classes.referenceItem}>
                                <PoolIcon />
                                <div className={classes.referenceTitle}>
                                    <span>бассейны</span>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(ReferenceBooks);
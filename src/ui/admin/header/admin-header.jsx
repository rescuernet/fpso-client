import React from 'react';
import {AppBar} from "@material-ui/core";
import AdminMenu from "../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import {useGridPoint} from "../../../utils/breakpoints";

const useStyles = makeStyles((theme) => ({
    appBar: {
        display:'flex',
        flexDirection:'row',
        alignItems: "center",
        position: "fixed",
        [useGridPoint.breakpoints.down('xs')]: {
            marginBottom: 5,
        },
        /*backgroundColor: '#585858'*/
    }
}))

const AdminHeader = (props) => {
    const classes = useStyles()



    return (
        <AppBar className={classes.appBar}>
            <AdminMenu/>
            <div>{props.header}</div>
        </AppBar>
    );
};

export default AdminHeader;
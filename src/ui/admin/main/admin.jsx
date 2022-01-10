import React from 'react';
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import AdminPageWrapper from "../common/admin-page-wrapper";

const useStyles = makeStyles((theme) => ({}));


const Admin = () => {
    const classes = useStyles();

    return (
        <AdminPageWrapper title={'Главная'}>
            Главная
        </AdminPageWrapper>
    );
}

export default observer(Admin)


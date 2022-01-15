import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import AdminPageWrapper from "../../admin-page-wrapper";

const useStyles = makeStyles((theme) => ({}))

const Judges = (props) => {
    const classes = useStyles();

    return (
        <AdminPageWrapper title={'Судьи'}>
            <div className={classes.wrapper}>
                Судьи
            </div>
        </AdminPageWrapper>
    );
};

export default observer(Judges);
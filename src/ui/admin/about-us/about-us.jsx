import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import AdminPageWrapper from "../admin-page-wrapper";
import {Button} from "@material-ui/core";
import AdminAboutUsStore from "../../../bll/admin/admin-about-us-store";
import {runInAction, toJS} from "mobx";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        maxWidth: 600,
    },
    control: {
        marginBottom: 20,
        '@media (max-width: 600px)' : {
            marginTop: 20
        },
    },
}))

const AdminAboutUs = (props) => {
    const classes = useStyles();

    useEffect(()=>{
        runInAction( async () => {
            await AdminAboutUsStore.aboutUsGet()
        })
    },[])

    const aboutUs = toJS(AdminAboutUsStore.aboutUs)

    console.log(aboutUs)

    return (
        <AdminPageWrapper title={'О нас'}>
            <div className={classes.wrapper}>

            </div>
        </AdminPageWrapper>
    );
};

export default observer(AdminAboutUs);
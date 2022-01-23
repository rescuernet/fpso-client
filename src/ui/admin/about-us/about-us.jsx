import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import AdminPageWrapper from "../admin-page-wrapper";
import AdminAboutUsStore from "../../../bll/admin/admin-about-us-store";
import {runInAction, toJS} from "mobx";
import Store from "../../../bll/store";
import AdminAboutUsFields from "./about-us-fields";
import AdminAboutUsDocs from "./about-us-docs";

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
        return () => {
            runInAction(async () => {
                await Store.sendMediaDelTmp()
                AdminAboutUsStore.clearData()
            })
        }
    },[])

    return (
        <AdminPageWrapper title={'О нас'}>
            <div className={classes.wrapper}>
                <AdminAboutUsFields/>
                <AdminAboutUsDocs/>
            </div>
        </AdminPageWrapper>
    );
};

export default observer(AdminAboutUs);
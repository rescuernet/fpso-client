import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, FormControlLabel, Switch} from "@material-ui/core";
import AdminNewsStore from "../../../../bll/admin/admin-news-store";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
    controlCheckBox: {
        display: "flex",
        flexDirection: 'column',
        flexWrap: "wrap",
        padding: 10
    },
}))

const CompetitionsCheckbox = ({edit}) => {
    const classes = useStyles();

    //смена закрепления новости
    const ChangeFixedNews = (event) => {
        runInAction(()=>{
            AdminNewsStore.news_tmp.fixedNews = event.target.checked
        })
    };

    //смена важности новости
    const ChangeImportantNews = (event) => {
        runInAction(()=>{
            AdminNewsStore.news_tmp.importantNews = event.target.checked
        })
    };
    //опубликовать после сохранения
    const ChangePublishAfterSave = (event) => {
        runInAction(()=>{
            AdminNewsStore.news_tmp.published = event.target.checked
        })
    };

    return (
        <div className={classes.controlCheckBox}>
            <FormControlLabel
                control={
                    <Switch
                        checked={AdminNewsStore.news_tmp.fixedNews}
                        onChange={ChangeFixedNews}
                        name="fixedNews"
                        color="secondary"
                    />
                }
                label="закрепить новость"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={AdminNewsStore.news_tmp.importantNews}
                        onChange={ChangeImportantNews}
                        name="importantNews"
                        color="secondary"
                    />
                }
                label="важная новость"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={AdminNewsStore.news_tmp.published}
                        onChange={ChangePublishAfterSave}
                        name="publishAfterSave"
                        color="secondary"
                    />
                }
                label={edit ? 'опубликовать' : 'опубликовать после сохранения'}
            />
        </div>
    );
};

export default observer(CompetitionsCheckbox);
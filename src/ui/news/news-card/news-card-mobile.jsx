import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import s from '../news.module.css'
import * as dateFns from "date-fns";
import {runInAction} from "mobx";
import UiNewsStore from "../../../bll/ui-news-store";
import {NEWS_URL} from "../../../const/const";
import noNewsAvatar from "../../../common/assets/image/no_news_avatar.jpg";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        width: 320,
        marginBottom: 30,
        backgroundColor: '#fafafa',
        border: 'solid 1px #e6e6e6',
        borderRadius: 5,
        overflow: 'hidden'
    },
    image: {
        display: "flex",
        justifyContent: "center",
        flex: '0 0 auto',
        fontSize: 0,
        padding: 20,
        '& img': {
            borderRadius: 100
        }
    },
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: '1 0',
        margin: '0 15px',
    },
    control: {
        display: "flex",
        justifyContent: "space-between",
        flex: '0 0 auto',
        margin: '10px',
    },
    date: {
        display: "flex",
        alignItems: "center",
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#005580'
    }
});

export const NewsCardMobile = (props)=> {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.image}>
                <img src={
                    props.news.avatar
                        ? `${NEWS_URL}/${props.news._id}/avatar/${props.news.avatar}`
                        : noNewsAvatar
                } alt=""/>
            </div>
            <div className={classes.header}>
                <div className={s.headerText}>
                    {props.news.headerFirst}
                </div>
            </div>
            <div className={classes.control}>
                <Button
                    size="small"
                    color="primary"
                    onClick={()=>{runInAction(()=>{
                        UiNewsStore.newsViewModal_open = true;
                        UiNewsStore.newsViewModal_index = props.index
                    })}}
                >
                    Подробнее..
                </Button>
                <div className={classes.date}>{dateFns.format(new Date(props.news.dateStart), 'dd.MM.yyyy')}</div>
            </div>
        </div>
    );
}

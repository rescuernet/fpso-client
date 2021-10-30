import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import s from '../news.module.css'
import * as dateFns from "date-fns";
import {runInAction} from "mobx";
import UiStore from "../../../bll/ui-store";
import {NEWS_URL} from "../../../const/const";
import noNewsAvatar from "../../../common/assets/image/no_news_avatar.jpg"

const useStyles = makeStyles({
    root: {
        display: "flex",
        width: 600,
        marginBottom: 30,
        backgroundColor: '#fff',
        border: 'solid 1px #e6e6e6',
        borderRadius: 5,
        overflow: 'hidden'
    },
    image: {
        flex: '0 0 auto',
        fontSize: 0,
        '& img': {
            width: '200px',
        }
    },
    data: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",

    },
    date: {
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#005580',
        textAlign: "right",
        padding: '10px 15px 0 0',
    },
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: '1 0',
        margin: '0 15px',
    },
    control: {
        textAlign: "right",
        padding: '0 15px',
    },
});

const NewsCardDesktop = (props) => {
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
            <div className={classes.data}>
                <div className={classes.date}>{dateFns.format(new Date(props.news.dateStart), 'dd.MM.yyyy')}</div>
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
                            UiStore.newsViewModal_open = true;
                            UiStore.newsViewModal_index = props.index
                        })}}
                    >
                        Подробнее..
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewsCardDesktop;
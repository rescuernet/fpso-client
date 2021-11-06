import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import s from '../news.module.css'
import * as dateFns from "date-fns";
import {runInAction} from "mobx";
import UiNewsStore from "../../../bll/ui/ui-news-store";
import {NEWS_URL} from "../../../const/const";
import noNewsAvatar from "../../../common/assets/image/no_news_avatar.jpg";
import {Divider} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        width: 320,
        marginBottom: 30,
        backgroundColor: '#fff',
        border: 'solid 1px #e6e6e6',
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        display: "flex",
        justifyContent: "center",
        flex: '0 0 auto',
        fontSize: 0,
        padding: 20,
        '& img': {
            borderRadius: 10
        }
    },
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: '1 0',
        margin: '0 15px 15px 15px',
    },
    control: {
        display: "flex",
        justifyContent: "space-between",
        flex: '0 0 auto',
        padding: '10px',
        backgroundColor: '#005580',
        '& button': {
            color: '#fff'
        }
    },
    date: {
        display: "flex",
        alignItems: "center",
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#fff'
    }
});

export const NewsCardMobile = ({news, index})=> {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.image}>
                <img src={
                    news.avatar
                        ? `${NEWS_URL}/${news._id}/avatar/${news.avatar}`
                        : noNewsAvatar
                } alt=""/>
            </div>
            <div className={classes.header}>
                <div className={s.headerText}>
                    {news.headerFirst}
                </div>
            </div>
            <Divider/>
            <div className={classes.control}>
                {index >= 0 &&
                    <Button
                        size="small"
                        color="primary"
                        onClick={()=>{runInAction(()=>{
                            UiNewsStore.newsViewModal_open = true;
                            UiNewsStore.newsViewModal_index = index
                        })}}
                    >
                        Подробнее..
                    </Button>
                }

                <div className={classes.date}>{dateFns.format(new Date(news.dateStart), 'dd.MM.yyyy')}</div>
            </div>
        </div>
    );
}

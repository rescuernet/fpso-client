import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import s from '../news.module.css'
import * as dateFns from "date-fns";
import {API_URL} from "../../../../const/const";
import {Divider} from "@material-ui/core";
import {UI_RM} from "../../../../routes/ui-routes";
import {NavLink} from "react-router-dom";

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
                        ? `${API_URL}/news/${news._id}/avatar/${news.avatar}`
                        : index || index === 0
                            ? `${API_URL}/img/nonewsavatar/${index}.jpg`
                            : `${API_URL}/img/nonewsavatar/${Math.floor(Math.random() * 10)}.jpg`
                } alt=""/>
            </div>
            <div className={classes.header}>
                <div className={s.headerText}>
                    {news.headerFirst}
                </div>
            </div>
            <Divider/>
            <div className={classes.control}>
                <NavLink to={UI_RM.News__Id.getUrl(news._id)}>
                    <Button
                        size="small"
                        color="primary"
                    >
                        Подробнее..
                    </Button>
                </NavLink>
                <div className={classes.date}>{dateFns.format(new Date(news.dateStart), 'dd.MM.yyyy')}</div>
            </div>
        </div>
    );
}

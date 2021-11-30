import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import s from '../news.module.css'
import * as dateFns from "date-fns";
import {API_URL} from "../../../../const/const";
import {NavLink} from "react-router-dom";
import {UI_RM} from "../../../../routes/ui-routes";
import {observer} from "mobx-react-lite";

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
            width: 150,
        },
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
    importantNews: {
        borderColor: '#ff0000',
        backgroundColor: '#fff5f5'
    }
});

const NewsCardDesktop = ({news,index,mainIndex}) => {
    const classes = useStyles();
    return (
        <div className={`${classes.root} ${news.importantNews && classes.importantNews}`}>
            <div className={classes.image}>
                <img src={
                    news.avatar
                        ? `${API_URL}/news/${news._id}/avatar/${news.avatar}`
                        : index || index === 0
                            ? `${API_URL}/nonewsavatar/${index}.jpg`
                            : `${API_URL}/nonewsavatar/${Math.floor(Math.random() * 10)}.jpg`
                } alt=""/>
            </div>
            <div className={classes.data}>
                <div className={classes.date}>{dateFns.format(new Date(news.dateStart), 'dd.MM.yyyy')}</div>
                <div className={classes.header}>
                    <div className={s.headerText}>
                        {news.headerFirst}
                    </div>
                </div>
                <div className={classes.control}>
                    <NavLink to={UI_RM.News__Id.getUrl(news._id)}>
                        <Button
                            size="small"
                            color="primary"
                        >
                            Подробнее..
                        </Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default observer(NewsCardDesktop);
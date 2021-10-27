import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import s from './news.module.css'
import * as dateFns from "date-fns";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        width: 370,
        marginBottom: 30,
        backgroundColor: '#fff',
        border: 'solid 1px #e6e6e6',
        borderRadius: 5,
        overflow: 'hidden'
    },
    image: {
        flex: '0 0 auto',
        fontSize: 0,
        marginBottom: 20,
        '& img': {
            width: '100%',
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

export const NewsCard = ({news})=> {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.image}>
                <img src={`http://localhost:5000/news/${news._id}/avatar/${news.avatar}`} alt=""/>
            </div>
            <div className={classes.header}>
                <div className={s.headerText}>
                    {news.headerFirst}
                </div>
            </div>
            <div className={classes.control}>
                <Button
                    size="small"
                    color="primary"

                >
                    Подробнее..
                </Button>
                <div className={classes.date}>{dateFns.format(new Date(news.dateStart), 'dd.MM.yyyy')}</div>
            </div>
        </div>
    );
}

import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Divider} from "@material-ui/core";
import s from './comp.module.css'
import * as dateFns from "date-fns";
import {HTTPS_PROTOCOL, YA_ENDPOINT, YA_PUBLIC_BUCKET} from "../../../const/const";
import {NavLink} from "react-router-dom";
import {UI_RM} from "../../../routes/ui-routes";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        width: 300,
        height: 510,
        backgroundColor: '#fff',
        boxShadow: '4px 4px 10px rgba(0,0,0,0.2)',
        margin: '0 10px 40px 10px',
        borderRadius: 5,
        overflow: "hidden",
        position: "relative"
    },
    compEndMedal: {
        position: "absolute",
        width: '100%',
        textAlign: "center"
    },
    avatar: {
        fontSize: 0,
        '& img': {
            width: 300,
            height: 300,
        }
    },
    date: {
        height: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ff6000',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: '100%',
        color: '#fff',
    },
    location: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'Roboto',
        fontSize: '85%',
        padding: '0 20px',
        height: 45
    },
    text: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: '#333',
        fontFamily: 'Robobto',
        fontSize: '110%',
        fontWeight: 'bold',
        flexGrow: 1,
        margin: '0 10px'
    },
    more: {
        textAlign: "right",
        textTransform: "uppercase",
        fontFamily: 'Robobto',
        color: '#005580',
    }
}))

const CompItem = ({comp,index}) => {
    const classes = useStyles();

    const curDate = dateFns.format(new Date(), 'yyyy-MM-dd')
    const compDateEnd = dateFns.format(new Date(comp.dateEnd), 'yyyy-MM-dd')

    return (
        <Box className={classes.root}>
            {curDate > compDateEnd &&
                <div className={classes.compEndMedal}>
                    <img src={`${HTTPS_PROTOCOL}${YA_PUBLIC_BUCKET}.${YA_ENDPOINT}/crm/medalsCompCard.png`} alt=""/>
                </div>
            }
            <div className={classes.avatar}>
                <img src={
                    comp.avatar
                        ? `${HTTPS_PROTOCOL}${YA_PUBLIC_BUCKET}.${YA_ENDPOINT}/${comp.avatar}`
                        : "http://khvnews.ru/wp-content/uploads/2020/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-42.jpg"
                } alt=""/>
            </div>
            <div className={classes.date}>
                {comp.dateStart === comp.dateEnd
                ? dateFns.format(new Date(comp.dateStart), 'dd.MM.yyyy')
                : `${dateFns.format(new Date(comp.dateStart), 'dd.MM.yyyy')} - ${dateFns.format(new Date(comp.dateEnd), 'dd.MM.yyyy')}`}
            </div>
            <div className={classes.location}>{comp.location}</div>
            <Divider/>
            <div className={classes.text}>
                <div className={s.text}>{comp.headerFirst}</div>
            </div>
            <div className={classes.more}>
                <NavLink to={UI_RM.Competitions__Id.getUrl(comp._id)}>
                    <Button
                        size="small"
                        color="primary"
                    >
                        Подробнее..
                    </Button>
                </NavLink>
            </div>
        </Box>
    );
};

export default CompItem;
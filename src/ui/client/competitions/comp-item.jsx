import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Divider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        width: 300,
        height: 455,
        backgroundColor: '#fff',
        boxShadow: '4px 4px 10px rgba(0,0,0,0.2)',
        margin: '0 10px 40px 10px'
    },
    avatar: {
        fontSize: 0,
        '& img': {
            width: 300,
            height: 250,
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
        color: '#fff'
    },
    location: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ff6000',
        fontFamily: 'Roboto',
        fontSize: '90%',
        color: '#fff',
        paddingBottom: 5
    },
    text: {
        display: "flex",
        alignItems: "center",
        color: '#333',
        fontFamily: 'Robobto',
        fontSize: '110%',
        fontWeight: 'bold',
        flexGrow: 1,
        margin: 10
    },
    more: {
        textAlign: "right",
        textTransform: "uppercase",
        fontFamily: 'Robobto',
        fontSize: '80%',
        color: '#005580',
        padding: '5px 15px 5px 5px'
    }
}))

const CompItem = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <div className={classes.avatar}>
                <img src="http://khvnews.ru/wp-content/uploads/2020/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-42.jpg" alt=""/>
            </div>
            <div className={classes.date}>14.12.2021 - 17.12.2021</div>
            <div className={classes.location}>
                <div>Дельфин</div>
                <div>Новокуйбышевск, проспект Победы 1в</div>
            </div>
            <div className={classes.text}>Соревнования Самарской области среди юношей и девушек 9-10 лет, 11-12 лет и юношей 13-14 лет по плаванию</div>
            <div className={classes.more}>подробнее</div>
        </Box>
    );
};

export default CompItem;
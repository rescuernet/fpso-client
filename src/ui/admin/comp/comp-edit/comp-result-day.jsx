import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import CompResultItemDocs from "./comp-result-day-docs";

const useStyles = makeStyles((theme) => ({
    compDay: {
        border: '1px solid #ccc',
        padding: 5,
        marginBottom: 20
    },
    header: {
        fontFamily: "Roboto",
        fontSize: '100%',
        fontWeight: 'bold',
        textAlign: "center",
        margin: '10px 0 20px 0'
    },
}))

const CompResultDay = ({index,compId,item}) => {

    const classes = useStyles();

    return (
        <div className={classes.compDay}>
            <div className={classes.header}>
                {`Результаты ${index +1}-го дня соревнований`}
            </div>
            <CompResultItemDocs indexDay={index} compId={compId}/>
        </div>
    );
};

export default observer(CompResultDay);
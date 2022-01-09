import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) => ({
    item: {
        maxWidth: 650,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        border: '1px solid #ccc',
        borderRadius: 5,
        padding: 10,
    }
}))

const PoolsItem = ({item,index}) => {
    const classes = useStyles();
    return (
        <div className={classes.item}>
            <div className={classes.name}>
                <div>{item.name}</div>
                <div>{item.address}</div>
            </div>
            <ChevronRightIcon style={{color: '#818181'}}/>
        </div>
    );
};

export default observer(PoolsItem);
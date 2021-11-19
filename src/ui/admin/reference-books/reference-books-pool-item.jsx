import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {TextField} from "@material-ui/core";
import {runInAction} from "mobx";
import Store from "../../../bll/store";

const useStyles = makeStyles((theme) => ({
    item: {
        maxWidth: 650,
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginBottom: 20,
        borderBottom: '1px solid #ccc',
        '& .MuiTextField-root': {
            marginBottom: 20,
            minWidth: 300
        }
    }
}))

const ReferenceBooksPoolItem = ({item,index}) => {
    const classes = useStyles();
    return (
        <div className={classes.item}>
            <TextField
                label="Бассейн"
                value={item.poolName}
                onChange={(e)=>{
                    runInAction(()=>{
                        Store.referenceBooks.pool[index].poolName = e.target.value
                    })
                }}
                variant="outlined"
                error={Store.referenceBooks.pool[index].poolName && Store.referenceBooks.pool[index].poolName.length > 50}
                helperText={Store.referenceBooks.pool[index].poolName && Store.referenceBooks.pool[index].poolName.length > 50 && 'максимум 50 символов'}
            />
            <TextField
                label="Адрес"
                value={item.poolAddress}
                onChange={(e)=>{
                    runInAction(()=>{
                        Store.referenceBooks.pool[index].poolAddress = e.target.value
                    })
                }}
                variant="outlined"
                error={Store.referenceBooks.pool[index].poolAddress && Store.referenceBooks.pool[index].poolAddress.length > 50}
                helperText={Store.referenceBooks.pool[index].poolAddress && Store.referenceBooks.pool[index].poolAddress.length > 50 && 'максимум 50 символов'}
            />
        </div>
    );
};

export default observer(ReferenceBooksPoolItem);
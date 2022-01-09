import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {TextField} from "@material-ui/core";
import {runInAction, toJS} from "mobx";
import AdminReferenceBooksStore from "../../../../bll/admin/admin-reference-books-store";
import {useHistory, useParams} from "react-router-dom";
import Store from "../../../../bll/store";
import AdminNewsStore from "../../../../bll/admin/admin-news-store";

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

const PoolsEdit = (props) => {
    const classes = useStyles();

    const history = useHistory();
    const { id } = useParams();


    useEffect(()=>{
        runInAction(async () => {
            await AdminReferenceBooksStore.poolsId(id)
        })
        /*return ()=> {
            runInAction(async () => {
                await Store.sendMediaDelTmp()
                AdminNewsStore.clearData()})
        }*/
    },[id])

    const pool = AdminReferenceBooksStore.referenceBooks.pools.one

    return (
        <div className={classes.item}>
            <TextField
                label="Бассейн"
                value={pool?.name || ''}
                onChange={(e)=>{
                    runInAction(()=>{
                        AdminReferenceBooksStore.referenceBooks.pools.one.name = e.target.value
                    })
                }}
                variant="outlined"
                error={AdminReferenceBooksStore.referenceBooks.pools.one?.name && AdminReferenceBooksStore.referenceBooks.pools.one?.name.length > 50}
                helperText={AdminReferenceBooksStore.referenceBooks.pools.one?.name && AdminReferenceBooksStore.referenceBooks.pools.one?.name.length > 50 && 'максимум 50 символов'}
            />
            <TextField
                label="Адрес"
                value={pool?.address || ''}
                onChange={(e)=>{
                    runInAction(()=>{
                        AdminReferenceBooksStore.referenceBooks.pools.one.address = e.target.value
                    })
                }}
                variant="outlined"
                error={AdminReferenceBooksStore.referenceBooks.pools.one?.address && AdminReferenceBooksStore.referenceBooks.pools.one?.address.length > 50}
                helperText={AdminReferenceBooksStore.referenceBooks.pools.one?.address && AdminReferenceBooksStore.referenceBooks.pools.one?.address.length > 50 && 'максимум 50 символов'}
            />
        </div>
    );
};

export default observer(PoolsEdit);
import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, Typography} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import AdminMenu from "../../menu/admin-menu";
import AdminHeader from "../../header/admin-header";
import {runInAction, toJS} from "mobx";
import PoolsItem from "./pools-item";
import {useHistory} from "react-router-dom";
import {ADM_RM} from "../../../../routes/admin-routes";
import AdminReferenceBooksStore from "../../../../bll/admin/admin-reference-books-store";
import Store from "../../../../bll/store";
import AdminNewsStore from "../../../../bll/admin/admin-news-store";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        '@media (max-width: 1050px)' : {
            justifyContent: 'center'
        },
        position: "relative"
    },
    wrapper: {
        flexGrow: 1,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: 20
    },
    content: {
        display: "flex",
        flexDirection: "column",
        padding: '20px 10px',
        '@media (max-width: 1050px)' : {
            marginTop: 55,
        },
        '@media (max-width: 600px)' : {
            marginTop: 45,
        },
    },
    pool: {
        margin: 20,
        '@media (max-width: 600px)' : {
            margin: 0,
            marginBottom: 20
        },
    },
    control: {
        maxWidth: 650,
        display: "flex",
        justifyContent: "space-between",
        margin: 20,
        marginTop: 0,
        '@media (max-width: 600px)' : {
            margin: 0,
            marginBottom: 20
        },
    },
}))

const Pools = (props) => {
    const classes = useStyles();
    const history = useHistory()

    useEffect(()=>{
        runInAction(async ()=>{
            await AdminReferenceBooksStore.poolsGet()
        })
    },[])

    const create = () => {
        runInAction(async ()=>{
            const response = await AdminReferenceBooksStore.poolsCreate()
            response === 'OK'
                ? history.push(ADM_RM.Reference__Books__Pool_Edit.getUrl(AdminReferenceBooksStore.referenceBooks.pools.id))
                : history.push(ADM_RM.Reference__Books__Pool.path)
        })
    }

    const pool = toJS(AdminReferenceBooksStore.referenceBooks.pools.list)

    return (
        <div className={classes.root}>
            {Store.width > 1050 ? <AdminMenu open={true} variant={'permanent'} menuIconView={false}/> : <AdminHeader header={'Бассейны'}/>}
            <div className={classes.wrapper}>
                {Store.width > 1050 && <div className={classes.header}><Typography variant={'h5'}>Бассейны</Typography></div>}
                <Divider/>
                <div className={classes.content}>
                    <div className={classes.control}>
                        <Button variant={"contained"} color={"primary"} onClick={()=>{create()}}>Добавить новый</Button>
                    </div>
                    <div className={classes.pool}>
                        {pool &&
                        pool.map((item,index)=>(
                            <PoolsItem key={'referenceItem'+index} item={item} index={index}/>
                        ))
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Pools);
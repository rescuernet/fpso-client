import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, Typography} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import Store from "../../../bll/store";
import AdminMenu from "../menu/admin-menu";
import AdminHeader from "../header/admin-header";
import {runInAction, toJS} from "mobx";
import ReferenceBooksPoolItem from "./reference-books-pool-item";
import {useHistory} from "react-router-dom";
import {ADM_RM} from "../../../routes/admin-routes";

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
        margin: 20
    },
    control: {
        maxWidth: 650,
        display: "flex",
        justifyContent: "space-between",
        margin: '0 20px'
    },
}))

const ReferenceBooksPool = (props) => {
    const classes = useStyles();
    const history = useHistory()

    useEffect(()=>{
        runInAction(async ()=>{
            await Store.referenceBookGet()
        })
    },[])

    const pool = toJS(Store.referenceBooks?.pool)

    const UpdateReference = ()=> {
        runInAction(async ()=>{
            await Store.referenceBookUpdate()
            history.push(ADM_RM.Reference__Books.path)
        })
    }

    return (
        <div className={classes.root}>
            {Store.width > 1050 ? <AdminMenu open={true} variant={'permanent'} menuIconView={false}/> : <AdminHeader header={'Бассейны'}/>}
            <div className={classes.wrapper}>
                {Store.width > 1050 && <div className={classes.header}><Typography variant={'h5'}>Бассейны</Typography></div>}
                <Divider/>
                <div className={classes.content}>
                    <div className={classes.pool}>
                        {pool &&
                        pool.map((item,index)=>(
                            <ReferenceBooksPoolItem key={'referenceItem'+index} item={item} index={index}/>
                        ))
                        }

                    </div>
                    {pool &&
                        <div className={classes.control}>
                            <Button variant={"contained"} color={"primary"} onClick={()=>{runInAction(()=>{Store.referenceBooks.pool.push({poolName:'',poolAddress:''})})}}>Добавить новый</Button>
                            <Button variant={"contained"} color={"secondary"} onClick={()=>{UpdateReference()}}>Сохранить</Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default observer(ReferenceBooksPool);
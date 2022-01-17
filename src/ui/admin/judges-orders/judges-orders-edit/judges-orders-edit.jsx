import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import AdminPageWrapper from "../../admin-page-wrapper";
import {useHistory, useParams} from "react-router-dom";
import AdminJudgesOrdersStore from "../../../../bll/admin/admin-judges-orders-store";
import {runInAction, toJS} from "mobx";
import Store from "../../../../bll/store";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {Judges_rank_doc} from "../../../../types/types";
import * as dateFns from "date-fns";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";
import {JudgesOrdersEditPeoplePopup} from "./judges-orders-edit-people-popup";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: 600,
        '@media (max-width: 750px)' : {
            width: 340,
        },
        '@media (max-width: 1280px)' : {
            margin: '20px auto'
        },
    },
    date: {
        marginBottom: 20
    },
    selectType: {
        maxWidth: 400
    }
}))

const JudgesOrdersEdit = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const {id} = useParams();

    const [open,setOpen] = useState(false)

    useEffect(() => {
        runInAction(async () => {
            await Store.sendMediaDelTmp()
            await AdminJudgesOrdersStore.judgesOrdersId(id)
        })
        return () => {
            runInAction(async () => {
                await Store.sendMediaDelTmp()
                AdminJudgesOrdersStore.clearData()
            })
        }
    }, [id])

    const order = AdminJudgesOrdersStore.judgesOrders.one

    const addJudges = () => {
        runInAction(()=> {
            AdminJudgesOrdersStore.judgesOrders.people = []
            setOpen(true)
        })
    }

    return (
        <AdminPageWrapper title={'Судьи. Новый приказ'}>
            {order && (
                <div className={classes.wrapper}>
                    <div className={classes.date}>
                        <TextField
                            id="dateOrder"
                            label="Дата приказа"
                            type="date"
                            value={dateFns.format(new Date(order.dateOrder), 'yyyy-MM-dd')}
                            onChange={(e)=>{
                                runInAction(()=>{
                                    order.dateOrder = e.target.value
                                })
                            }}
                            variant={"outlined"}
                            InputLabelProps={{shrink: true,}}
                        />
                    </div>
                    <div className={classes.selectType}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="orders-type-select-label">Выберите тип приказа</InputLabel>
                            <Select
                                labelId="orders-type-select-label"
                                id="orders-type-select"
                                value={''}
                                /*onChange={(e)=>{
                                    runInAction(()=>{
                                        AdminCompStore.compOne.location = e.target.value
                                    })
                                }}*/
                                label="Выберите тип приказа"
                            >
                                <MenuItem value=''>
                                    <em>Не выбрано</em>
                                </MenuItem>
                                {Judges_rank_doc.map((item)=>(
                                    <MenuItem key={item.value} classes={{root: classes.selectMenuItem}} value={item.value}>{item.title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <Button onClick={()=>{addJudges()}}>Добавить судью</Button>
                    {open && (
                        <JudgesOrdersEditPeoplePopup
                            open={open}
                            setOpen={setOpen}
                        />
                    )}

                </div>

            )}
        </AdminPageWrapper>
    );
};

export default observer(JudgesOrdersEdit);
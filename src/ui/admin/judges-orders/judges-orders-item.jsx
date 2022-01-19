import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {Judges_rank_doc} from "../../../types/types";
import JudgesOrdersItemDocs from "./judges-orders-item-docs";
import * as dateFns from "date-fns"
import {NavLink, useHistory} from "react-router-dom";
import {ADM_RM} from "../../../routes/admin-routes";
import AdminJudgesOrdersStore from "../../../bll/admin/admin-judges-orders-store";

const useStyles = makeStyles((theme) => ({
    order: {
        border: '1px solid #233044',
        padding: 10,
        marginBottom: 20
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        borderBottom: '1px solid #ccc',
        marginBottom: 10,
        paddingBottom: 5,
        textTransform: "uppercase",
        fontSize: '80%',
    },
    openOrder: {
        '&:hover': {
            cursor: 'pointer',
            color: '#ff6200'
        }
    },
    orderHeaders: {
        borderBottom: '1px solid #ccc',
        textTransform: "uppercase",
        fontSize: '80%',
        fontWeight: "bold",
        marginBottom: 15,
        paddingBottom: 10,
    },
    judges: {
        marginBottom: 20,
        paddingBottom: 5,
        borderBottom: '1px solid #ccc',
    },
    judgesItem: {
        paddingBottom: 10
    }
}))

const JudgesOrdersItem = ({item}) => {

    const classes = useStyles();
    const history = useHistory()

    const orderType = Judges_rank_doc.find((i => i.value === item.orderType))

    const openOrder = () => {
        history.push(ADM_RM.Judges_Orders_Edit.getUrl(item._id))
    }


    return (
        <div className={classes.order}>
            <div className={classes.header}>
                <div>{dateFns.format(new Date(item.dateOrder), 'dd.MM.yyyy')}</div>
                <div onClick={()=>{openOrder()}} className={classes.openOrder}>открыть приказ >></div>
            </div>

            <div className={classes.orderHeaders}>{orderType.title}</div>
            <div className={classes.judges}>
                {item.judges.map((i,index)=>(
                    <div key={index} className={classes.judgesItem}>{`${index +1}. ${i.surname} ${i.name} ${i.patronymic}`}</div>
                ))}
            </div>
            <div className={classes.docs}>
                {item.docs.length > 0 && item.docs.map((docs,index)=>(
                    <JudgesOrdersItemDocs key={index} index={index} docs={docs}/>
                ))}
            </div>
        </div>
    );
};

export default observer(JudgesOrdersItem);
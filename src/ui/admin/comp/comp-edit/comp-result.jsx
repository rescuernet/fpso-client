import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import Store from "../../../../bll/store";
import AdminCompStore from "../../../../bll/admin/admin-competitions-store";
import {runInAction, toJS} from "mobx";
import {dateDifference} from "../../../../utils/dateDifference";
import CompResultItem from "./comp-result-item";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    results: {
        padding: '20px 0'
    },
    header: {
        textAlign: "center",
        fontSize: '110%',
        fontWeight: "bold"
    },
    docsDeclarationText: {
        fontSize: '90%',
        color: '#00000085',
        marginBottom: 20,
        textAlign: "center",
    },
}))

const CompResult = ({compId}) => {
    const classes = useStyles();

    const countCompDay = dateDifference(AdminCompStore.compOne.dateStart, AdminCompStore.compOne.dateEnd)

    const results = toJS(AdminCompStore.compOne.results)



    return (
        <>
            <div className={classes.results}>
                <div className={classes.header}>Результаты</div>
                <div className={classes.docsDeclarationText}>* Результаты привязываются к конкретной дате (дню соревнований)</div>
                {results.length > 0 && results.map((item,index)=> (
                    <CompResultItem key={index} index={index} compId={compId}/>
                ))}
                {!results || results.length < countCompDay &&
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={()=>{
                            runInAction(()=>{AdminCompStore.compOne.results.push({})})}}
                    >
                        {`Создать результаты ${results.length +1}-го дня`}
                    </Button>
                }
            </div>
        </>
    );
};

export default observer(CompResult);
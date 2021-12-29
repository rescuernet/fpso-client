import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import UiCompStore from "../../../../../bll/ui/ui-comp-store";
import CompViewResultsDay from "./comp-view-results-day";

const useStyles = makeStyles((theme) => ({
    results: {},
}))

const CompViewResults = (props) => {
    const classes = useStyles();
    const results = toJS(UiCompStore.compOne.results)

    return (
        <div className={classes.results}>
            {results.map((item,index)=>(
                <CompViewResultsDay key={index+'Results'} index={index} item={item}/>
            ))}
        </div>
    );
};

export default observer(CompViewResults);
import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import RUSADA from '../../../common/assets/image/RUSADA.png'
import RUSADA_mob from '../../../common/assets/image/RUSADA_mob.png'
import Store from '../../../bll/store'
import {NavLink} from "react-router-dom";
import {UI_RM} from "../../../routes/ui-routes";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
        overflow: "hidden",
        marginBottom: 40,
        padding: '0 20px 10px 20px',
    },
    img: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 10
    },
    content: {
        display: "flex",
        justifyContent: "center",
        color: '#005580'
    }
}))

const RusadaMain = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.img}>
                {Store.width <750 && (<img src={RUSADA_mob} alt=""/>)}
                {Store.width >= 750 && (<img src={RUSADA} alt=""/>)}
            </div>
            <div className={classes.content}><NavLink to={UI_RM.Rusada.path}>перейти в раздел</NavLink></div>
        </div>
    );
};

export default observer(RusadaMain);
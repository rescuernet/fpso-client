import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import RUSADA from '../../../common/assets/image/RUSADA.png'
import RUSADA_mob from '../../../common/assets/image/RUSADA_mob.png'
import Store from '../../../bll/store'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
        overflow: "hidden"
    },
    brand: {
        margin: '10px 0'
    }
}))

const ReusadaMain = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.brand}>
                {Store.width <750 && (<img src={RUSADA_mob} alt=""/>)}
                {Store.width >= 750 && (<img src={RUSADA} alt=""/>)}
            </div>

        </div>
    );
};

export default observer(ReusadaMain);
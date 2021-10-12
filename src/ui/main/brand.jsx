import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import s1 from '../../common/assets/image/11.jpg'
import s2 from '../../common/assets/image/12.jpg'
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((Theme) => ({
    brand: {
        position: "relative",
        marginBottom: 30,
        borderRadius: 0,
        "& img": {
            width: "100%"
        }
    },
}))

const Brand = () => {
    const matches = useMediaQuery('(max-width:500px)');

    const classes = useStyles();

    return (
        <div className={classes.brand}>
            <img src={matches ? s2 : s1} alt=""/>
        </div>
    );
};

export default Brand;
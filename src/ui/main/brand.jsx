import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import BrandFull from '../../common/assets/image/brand_full.jpg'
import BrandMob from '../../common/assets/image/brand_mob.jpg'
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
            <img src={matches ? BrandMob : BrandFull} alt=""/>
        </div>
    );
};

export default Brand;
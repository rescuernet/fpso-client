import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import BrandFullImg from '../../common/assets/image/brand_full_img.jpg'
import BrandFullText from '../../common/assets/image/brand_full_text.png'
import BrandMobImg from '../../common/assets/image/brand_mob_img.jpg'
import {useGridPoint} from "../../utils/breakpoints";

const useStyles = makeStyles((theme) => ({
    brand: {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        marginBottom: 30,
        [useGridPoint.breakpoints.down('md')]: {
            marginBottom: 10,
        },
        borderRadius: 0,
        "& img": {
            [useGridPoint.breakpoints.down('sm')]: {
                width: 270,
                margin: '15px 0',
            },
            [useGridPoint.breakpoints.between('sm','md')]: {
                width: 435,
                margin: '20px 0',
            },
            [useGridPoint.breakpoints.up('md')]: {
                width: 550,
                margin: '30px 0',
            },
            [useGridPoint.breakpoints.up('lg')]: {
                width: 700,
                margin: '50px 0',
            },
        },
        [useGridPoint.breakpoints.down('xs')]: {
            background: `url(${BrandMobImg}) 50% 50%/cover no-repeat`,
        },
        background: `url(${BrandFullImg}) 50% 50%/cover no-repeat`,
    },
}))

const Brand = () => {

    const classes = useStyles();

    return (
        <div className={classes.brand}>
            <img src={BrandFullText} alt=""/>
        </div>
    );
};

export default Brand;
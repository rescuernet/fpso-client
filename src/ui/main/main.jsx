import React from 'react';
import {observer} from "mobx-react-lite";
import {Container, Grid, Paper, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

import s3 from '../../common/assets/image/3.jpg'

const useStyles = makeStyles((Theme) => ({
    paper: {
        position: "relative",
        backgroundImage: `url(${s3})`,
        color: '#fff',
        marginBottom: 30,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    },
    container: {
        flexWrap: "wrap"
    },
    gridContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    mainFeaturesContent: {
        position: "relative",
        padding: 33,
        minWidth: 350
    }
}))


const Main = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Container className={classes.container} fixed>
                <Grid className={classes.gridContainer}>
                    <Grid className={classes.mainFeaturesContent} item sm={6}>
                        <div>
                            <Typography
                                component={'h1'}
                                variant={'h3'}
                                color={'y'}
                                gutterBottom
                            >
                                Samara swimming
                            </Typography>
                            <Typography
                                variant={'h5'}
                                color={'inherit'}
                                paragraph
                            >
                                t is a long established fact
                                that a reader will be distracted
                                by the readable content of a page
                                when looking at its layout.
                                The point of using Lorem Ipsum is
                                that it has a more-or-less normal
                                distribution of letters
                            </Typography>
                            <Button variant="contained" color={"primary"}>Подробнее</Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
};

export default observer(Main);
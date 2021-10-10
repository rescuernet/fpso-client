import React from 'react';
import {AppBar, Container, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Menu from "../menu/menu";
import {observer} from "mobx-react-lite";
import AuthStore from "../../bll/auth-store";
import {useGridPoint} from "../../utils/breakpoints";

const useStyles = makeStyles((theme) => ({
    appBar: {
        display:'flex',
        flexDirection:'row',
        alignItems: "center",
        position: "static"
    },
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    toolBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        minHeight:0,
        flexGrow: 1,
    },
    brand: {
        textTransform: "uppercase",
        '& span' : {
            whiteSpace: 'pre'
        }
    },
    contact: {
        [useGridPoint.breakpoints.down('xs')]: {
            display: 'none'
        }
    }
}))


const Header = (props) => {
    const classes = useStyles()

    const isAuth = AuthStore.isAuth

    return (
        <AppBar className={classes.appBar}>
            <Container className={classes.container} fixed>
                <Menu isAuth={isAuth} logout={AuthStore.logout}/>
                <Toolbar className={classes.toolBar}>
                    <Typography className={classes.brand}>
                        <span>Федерация плавания</span> <span>Самарской области</span>
                    </Typography>
                    <Typography className={classes.contact}>
                        <div>8 (846) 375-92-45</div>
                        <div>swimclub@mail.ru</div>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default observer(Header);




import React from 'react';
import {AppBar, Container, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Menu from "../menu/menu";
import {observer} from "mobx-react-lite";
import AuthStore from "../../../bll/auth-store";
import {useGridPoint} from "../../../utils/breakpoints";

const useStyles = makeStyles((theme) => ({
    appBar: {
        display:'flex',
        flexDirection:'row',
        alignItems: "center",
        position: "fixed",
        borderBottom: '2px solid #ff6200',
        height: 50
    },
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        [useGridPoint.breakpoints.down('xs')]: {
            paddingLeft: 0
        }
    },
    toolBar: {
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        justifyContent: "space-between",
        minHeight:0,
        padding:0
    },
    fpso: {
        textTransform: "uppercase",
        fontSize: 20,
        fontFamily: 'Roboto',
        letterSpacing: 10,
        textShadow: '1px 1px 3px #000',
        [useGridPoint.breakpoints.down('xs')]: {
            textAlign: 'right',
            fontSize: 10,
            letterSpacing: 5,
            width: 100,
        }
    },
    title: {
        textTransform: "uppercase",
        fontSize: '0.8rem',
        fontFamily: 'Roboto',
        letterSpacing: 1.5,
    },
}))


const Header = (props) => {
    const classes = useStyles()

    const isAuth = AuthStore.isAuth

    return (
        <AppBar className={classes.appBar}>
            <Menu isAuth={isAuth} logout={AuthStore.logout}/>
            <Container className={classes.container} fixed>
                <Toolbar className={classes.toolBar}>
                    <div className={classes.title}>{props.title}</div>
                    <div className={classes.fpso}>samara swimming</div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default observer(Header);




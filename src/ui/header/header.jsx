import React from 'react';
import {AppBar, Container, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Menu from "../menu/menu";
import {observer} from "mobx-react-lite";
import AuthStore from "../../bll/auth-store";
import {useGridPoint} from "../../utils/breakpoints";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles((theme) => ({
    appBar: {
        display:'flex',
        flexDirection:'row',
        alignItems: "center",
        position: "static",
        /*backgroundColor: '#585858'*/
    },
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    toolBar: {
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        justifyContent: "space-between",
        minHeight:0,
        padding:0
    },
    contact: {
        display: "flex",
        padding: '5px 0',
        [theme.breakpoints.down(380)]: {
            flexDirection: "column"
        }
    },
    phone: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 20,
        alignItems: "flex-end",
        fontSize: 20,
        [useGridPoint.breakpoints.down('md')]: {
            fontSize: 15
        },
        [useGridPoint.breakpoints.down('xs')]: {
            fontSize: 12
        },
        '& div': {
            marginLeft: 20,
            [useGridPoint.breakpoints.down('sm')]: {
                marginLeft: 5,
            },
        },
        '& svg': {
            fontSize: 22,
            [useGridPoint.breakpoints.down('md')]: {
                fontSize: 17
            },
            [useGridPoint.breakpoints.down('xs')]: {
                fontSize: 13
            }
        }
    },
    email: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 20,
        alignItems: "flex-end",
        fontSize: 22,
        [useGridPoint.breakpoints.down('md')]: {
            fontSize: 17
        },
        [useGridPoint.breakpoints.down('xs')]: {
            fontSize: 15
        },
        '& div': {
            marginLeft: 20,
            [useGridPoint.breakpoints.down('sm')]: {
                marginLeft: 5,
            },
        },
        '& svg': {
            fontSize: 22,
            [useGridPoint.breakpoints.down('md')]: {
                fontSize: 17
            },
            [useGridPoint.breakpoints.down('xs')]: {
                fontSize: 13
            }
        }
    },
    underHeader: {
        height: 3,
        backgroundColor: '#ff6200',
        marginBottom: 10,
    }
}))


const Header = (props) => {
    const classes = useStyles()

    const isAuth = AuthStore.isAuth

    return (
        <>
            <AppBar className={classes.appBar}>
                <Menu isAuth={isAuth} logout={AuthStore.logout}/>
                <Container className={classes.container} fixed>
                    <Toolbar className={classes.toolBar}>
                        <Typography variant={'button'}>{props.title}</Typography>
                        <div className={classes.contact}>
                            <div className={classes.phone}>
                                <PhoneIcon />
                                <div>8 (846) 375-92-45</div>
                            </div>
                            <div className={classes.email}>
                                <MailOutlineIcon />
                                <div>swimclub@mail.ru</div>
                            </div>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            <div className={classes.underHeader}/>
        </>

    );
};

export default observer(Header);




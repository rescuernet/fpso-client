import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useHistory, useLocation} from "react-router-dom";
import {RM} from "../../routes/routes";
import {Divider} from "@material-ui/core";
import AuthStore from '../../bll/auth-store'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NoAvatar__img from '../../common/assets/image/no_avatar.jpg'



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        top: "auto",
        backgroundColor: "#233044",
        padding: '20px 10px 0 10px'
    },
    menuHeader: {
        textAlign: "center"
    },
    avatar: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 10,
        '& img': {
            width: 80,
            height: 'auto',
            borderRadius: 40
        }
    },
    userEmail: {
        color: '#ccc',
        fontSize: 16,
        padding: {

        }
    },
    menuItem: {
        fontSize: 16,
        fontFamily: "Roboto",
        color: "#ccc",
        '& span': {
            fontSize: 0,
            padding: 0,
            margin: 0
        },
        "&:hover": {
            backgroundColor: "#2b3c54",
            transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
        }
    },
    activeLink: {
        color: "#fff",
        backgroundColor: "#2b3c54"
    },
}));

const AdminMenu = () => {
    const menuItems = []
    for (let key in RM) {menuItems.push(RM[key])}
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:750px)');
    const location = useLocation().pathname;
    const history = useHistory();

    return (
        <div className={classes.root}>
            <Drawer
                open={matches}
                className={classes.drawer}
                variant={matches && "permanent"}
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.menuHeader}>
                    <div className={classes.avatar}>{AuthStore.user.avatar ? <img src={AuthStore.user.avatar} alt=""/> : <img src={NoAvatar__img} alt=""/>}</div>
                    <div className={classes.userEmail}>{AuthStore.user.email}</div>
                    <ListItem
                        button key={1}
                        className={classes.menuItem}
                        style={{justifyContent: 'center'}}
                        onClick={()=> history.push('/')}
                    >
                        Перейти на сайт
                    </ListItem>
                </div>

                <List>

                    <Divider style={{backgroundColor: '#ccc'}}/>
                </List>
                <List>
                    <ListItem
                        button key={2}
                        className={location === RM.Admin.path ? classes.menuItem + ' ' + classes.activeLink : classes.menuItem}
                        onClick={()=> history.push(RM.Admin.path)}>
                        {'Главная панель'}
                    </ListItem>
                    {menuItems.map((i) =>
                        i.menu?.type !== 'admin'
                            ? null
                            : (
                                <ListItem
                                    button key={i.path}
                                    className={location.includes(i.path) ? classes.menuItem + ' ' + classes.activeLink : classes.menuItem}
                                    onClick={()=> history.push(i.path)}>
                                        {i.menu.title}
                                </ListItem>
                            )
                    )}
                </List>
            </Drawer>
        </div>
    );
}

export default AdminMenu;


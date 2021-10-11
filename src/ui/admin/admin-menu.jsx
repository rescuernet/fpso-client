import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useHistory, useLocation} from "react-router-dom";
import {RM} from "../../routes/routes";
import {Divider} from "@material-ui/core";


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
        backgroundColor: "#233044"
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
                <List>
                    <ListItem
                        button key={1}
                        className={location === '/' ? classes.menuItem + ' ' + classes.activeLink : classes.menuItem}
                        onClick={()=> history.push('/')}>
                        {'Перейти на сайт'}
                    </ListItem>
                    <Divider/>
                </List>
                <List>
                    <ListItem
                        button key={2}
                        className={location === '/777/admin' ? classes.menuItem + ' ' + classes.activeLink : classes.menuItem}
                        onClick={()=> history.push('/777/admin')}>
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


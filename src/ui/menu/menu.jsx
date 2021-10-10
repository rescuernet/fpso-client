import * as React from 'react';
import {Box, Divider, Drawer, IconButton, List, ListItem, ListItemText} from "@material-ui/core";
import {useHistory, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AuthStore from "../../bll/auth-store";
import {makeStyles} from "@material-ui/core/styles";
import {RM} from "../../routes/routes";
import LockIcon from '@material-ui/icons/Lock';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    menuItem: {
        fontSize: 18,
        textTransform: "uppercase",
        '& span': {
            fontSize: 0,
            padding: 0,
            margin: 0
        },
    },
    activeLink: {
        fontWeight: 500
    },
    menuIcon: {
        fontSize: 35,
        [theme.breakpoints.down('md')]: {
            fontSize: 30
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 25
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 20
        }
    },
    logoutButton: {
        marginBottom: 10
    },
    logoutButtonItem: {
        display: "flex",
        flexDirection: "row",
        textTransform: "uppercase",
        fontSize: 16
    },
    logoutButtonIcon: {
        marginRight: 10,
        fontSize: 18
    }
}))


const Menu = (props) => {

    const classes = useStyles()

    const location = useLocation().pathname;
    const history = useHistory()

    const anchor = 'left';
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const itemsMenu = [
        {id: 2, title: 'Соревнования', url: RM.Competitions.path,adm:0},
        {id: 3, title: 'Admin', url: RM.Admin.path,adm:1}
    ]

    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {AuthStore.isAuth &&
                    <div className={classes.logoutButton}>
                        <ListItem
                            button key={1}
                            className={classes.logoutButtonItem}
                            onClick={AuthStore.logout}>
                            <LockIcon className={classes.logoutButtonIcon}/>
                            <span>выход</span>
                        </ListItem>
                        <Divider />
                    </div>
                }
                <ListItem
                    button key={1}
                    className={location === '/' ? classes.menuItem + ' ' + classes.activeLink : classes.menuItem}
                    onClick={()=> history.push('/')}>
                    {'Главная'}
                </ListItem>
                {itemsMenu.map((i) => (
                    !props.isAuth && i.adm === 1
                        ?
                        null
                        : (<ListItem
                            button key={i.id}
                            className={location.includes(i.url) ? classes.menuItem + ' ' + classes.activeLink : classes.menuItem}
                            onClick={()=> history.push(i.url)}>
                            {i.title}
                        </ListItem>)
                    )
                )}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <IconButton
                color={"inherit"}
                onClick={toggleDrawer(anchor, true)}
            >
                <MenuIcon className={classes.menuIcon}/>
            </IconButton>
            <Drawer
                anchor={"left"}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                {list(anchor)}
            </Drawer>
        </div>
    );
}


export default observer(Menu);
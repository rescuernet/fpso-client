import * as React from 'react';
import {Box, Divider, Drawer, IconButton, List, ListItem, ListItemText} from "@material-ui/core";
import {useHistory, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {makeStyles} from "@material-ui/core/styles";
import {RM} from "../../routes/routes";
import LockIcon from '@material-ui/icons/Lock';
import MenuIcon from '@material-ui/icons/Menu';
import {useEffect} from "react";

const useStyles = makeStyles((theme) => ({
    menuItem: {
        fontSize: 16,
        fontFamily: "Roboto",
        fontWeight: 400,
        color: "#29353d",
        '& span': {
            fontSize: 0,
            padding: 0,
            margin: 0
        },
    },
    activeLink: {
        fontWeight: 700
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
        fontSize: 15
    },
    logoutButtonIcon: {
        marginRight: 10,
        fontSize: 18
    }
}))

const menuItems = []
for (let key in RM) {menuItems.push(RM[key])}


const Menu = (props) => {

    const classes = useStyles()

    const location = useLocation().pathname;
    const history = useHistory()

    const anchor = 'left';
    const [state, setState] = React.useState({left: false});
    const [link, setLink] = React.useState('');

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({...state,[anchor]: open});
    };

    useEffect(() => {
        if(link) {
            const goToLink = setTimeout(() => {
                history.push(link)
            }, 300);
            return () => clearTimeout(goToLink);
        }
    }, [link,history]);

    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {props.isAuth &&
                    <div className={classes.logoutButton}>
                        <ListItem
                            button key={1}
                            className={classes.logoutButtonItem}
                            onClick={props.logout}>
                            <LockIcon className={classes.logoutButtonIcon}/>
                            <span>выход</span>
                        </ListItem>
                        <Divider />
                    </div>
                }
                <ListItem
                    button key={1}
                    className={location === '/' ? classes.menuItem + ' ' + classes.activeLink : classes.menuItem}
                    onClick={()=> setLink('/')}
                >
                    {'Главная'}
                </ListItem>
                {menuItems.map((i) =>
                    !props.isAuth && i.auth
                        ?
                        null
                        : i.menu?.type !== 'main'
                            ? null
                            : (<ListItem
                                button key={i.path}
                                className={location.includes(i.path) ? classes.menuItem + ' ' + classes.activeLink : classes.menuItem}
                                onClick={()=> setLink(i.path)}
                            >
                                {i.menu.title}
                            </ListItem>)
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
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                {list(anchor)}
            </Drawer>
        </div>
    );
}


export default observer(Menu);
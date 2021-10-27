import * as React from 'react';
import {Box, Drawer, IconButton, List, ListItem} from "@material-ui/core";
import {useHistory, useLocation} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {RM} from "../../routes/routes";
import MenuIcon from '@material-ui/icons/Menu';
import {useEffect} from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiButtonBase-root': {
            padding: 10,
        },
    },
    drawerPaper: {
        marginTop: 50,
        '& .MuiList-padding': {
            padding: 10
        }
    },
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
        color: "#ff6200"
    },
    menuIcon: {
        fontSize: 25
    },
    divider: {
        backgroundColor: "#ff6200"
    },
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
        </Box>
    );


    return (
        <div className={classes.root}>
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
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                {list(anchor)}
            </Drawer>
        </div>
    );
}


export default Menu;
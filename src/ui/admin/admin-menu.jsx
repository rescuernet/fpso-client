import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useHistory, useLocation} from "react-router-dom";
import {RM} from "../../routes/routes";
import {Box, Divider, IconButton} from "@material-ui/core";
import AuthStore from '../../bll/auth-store'
import NoAvatar__img from '../../common/assets/image/no_avatar.jpg'
import MenuIcon from "@material-ui/icons/Menu";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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

const AdminMenu = (props) => {
    const location = useLocation().pathname;
    const history = useHistory();
    const width = window.outerWidth > 750 ? true : false
    const [menuOpen,setMenuOpen] = React.useState(true)
    const [menuVariant,setMenuVariant] = useState()
    const [link, setLink] = useState(null);

    useEffect(()=>{
        if(width){
            setMenuOpen(true)
            setMenuVariant('permanent')
        }else{
            setMenuOpen(false)
            setMenuVariant(null)
        }
    },[width])

    const toggleDrawer = (menuOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMenuOpen(menuOpen)
    };

    useEffect(() => {
        if(link) {
            const goToLink = setTimeout(() => {
                history.push(link)
            }, 300);
            return () => clearTimeout(goToLink);
        }
    }, [link,history]);

    const menuItems = []
    for (let key in RM) {menuItems.push(RM[key])}
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {!width &&
                <IconButton
                    color={"inherit"}
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon className={classes.menuIcon}/>
                </IconButton>
            }

            <Drawer
                anchor="left"
                open={menuOpen}
                onClose={toggleDrawer(false)}
                className={classes.drawer}
                variant={menuVariant}
                classes={{paper: classes.drawerPaper,}}
            >
                <Box
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <div className={classes.menuHeader}>
                        <div className={classes.avatar}>{AuthStore.user.avatar ? <img src={AuthStore.user.avatar} alt=""/> : <img src={NoAvatar__img} alt=""/>}</div>
                        <div className={classes.userEmail}>{AuthStore.user.email}</div>
                        <ListItem
                            button key={1}
                            className={classes.menuItem}
                            style={{justifyContent: 'center'}}
                            onClick={()=> setLink('/')}
                        >
                            Перейти на сайт
                        </ListItem>
                    </div>
                    <Divider style={{backgroundColor: '#ccc'}}/>
                    <List>
                        <ListItem
                            button key={2}
                            className={location === RM.Admin.path ? classes.menuItem + ' ' + classes.activeLink : classes.menuItem}
                            onClick={()=> setLink(RM.Admin.path)}
                        >
                            Главная панель
                        </ListItem>
                        {menuItems.map((i) =>
                            i.menu?.type !== 'admin'
                                ? null
                                : (
                                    <ListItem
                                        button key={i.path}
                                        className={location.includes(i.path) ? classes.menuItem + ' ' + classes.activeLink : classes.menuItem}
                                        onClick={()=> setLink(i.path)}
                                    >
                                        {i.menu.title}
                                    </ListItem>
                                )
                        )}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}

export default AdminMenu;


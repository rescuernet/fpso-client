import * as React from 'react';
import {Box, Divider, Drawer, IconButton, List, ListItem, ListItemText} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {ADMIN_ROUTE, COMPETITIONS_ROUTE, MAIN_ROUTE} from "../../const/const";
import {NavLink, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AuthStore from "../../bll/auth-store";
import {makeStyles} from "@material-ui/core/styles";
import {RM} from "../../routes/routes";

const useStyles = makeStyles((theme) => ({
    menuItem: {
        '& a': {
            textDecoration: 'none',
            textTransform: 'uppercase',
        }
    },
    activeLink: {
        '& span': {
            color: '#333',
            fontWeight: 'bold'
        }
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
    }


}))


const Menu = (props) => {

    const classes = useStyles()

    const location = useLocation();

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
        {id: 1, title: 'Главная', url: RM.Main.path,adm:0},
        {id: 2, title: 'Соревнования', url: RM.Competitions.path,adm:0},
        {id: 3, title: 'Admin', url: RM.Admin.path,adm:1},
        {id: 4, title: 'Судейский корпус', url: RM.Main.path,adm:0},
        {id: 5, title: 'Settings', url: RM.Main.path,adm:0},
        {id: 6, title: 'Reference Books', url: RM.Main.path,adm:0},
        {id: 7, title: 'Offers', url: RM.Main.path,adm:0},
        {id: 8, title: 'Offers art', url: RM.Main.path,adm:0},
        {id: 9, title: 'Daily bonus', url: RM.Main.path,adm:0},
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
                    <div>
                        <NavLink
                            to={'/'}
                            onClick={AuthStore.logout}>
                            Logout
                        </NavLink>
                        <Divider />
                    </div>
                }
                {itemsMenu.map((i) => (
                    !props.isAuth && i.adm === 1
                        ?
                        null
                        : (<ListItem button key={i.id} className={classes.menuItem}>
                            <NavLink to={i.url}>
                                <ListItemText className={i.url === location.pathname ? classes.activeLink : ""} primary={i.title} />
                            </NavLink>
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
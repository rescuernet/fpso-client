import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {observer} from "mobx-react-lite";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Aaa from "./aaa";
import Bbb from "./bbb";




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
        top: "auto"
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));



const Admin = () => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:750px)');

    const [link,setLink] = useState()

    console.log(link)

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
                <Divider />
                <List>
                    {['Aaa', 'Bbb', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} onClick={()=> {setLink(text)}} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                {!link
                    ? <div>admin</div>
                    : <link/>
                  }
            </main>
        </div>
    );
}

export default observer(Admin)


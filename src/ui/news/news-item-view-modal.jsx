import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {runInAction, toJS} from "mobx";
import UiStore from "../../bll/ui-store";
import {makeStyles} from "@material-ui/core/styles";
import {NEWS_URL} from "../../const/const";

const useStyles = makeStyles({

});

export const NewsItemViewModal = (props)=> {

    const classes = useStyles();

    const [open, setOpen] = React.useState(props.open);
    const [close, setClose] = React.useState(null);

    useEffect(()=>{
        return ()=> {
            runInAction(()=>{
                UiStore.newsViewModal_open = false
                UiStore.newsViewModal_index = null
            })
        }
    },[close])

    const handleClose = () => {
        setOpen(false)
        setTimeout(()=>{setClose(true)},500)
    };

    const news = toJS(UiStore.news.docs[UiStore.newsViewModal_index])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <div className={classes.avatar}>
                <img src={`${NEWS_URL}/${news._id}/avatar/${news.avatar}`} alt=""/>
            </div>
            <DialogTitle id="alert-dialog-title">{UiStore.newsViewModal_index}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}

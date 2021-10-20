import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";
import AdminStore from "../../../bll/admin-store";

const useStyles = makeStyles((theme) => ({
    dialogPaper: {
        boxShadow: '0px 0px 5px 1px rgb(255 0 0 / 100%)'
    },
}));

export const AlertDialog = (props) => {

    const classes = useStyles();

    const [open, setOpen] = useState(props.open);

    const handleClose = () => {
        AdminStore.news_tmp_errors = null
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            classes={{paper: classes.dialogPaper}}
        >
            <DialogTitle style={{color: '#ff0000'}}>{props.header}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
}

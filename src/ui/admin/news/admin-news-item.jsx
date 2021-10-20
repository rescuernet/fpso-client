import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useHistory} from "react-router-dom";
import {Divider} from "@material-ui/core";
import { format } from "date-fns";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        '@media (max-width: 750px)' : {
            justifyContent: 'center'
        },
        position: "relative"
    },
    item: {
        display: "flex",
    }
}));

const AdminNewsItem = ({news}) => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:750px)');
    const history = useHistory();

    var date = new Date(news.dateCreated);

    var formattedDate = format(date, "dd.mm.yyyy");


    return (
        <>
            <div className={classes.item} id={news._id}>
                <div>{formattedDate}</div>
            </div>
            <Divider/>
        </>

    );
};

export default AdminNewsItem;
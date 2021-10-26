import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import * as dateFns from "date-fns";
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Store from '../../../bll/store';
import {RM} from "../../../routes/routes";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        '@media (max-width: 750px)' : {
            justifyContent: 'center'
        },
        position: "relative"
    },
    min: {
        width: 100,
        textAlign: "center",
        '@media (max-width: 1050px)' : {
            width: 50,
        },
    },
}));

const AdminNewsItem = ({news}) => {

    const classes = useStyles();
    const history = useHistory();

    const newsEdit = (id) => {
        history.push(RM.Admin__News__Edit.getUrl(id))
    }


    return (
        <tr onClick={()=>{newsEdit(news._id)}} id={news._id}>
            {Store.width > 1000 && <td className={classes.min}>{dateFns.format(new Date(news.dateCreated), 'dd.MM.yyyy')}</td>}
            <td className={classes.min}>{news.published ? <VisibilityOutlinedIcon color={"primary"}/> : <VisibilityOffOutlinedIcon color={"secondary"}/>}</td>
            <td>{news.headerFirst}</td>
            {Store.width > 750 &&
                <>
                    <td className={classes.min}>{dateFns.format(new Date(news.dateStart), 'dd.MM.yyyy')}</td>
                    <td className={classes.min}>{news.dateEnd ? dateFns.format(new Date(news.dateEnd), 'dd.MM.yyyy') : <MoreHorizOutlinedIcon color={"primary"}/>}</td>
                    <td className={classes.min}>{news.fixedNews ? <CheckBoxOutlinedIcon color={"secondary"}/> : <CheckBoxOutlineBlankOutlinedIcon color={"primary"}/>}</td>
                    <td className={classes.min}>{news.importantNews ? <CheckBoxOutlinedIcon color={"secondary"}/> : <CheckBoxOutlineBlankOutlinedIcon color={"primary"}/>}</td>
                </>
            }
        </tr>
    );
};

export default AdminNewsItem;
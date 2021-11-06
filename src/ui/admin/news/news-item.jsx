import React, {useEffect} from 'react';
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
import AdminNewsStore from "../../../bll/admin/admin-news-store";
import {runInAction, toJS} from "mobx";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        '@media (max-width: 750px)' : {
            justifyContent: 'center'
        },
        position: "relative"
    },
    table: {
        width: '100%',
        borderCollapse: "collapse",
        fontFamily: 'Roboto',
        color: '#545454',
        '& tr': {
            borderTop: '1px solid #ccc',
            borderBottom: '1px solid #ccc'
        },
        '& tr:hover': {
            transition: '0.3s',
            backgroundColor: '#f2f2f2',
            cursor: 'pointer'
        },
        '& td': {
            padding: '20px 10px',
            [theme.breakpoints.down('xs')]: {
                padding: '10px 5px',
            }
        }
    },
    min: {
        width: 100,
        textAlign: "center",
        padding: '0 5px',
        '@media (max-width: 1050px)' : {
            width: 50,
        },
    },
}));

const NewsItem = () => {

    const classes = useStyles();
    const history = useHistory();

    useEffect(()=>{
        runInAction(()=>{AdminNewsStore.getNews()})
    },[])

    const news = toJS(AdminNewsStore.news)

    const newsEdit = (id) => {
        history.push(RM.Admin__News__Edit.getUrl(id))
    }


    return (
        <table className={classes.table}>
            {Store.width > 750 && AdminNewsStore.news.length > 0 &&
            <>
                {Store.width > 1000 &&
                <th className={classes.min}>создана</th>
                }

                <th></th>
                <th>заголовок</th>
                <th className={classes.min}>старт</th>
                <th className={classes.min}>финиш</th>
                <th className={classes.min}>закреплена</th>
                <th className={classes.min}>важная</th>
            </>
            }
            {news.length > 0 && news.map((i) => (
                <tr onClick={()=>{newsEdit(i._id)}} id={i._id}>
                    {Store.width > 1000 && <td className={classes.min}>{dateFns.format(new Date(i.dateCreated), 'dd.MM.yyyy')}</td>}
                    <td className={classes.min}>{i.published ? <VisibilityOutlinedIcon color={"primary"}/> : <VisibilityOffOutlinedIcon color={"secondary"}/>}</td>
                    <td>{i.headerFirst}</td>
                    {Store.width > 750 &&
                    <>
                        <td className={classes.min}>{dateFns.format(new Date(i.dateStart), 'dd.MM.yyyy')}</td>
                        <td className={classes.min}>{i.dateEnd ? dateFns.format(new Date(i.dateEnd), 'dd.MM.yyyy') : <MoreHorizOutlinedIcon color={"primary"}/>}</td>
                        <td className={classes.min}>{i.fixedNews ? <CheckBoxOutlinedIcon color={"secondary"}/> : <CheckBoxOutlineBlankOutlinedIcon color={"primary"}/>}</td>
                        <td className={classes.min}>{i.importantNews ? <CheckBoxOutlinedIcon color={"secondary"}/> : <CheckBoxOutlineBlankOutlinedIcon color={"primary"}/>}</td>
                    </>
                    }
                </tr>
            ))}
        </table>
    );
};

export default NewsItem;
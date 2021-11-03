import React from 'react';
import {observer} from "mobx-react-lite";
import AdminMenu from "../admin-menu";
import {makeStyles} from "@material-ui/core/styles";
import {RM} from "../../../routes/routes";
import {Button, Divider, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import Store from '../../../bll/store';
import AdminHeader from "../header/admin-header";



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        '@media (max-width: 1050px)' : {
            justifyContent: 'center'
        },
        position: "relative"
    },
    wrapper: {
        flexGrow: 1,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: 20
    },
    content: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 1200,
        padding: '20px 10px',
        '@media (max-width: 1050px)' : {
            marginTop: 55,
        },
        '@media (max-width: 600px)' : {
            marginTop: 45,
        },
    },
    control: {
        marginBottom: 20,
    },
    competitionsList: {
        margin: '20px 0'
    },
}));

const AdminCompetitions = (props) => {
    window.scrollTo(0,0)
    const classes = useStyles();
    const history = useHistory();

    const createCompetitions = () => {
        history.push(RM.Admin__Competitions__Create.path);
    }


    return (
        <div className={classes.root}>
            {Store.width > 1050 ? <AdminMenu open={true} variant={'permanent'} menuIconView={false}/> : <AdminHeader header={'Соревнования'}/>}
            <div className={classes.wrapper}>
                {Store.width > 1050 && <div className={classes.header}><Typography variant={'h5'}>Соревнования</Typography></div>}
                <Divider/>
                <div className={classes.content}>
                    <div className={classes.control}>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={() => {createCompetitions()}}
                        >
                            Создать соревнование
                        </Button>
                    </div>
                    <div className={classes.competitionsList}>

                        {/*<NewsItem />*/}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(AdminCompetitions);
import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {observer} from "mobx-react-lite";
import {runInAction, toJS} from "mobx";
import AdminReferenceBooksStore from "../../../../../bll/admin/admin-reference-books-store";
import {useHistory, useParams} from "react-router-dom";
import AdminPageWrapper from "../../../admin-page-wrapper";
import PeopleAvatar from "./people-edit-avatar";
import Store from "../../../../../bll/store";
import PeopleEditField from "./people-edit-field";

const useStyles = makeStyles((theme) => ({
    people: {
        width: 600,
        '@media (max-width: 750px)' : {
            width: 340,
        },
        '@media (max-width: 1280px)' : {
            margin: '20px auto'
        },
    },
}))

const PeopleEdit = (props) => {
    const classes = useStyles();

    const history = useHistory();
    const { id } = useParams();

    useEffect(()=>{
        runInAction(async () => {
            await Store.sendMediaDelTmp()
            AdminReferenceBooksStore.clearData()
            await AdminReferenceBooksStore.peopleId(id)
        })
        return ()=> {
            runInAction(async () => {
                await Store.sendMediaDelTmp()
                AdminReferenceBooksStore.clearData()})
        }
    },[id])

    const people = AdminReferenceBooksStore.referenceBooks.people.one
    console.log('people',toJS(people))

    return (
        <AdminPageWrapper title={'Люди. Новый'}>
            {AdminReferenceBooksStore.referenceBooks.people.one && (
                <div className={classes.people}>
                    <PeopleAvatar/>
                    <PeopleEditField people={people}/>
                </div>
            )}
        </AdminPageWrapper>
    );
};

export default observer(PeopleEdit);
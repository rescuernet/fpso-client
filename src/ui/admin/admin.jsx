import React from 'react';
import AuthStore from "../../bll/auth-store";
import {Redirect} from "react-router-dom";
import {MAIN_ROUTE} from "../../const/const";
import {observer} from "mobx-react-lite";


const Admin = (props) => {
    if(!AuthStore.isAuth){return <Redirect to={MAIN_ROUTE}/>}
    return (
        <div>Admin Page!</div>
    );
};

export default observer(Admin);
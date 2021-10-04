import {Redirect, Route} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import AuthStore from "../bll/auth-store"
import React from "react";



const PrivateRoute = ({component, ...rest}) => {

    const isAuth = AuthStore.isAuth
    const Component = component

    console.log('isAuth PrivateRoute',isAuth)

    return (
        <Route {...rest} render = {props =>
            isAuth ?
                <Component {...props}/> :
                <Redirect to={'/'} />
        } />
    );
};

export default observer(PrivateRoute);

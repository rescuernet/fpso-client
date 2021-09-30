import React from 'react';
import {observer} from "mobx-react-lite";
import AuthStore from "../../bll/auth-store";

const Main = (props) => {
    const isAuth = AuthStore.isAuth
    return (
        <div>{`main ${isAuth}`}</div>
    );
};

export default observer(Main);
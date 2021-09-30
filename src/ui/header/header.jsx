import React from 'react';
import {AppBar, Toolbar} from "@material-ui/core";
import Menu from "../menu/menu";
import s from "./header.module.css"
import {observer} from "mobx-react-lite";
import AuthStore from "../../bll/auth-store";


const Header = (props) => {

    const isAuth = AuthStore.isAuth

    return (
        <AppBar position="static" className={s.headerWrap}>
            <Toolbar className={s.header}>
                <Menu
                    isAuth={isAuth} logout={AuthStore.logout}/>
                <div className={s.box_1}>
                    <div className={s.brand}><span>Федерация плавания</span> <span>Самарской области</span></div>
                    <div className={s.contact_info}>
                        <span>Самара, Волжский проспект, 10</span>
                        <span>8 (846) 375-92-45</span>
                        <span>swimclub@mail.ru</span>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default observer(Header);




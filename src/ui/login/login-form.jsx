import React, {useState} from 'react';
import {Button} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import AuthStore from "../../bll/auth-store";
import {Redirect} from "react-router-dom";
import {ADMIN_ROUTE} from "../../const/const";

const LoginForm = () => {

    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');

    if(AuthStore.isAuth){return <Redirect to={ADMIN_ROUTE}/>}

    return (
        <>
            {!AuthStore.isLoading &&
            <div>
                <input type="text"
                       onChange={e => setEmail(e.target.value)}
                       value={email}
                       placeholder={'email'}
                       autoComplete='no'
                />
                <input type="password"
                       onChange={e => setPassword(e.target.value)}
                       value={password}
                       placeholder={'password'}
                />
                <div>
                    <Button variant="outlined" size="small" onClick={() => AuthStore.login(email,password)}>Логин</Button>
                    <Button variant="outlined" size="small" onClick={() => AuthStore.registration(email,password)}>Регистрация</Button>
                </div>
            </div>
            }
        </>
    );
};

export default observer(LoginForm);
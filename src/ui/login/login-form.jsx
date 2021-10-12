import React, {useState} from 'react';
import {Box, Button, TextField} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import AuthStore from "../../bll/auth-store";
import {Redirect} from "react-router-dom";
import s from "./login-form.module.css";
import {runInAction} from "mobx";
import {RM} from "../../routes/routes";

const LoginForm = () => {

    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');

    if(AuthStore.isAuth){return <Redirect to={RM.Admin.path}/>}
    const authError = AuthStore?.authError?.data?.message

    const clearAuthError = () => {
        if(authError){
            runInAction(() => {AuthStore.authError = {}})
        }
    }

    const onKeyDown = (event) => {
        if(event.key === 'Enter'){
            AuthStore.login(email,password)
        }
    }


    return (
        <div className={s.wrap}>
            <div className={s.form}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        className={s.text_field}
                        id="login"
                        label="логин"
                        variant="outlined"
                        autoComplete='off'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        error={!!authError}
                        onFocus={()=>{clearAuthError()}}
                    />
                    <TextField
                        className={s.text_field}
                        id="outlined-basic"
                        label="password"
                        variant="outlined"
                        type="password"
                        autoComplete='new-password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        error={!!authError}
                        onFocus={()=>{clearAuthError()}}
                        onKeyDown={onKeyDown}
                    />
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => AuthStore.login(email,password)}
                >
                    Войти
                </Button>
                {authError &&
                <div className={s.auth_error}>{authError}</div>
                }
            </div>
        </div>
    );
};

export default observer(LoginForm);
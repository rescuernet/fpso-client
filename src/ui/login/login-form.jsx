import React, {useState} from 'react';
import {Box, Button, Container, TextField} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import AuthStore from "../../bll/auth-store";
import {Redirect} from "react-router-dom";
import {runInAction} from "mobx";
import {RM} from "../../routes/routes";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexGrow: 1
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 340,
        margin: '0 auto',

    },
    textField: {
        marginBottom: 20
    },
    authError: {
        margin: '20px 0',
        color: '#999',
        fontFamily: 'Roboto'
    }
}))

const LoginForm = () => {
    const classes = useStyles()

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
        <Container className={classes.root}>
            <Box className={classes.container}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        className={classes.textField}
                        id="login"
                        label="логин"
                        variant="outlined"
                        autoComplete='off'
                        value={email}
                        fullWidth={true}
                        onChange={(e)=>setEmail(e.target.value)}
                        error={!!authError}
                        onFocus={()=>{clearAuthError()}}
                    />
                    <TextField
                        className={classes.textField}
                        id="outlined-basic"
                        label="password"
                        variant="outlined"
                        type="password"
                        autoComplete='new-password'
                        value={password}
                        fullWidth={true}
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
                <div className={classes.authError}>{authError}</div>
                }
            </Box>
        </Container>
    );
};

export default observer(LoginForm);
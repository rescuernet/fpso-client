import React, {useEffect, useState} from "react";
import Header from "./ui/header/header";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AuthStore from "./bll/auth-store";
import Store from "./bll/store";
import {runInAction} from "mobx";
import {RM} from "./routes/routes"
import {useGridPoint} from "./utils/breakpoints";
import {ThemeProvider } from "@material-ui/core/styles";
import {Backdrop, CircularProgress } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#ff6200',
    }
}))


const Routes = []
for (let key in RM) {Routes.push(RM[key])}

window.addEventListener("resize", (event) => {
    runInAction(() => {Store.width = window.outerWidth})

})

const App = () => {

    const classes = useStyles();
    const location = useLocation().pathname;

    useEffect(() => {
        if(localStorage.getItem('token')){
            runInAction(()=>{AuthStore.authMe()})
        }else{
            runInAction(() => {Store.isInit = true})
        }
    }, []);


    const [backdrop,setBackdrop] = useState(false);


    const isLoading = Store.isLoading
    const isInit = Store.isInit
    const isAuth = AuthStore.isAuth

    useEffect(() => {
        if(isLoading){
            setBackdrop(true)
        }else{
            const backdropTimeOut = setTimeout(() => {
                setBackdrop(false)
            }, 500);
            return () => clearTimeout(backdropTimeOut);
        }
    }, [isLoading]);

    return (
        <ThemeProvider theme={useGridPoint}>
            <div className="App">
                <Backdrop className={classes.backdrop} open={backdrop}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                {Routes.map(({path, header}) => (path === location && header.view) && <Header title={header.title}/>)}
                {isInit &&
                <Switch>
                    {Routes.map(({path,Component,auth}) => (auth === isAuth || !auth) && <Route key={path} exact path={path} component={Component}/>)}
                    <Redirect to={'/'}/>
                </Switch>
                }
            </div>
        </ThemeProvider>

    );
}

export default observer(App);

import React, {useEffect} from "react";
import Header from "./ui/header/header";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AuthStore from "./bll/auth-store";
import {runInAction} from "mobx";
import {RM} from "./routes/routes"
import {useGridPoint} from "./utils/breakpoints";
import {ThemeProvider } from "@material-ui/core/styles";


const Routes = []
for (let key in RM) {Routes.push(RM[key])}

const App = () => {

    const location = useLocation().pathname;

    useEffect(() => {
        if(localStorage.getItem('token')){
            AuthStore.authMe();
        }else{
            runInAction(() => {AuthStore.isInit = true})
        }
    }, []);

    const isLoading = AuthStore.isLoading
    const isInit = AuthStore.isInit
    const isAuth = AuthStore.isAuth


    return (
        <ThemeProvider theme={useGridPoint}>
            <div className="App">
                <div className={`isLoading ${isLoading ? 'isLoadingView' : ""}`}/>
                {Routes.map(({path, header}) => (path === location && header) && <Header/>)}
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

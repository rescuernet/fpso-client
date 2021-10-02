import React, {useEffect} from "react";
import Header from "./ui/header/header";
import {AR, PR} from "./routes/routes";
import {Redirect, Route, Switch} from "react-router-dom";
import {ADMIN_ROUTE, MAIN_ROUTE} from "./const/const";
import {observer} from "mobx-react-lite";
import AuthStore from "./bll/auth-store";
import {runInAction} from "mobx";
import {makeStyles} from "@material-ui/core/styles";
import {Container} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            width: 340
        },
    }
}))

/*import {useLocation} from "react-router-dom";*/

const App = () => {
    const classes = useStyles()
    //проверка нужно ли отображать HEADER на странице
    /*const location = useLocation().pathname;
    const arr = [
        ADMIN_ROUTE
    ];*/

    useEffect(() => {
        if(localStorage.getItem('token')){
            AuthStore.authMe();
        }else{
            runInAction(() => {AuthStore.isInit = true})
        }
    }, []);

    const isAuth = AuthStore.isAuth
    const isLoading = AuthStore.isLoading
    const isInit = AuthStore.isInit


    return (
        <div className="App">
            <div className={`isLoading ${isLoading ? 'isLoadingView' : ""}`}/>
            {/*включить при проверке на отображение HEADER на странице*/}
            {/*{ !arr.includes(location) && <Header/> }*/}
            <Header/>
            <Container fixed className={classes.root}>
                {isInit &&
                <Switch>
                    {isAuth && AR.map(({path,Component}) =>
                        <Route key={path} path={path} component={Component}/>
                    )}
                    {PR.map(({path,Component}) =>
                        <Route key={path} exact path={path} component={Component}/>
                    )}
                    <Redirect to={MAIN_ROUTE}/>
                </Switch>
                }
            </Container>
        </div>
    );
}

export default observer(App);

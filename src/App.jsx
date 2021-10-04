import React, {useEffect} from "react";
import Header from "./ui/header/header";
import {Redirect, Route, Switch} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AuthStore from "./bll/auth-store";
import {runInAction} from "mobx";
import {makeStyles} from "@material-ui/core/styles";
import {Container} from "@material-ui/core";
import {RM} from "./routes/routes"




const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            width: 340
        },
    }
}))

const Routes = []
for (let key in RM) {Routes.push(RM[key])}

console.log('Routes',Routes)

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

    const isLoading = AuthStore.isLoading
    const isInit = AuthStore.isInit
    const isAuth = AuthStore.isAuth


    return (
        <div className="App">
            <div className={`isLoading ${isLoading ? 'isLoadingView' : ""}`}/>
            {/*включить при проверке на отображение HEADER на странице*/}
            {/*{ !arr.includes(location) && <Header/> }*/}
            <Header/>
            <Container fixed className={classes.root}>
                {isInit &&
                    <Switch>
                        {
                            isAuth &&
                            Routes.map(({path,Component}) =>
                                <Route key={path} path={path} component={Component}/>
                            )
                        }
                        {Routes.map(({path,Component}) =>
                            <Route key={path} path={path} component={Component}/>
                        )}
                        {/*<Redirect to={'/'}/>*/}
                    </Switch>
                }
            </Container>
        </div>
    );
}

export default observer(App);

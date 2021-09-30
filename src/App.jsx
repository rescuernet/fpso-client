import Header from "./ui/header/header";
import {AR, PR} from "./routes/routes";
import {Redirect, Route, Switch} from "react-router-dom";
import {ADMIN_ROUTE, MAIN_ROUTE} from "./const/const";
import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import AuthStore from "./bll/auth-store";

/*import {useLocation} from "react-router-dom";*/

const App = () => {
    //проверка нужно ли отображать HEADER на странице
    /*const location = useLocation().pathname;
    const arr = [
        ADMIN_ROUTE
    ];*/

    const isAuth = AuthStore.isAuth
    const isLoading = AuthStore.isLoading

    useEffect(() => {
        if(localStorage.getItem('token')){
            AuthStore.authMe()
        }
    }, [])

    return (
        <div className="App">
            <div className={`isLoading ${isLoading ? 'isLoadingView' : ""}`}></div>
            {/*включить при проверке на отображение HEADER на странице*/}
            {/*{ !arr.includes(location) && <Header/> }*/}
            <Header/>
            <div className={"wrapper"}>
                {!isLoading &&
                <Switch>
                    {isAuth && AR.map(({path,Component}) =>
                        <Route key={path} path={path} component={Component}/>
                    )}
                    {PR.map(({path,Component}) =>
                        <Route key={path} exact path={path} component={Component}/>
                    )}
                    {/*<Redirect to={MAIN_ROUTE}/>*/}
                </Switch>
                }
            </div>
        </div>
    );
}

export default observer(App);

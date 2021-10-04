import Main from "../ui/main/main";
import Admin from "../ui/admin/admin";
import Competitions from "../ui/competitions/competitions";
import LoginForm from "../ui/login/login-form";


const RouterManager = {
    Main: {
        path:'/',
        Component: Main,
        getUrl() {
            return `/`
        },
        exacts: true,
        auth: false
    },
    Competitions: {
        path:'/competitions',
        Component: Competitions,
        getUrl() {
            return `/competitions`
        },
        exacts: true,
        auth: false
    },
    Login: {
        path:'/555/',
        Component: LoginForm,
        getUrl() {
            return `/555/`
        },
        exacts: true,
        auth: false
    },
    Admin: {
        path:'/777/admin',
        Component: Admin,
        getUrl() {
            return `/777/admin`
        },
        exacts: true,
        auth: true
    },
}

export const RM = RouterManager;

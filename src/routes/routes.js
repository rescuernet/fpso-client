
import Admin from "../ui/admin/admin";
import Competitions from "../ui/competitions/competitions";
import LoginForm from "../ui/login/login-form";
import Main from "../ui/main/main";

export const MenuTypes = {
    admin:'admin',
    main: 'main'
}


const RouterManager = {
    Main: {
        path:'/',
        Component: Main,
        getUrl() {return `/`},
        auth: false,
    },
    Competitions: {
        path:'/competitions',
        Component: Competitions,
        getUrl() {return `/competitions`},
        auth: false,
        menu: {
            type: MenuTypes.main,
            title: 'Соревнования'
        }
    },
    Login: {
        path:'/555/',
        Component: LoginForm,
        getUrl() {return `/555/`},
        auth: false
    },
    Admin: {
        path:'/777/admin',
        Component: Admin,
        getUrl() {return `/777/admin/`},
        auth: true,
        menu: {
            type: MenuTypes.main,
            title: 'Панель управления'
        }
    },
}

export const RM = RouterManager;

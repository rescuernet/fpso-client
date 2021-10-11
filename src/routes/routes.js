import Admin from "../ui/admin/admin";
import Competitions from "../ui/competitions/competitions";
import LoginForm from "../ui/login/login-form";
import Main from "../ui/main/main";
import AdminNews from "../ui/admin/admin-news";
import AdminCompetitions from "../ui/admin/admin-competitions";

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
        header: true
    },
    Competitions: {
        path:'/competitions',
        Component: Competitions,
        getUrl() {return `/competitions`},
        auth: false,
        header: true,
        menu: {
            type: MenuTypes.main,
            title: 'Соревнования'
        }
    },
    Login: {
        path:'/555',
        Component: LoginForm,
        getUrl() {return `/555`},
        auth: false,
        header: true
    },
    Admin: {
        path:'/777/admin',
        Component: Admin,
        getUrl() {return `/777/admin`},
        auth: true,
        header: false,
        menu: {
            type: MenuTypes.main,
            title: 'Панель управления'
        }
    },
    AdminNews: {
        path:'/777/admin/news',
        Component: AdminNews,
        getUrl() {return `/777/admin/news`},
        auth: true,
        header: false,
        menu: {
            type: MenuTypes.admin,
            title: 'Новости'
        }
    },
    AdminCompetitions: {
        path:'/777/admin/competitions',
        Component: AdminCompetitions,
        getUrl() {return `/777/admin/competitions`},
        auth: true,
        header: false,
        menu: {
            type: MenuTypes.admin,
            title: 'Соревнования'
        }
    },
}

export const RM = RouterManager;

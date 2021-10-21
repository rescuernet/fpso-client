import Admin from "../ui/admin/admin";
import Competitions from "../ui/competitions/competitions";
import LoginForm from "../ui/login/login-form";
import Main from "../ui/main/main";
import AdminNews from "../ui/admin/news/admin-news";
import AdminCompetitions from "../ui/admin/competitions/admin-competitions";
import AdminNewsCreate from "../ui/admin/news/admin-news-create-edit";
import News from "../ui/news/news";


export const MenuTypes = {
    admin:'admin',
    main: 'main'
}

const PrefixPath = {
    admin: '/5070/admin',
    login: '/5070/login'
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
    News: {
        path:'/news',
        Component: News,
        getUrl() {return `/news`},
        auth: false,
        header: true,
        menu: {
            type: MenuTypes.main,
            title: 'Новости'
        }
    },
    Login: {
        path: PrefixPath.login,
        Component: LoginForm,
        getUrl() {return PrefixPath.login},
        auth: false,
        header: true
    },
    Admin: {
        path: PrefixPath.admin,
        Component: Admin,
        getUrl() {return PrefixPath.admin},
        auth: true,
        header: false,
        menu: {
            type: MenuTypes.main,
            title: 'Панель управления'
        }
    },
    Admin__News: {
        path: `${PrefixPath.admin}/news`,
        Component: AdminNews,
        getUrl() {return `${PrefixPath.admin}/news`},
        auth: true,
        header: false,
        menu: {
            type: MenuTypes.admin,
            title: 'Новости'
        }
    },
    Admin__News__Create: {
        path: `${PrefixPath.admin}/news/create`,
        Component: AdminNewsCreate,
        getUrl() {return `${PrefixPath.admin}/news/create`},
        auth: true,
        header: false,
    },
    Admin__News__Edit: {
        path: `${PrefixPath.admin}/news/edit/:id`,
        Component: AdminNewsCreate,
        getUrl(id) {return `${PrefixPath.admin}/news/edit/${id}`},
        auth: true,
        header: false,
    },
    Admin__News__Avatar__Create: {
        path: `${PrefixPath.admin}/news/avatar-create`,
        getUrl() {return `${PrefixPath.admin}/news/avatar-create`},
    },
    Admin__News__Image__Create: {
        path: `${PrefixPath.admin}/news/image-create`,
        getUrl() {return `${PrefixPath.admin}/news/image-create`},
    },
    Admin__Competitions: {
        path:`${PrefixPath.admin}/competitions`,
        Component: AdminCompetitions,
        getUrl() {return `${PrefixPath.admin}/competitions`},
        auth: true,
        header: false,
        menu: {
            type: MenuTypes.admin,
            title: 'Соревнования'
        }
    },
}

export const RM = RouterManager;

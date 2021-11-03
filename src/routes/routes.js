import Admin from "../ui/admin/admin";
import Competitions from "../ui/competitions/competitions";
import LoginForm from "../ui/login/login-form";
import Main from "../ui/main/main";
import AdminNews from "../ui/admin/news/news";
import AdminCompetitions from "../ui/admin/competitions/admin-competitions";
import AdminNewsCreate from "../ui/admin/news/create-edit/create-edit";
import News from "../ui/news/news";
import NewsItemView from "../ui/news/news-view/news-item-view";
import AdminCompetitionsCreateEdit from "../ui/admin/competitions/admin-competitions-create-edit";


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
        header: {
            view: true,
            title: 'Главная'
        }
    },
    Competitions: {
        path:'/competitions',
        Component: Competitions,
        getUrl() {return `/competitions`},
        auth: false,
        header: {
            view: true,
            title: 'Соревнования'
        },
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
        header: {
            view: true,
            title: 'Новости'
        },
        menu: {
            type: MenuTypes.main,
            title: 'Новости'
        }
    },
    NewsViewId: {
        path:'/news/:id',
        Component: NewsItemView,
        getUrl(id) {return `/news/${id}`},
        auth: false,
        header: {
            view: true,
            title: 'Новости'
        }
    },
    Login: {
        path: PrefixPath.login,
        Component: LoginForm,
        getUrl() {return PrefixPath.login},
        auth: false,
        header: {
            view: true,
            title: 'Авторизация'
        }
    },
    Admin: {
        path: PrefixPath.admin,
        Component: Admin,
        getUrl() {return PrefixPath.admin},
        auth: true,
        header: {
            view: false
        },
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
        header: {
            view: false
        },
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
        header: {
            view: false
        },
    },
    Admin__News__Edit: {
        path: `${PrefixPath.admin}/news/edit/:id`,
        Component: AdminNewsCreate,
        getUrl(id) {return `${PrefixPath.admin}/news/edit/${id}`},
        auth: true,
        header: {
            view: false
        },
    },
    Admin__News__Update: {
        path: `${PrefixPath.admin}/news/update`,
        Component: AdminNewsCreate,
        getUrl() {return `${PrefixPath.admin}/news/update`},
        auth: true,
        header: {
            view: false
        },
    },
    Admin__News__Avatar__Create: {
        path: `${PrefixPath.admin}/news/avatar-create`,
        getUrl() {return `${PrefixPath.admin}/news/avatar-create`},
    },
    Admin__News__Image__Create: {
        path: `${PrefixPath.admin}/news/image-create`,
        getUrl() {return `${PrefixPath.admin}/news/image-create`},
    },
    Admin__News__Docs__Create: {
        path: `${PrefixPath.admin}/news/docs-create`,
        getUrl() {return `${PrefixPath.admin}/news/docs-create`},
    },
    Admin__News__Delete: {
        path: `${PrefixPath.admin}/news/delete`,
        Component: AdminNewsCreate,
        getUrl() {return `${PrefixPath.admin}/news/delete`},
        auth: true,
        header: {
            view: false
        },
    },
    Admin__Competitions: {
        path:`${PrefixPath.admin}/competitions`,
        Component: AdminCompetitions,
        getUrl() {return `${PrefixPath.admin}/competitions`},
        auth: true,
        header: {
            view: false
        },
        menu: {
            type: MenuTypes.admin,
            title: 'Соревнования'
        }
    },
    Admin__Competitions__Create: {
        path: `${PrefixPath.admin}/competitions/create`,
        Component: AdminCompetitionsCreateEdit,
        getUrl() {return `${PrefixPath.admin}/competitions/create`},
        auth: true,
        header: {
            view: false
        },
    },
}

export const RM = RouterManager;

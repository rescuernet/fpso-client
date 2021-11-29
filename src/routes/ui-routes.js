import Competitions from "../ui/client/competitions/competitions";
import LoginForm from "../ui/client/login/login-form";
import Main from "../ui/client/main/main";
import News from "../ui/client/news/news";
import NewsItemView from "../ui/client/news/news-view";


export const MenuTypes = {
    main: 'main'
}

const PrefixPath = {
    login: '/5070/login'
}

const UIRouterManager = {
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
    NewsPage: {
        path:'/news/:page',
        Component: News,
        getUrl(page) {return `/news/${page}`},
        auth: false,
        header: {
            view: true,
            title: 'Новости'
        },
    },
    News__Id: {
        path:'/news/view/:id',
        Component: NewsItemView,
        getUrl(id) {return `/news/view/${id}`},
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
    }
}

export const UI_RM = UIRouterManager;

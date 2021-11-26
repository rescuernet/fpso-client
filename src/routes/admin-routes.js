import Admin from "../ui/admin/main/admin";
import AdminNews from "../ui/admin/news/news";
import AdminNewsEdit from "../ui/admin/news/news-create-edit/news-create-edit";
import AdminCompetitions from "../ui/admin/competitions/competitions";
import AdminCompetitionsEdit from "../ui/admin/competitions/competitions-edit/competitions-edit";
import AdminReferenceBooks from "../ui/admin/reference-books/reference-books";
import AdminReferenceBooksPool from "../ui/admin/reference-books/reference-books-pool";


export const MenuTypes = {
    admin:'admin',
}

const PrefixPath = {
    admin: '/5070/admin',
}


const AdminRouterManager = {
    Main: {
        path: PrefixPath.admin,
        Component: Admin,
        getUrl() {return PrefixPath.admin},
        auth: true,
        header: {
            view: false
        },
    },
    News: {
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
    News__Edit: {
        path: `${PrefixPath.admin}/news/:id`,
        Component: AdminNewsEdit,
        getUrl(id) {return `${PrefixPath.admin}/news/${id}`},
        auth: true,
        header: {
            view: false
        },
    },
    Competitions: {
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
    Competitions__Edit: {
        path: `${PrefixPath.admin}/competitions/:id`,
        Component: AdminCompetitionsEdit,
        getUrl(id) {return `${PrefixPath.admin}/competitions/${id}`},
        auth: true,
        header: {
            view: false
        },
    },
    Reference__Books: {
        path:`${PrefixPath.admin}/reference-books`,
        Component: AdminReferenceBooks,
        getUrl() {return `${PrefixPath.admin}/reference-books`},
        auth: true,
        header: {
            view: false
        },
        menu: {
            type: MenuTypes.admin,
            title: 'Справочники'
        }
    },
    Reference__Books__Pool: {
        path:`${PrefixPath.admin}/reference-books/pool`,
        Component: AdminReferenceBooksPool,
        getUrl() {return `${PrefixPath.admin}/reference-books/pool`},
        auth: true,
        header: {
            view: false
        }
    },
}

export const ADM_RM = AdminRouterManager;

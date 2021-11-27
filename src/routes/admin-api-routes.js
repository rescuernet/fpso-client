export const MenuTypes = {
    admin:'admin',
}

const PrefixPath = {
    admin: '/5070/admin',
}


const AdminAPIRouterManager = {
    News__Create: {
        path: `${PrefixPath.admin}/news/create`,
        getUrl() {return `${PrefixPath.admin}/news/create`},
    },
    News__Update: {
        path: `${PrefixPath.admin}/news/update`,
        getUrl() {return `${PrefixPath.admin}/news/update`},
    },
    News__Avatar__Create: {
        path: `${PrefixPath.admin}/news/avatar-create`,
        getUrl() {return `${PrefixPath.admin}/news/avatar-create`},
    },
    News__Image__Create: {
        path: `${PrefixPath.admin}/news/image-create`,
        getUrl() {return `${PrefixPath.admin}/news/image-create`},
    },
    News__Docs__Create: {
        path: `${PrefixPath.admin}/news/docs-create`,
        getUrl() {return `${PrefixPath.admin}/news/docs-create`},
    },
    News__Delete: {
        path: `${PrefixPath.admin}/news/delete`,
        getUrl() {return `${PrefixPath.admin}/news/delete`},
    },
    Competitions__Create: {
        path: `${PrefixPath.admin}/competitions/create`,
        getUrl() {return `${PrefixPath.admin}/competitions/create`},
    },
    Competitions__Update: {
        path: `${PrefixPath.admin}/competitions/update`,
        getUrl() {return `${PrefixPath.admin}/competitions/update`},
    },
    Competitions__Avatar__Create: {
        path: `${PrefixPath.admin}/competitions/avatar-create`,
        getUrl() {return `${PrefixPath.admin}/competitions/avatar-create`},
    },
    Competitions__Docs__Create: {
        path: `${PrefixPath.admin}/competitions/docs-create`,
        getUrl() {return `${PrefixPath.admin}/competitions/docs-create`},
    },
    Competitions__Image__Create: {
        path: `${PrefixPath.admin}/competitions/image-create`,
        getUrl() {return `${PrefixPath.admin}/competitions/image-create`},
    },
    Reference__Books__update: {
        path:`${PrefixPath.admin}/reference-books/update`,
        getUrl() {return `${PrefixPath.admin}/reference-books/update`},
    },
}

export const ADM_API_RM = AdminAPIRouterManager;

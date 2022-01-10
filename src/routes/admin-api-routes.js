export const MenuTypes = {
    admin:'admin',
}

const PrefixPath = {
    admin: '/5070/admin',
}


const AdminAPIRouterManager = {
    mediaDelTmp: {
        path: `${PrefixPath.admin}/mediadeltmp`,
        getUrl() {return `${PrefixPath.admin}/mediadeltmp`},
    },
    mediaDelTmpBlocking: {
        path: `${PrefixPath.admin}/mediadeltmpblocking`,
        getUrl() {return `${PrefixPath.admin}/mediadeltmpblocking`},
    },
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
    Competitions__Delete: {
        path: `${PrefixPath.admin}/competitions/delete`,
        getUrl() {return `${PrefixPath.admin}/competitions/delete`},
    },
    Reference__Books__Pools_Get: {
        path:`${PrefixPath.admin}/reference-books/pools/get`,
        getUrl() {return `${PrefixPath.admin}/reference-books/pools/get`},
    },
    Reference__Books__Pools_Create: {
        path:`${PrefixPath.admin}/reference-books/pools/create`,
        getUrl() {return `${PrefixPath.admin}/reference-books/pools/create`},
    },
    Reference__Books__Pools_Save: {
        path:`${PrefixPath.admin}/reference-books/pools/save`,
        getUrl() {return `${PrefixPath.admin}/reference-books/pools/save`},
    },
}

export const ADM_API_RM = AdminAPIRouterManager;

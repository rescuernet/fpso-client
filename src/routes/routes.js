import {ADMIN_ROUTE, COMPETITIONS_ROUTE, LOGIN_ROUTE, MAIN_ROUTE} from "../const/const";
import Main from "../ui/main/main";
import Admin from "../ui/admin/admin";
import Competitions from "../ui/competitions/competitions";
import LoginForm from "../ui/login/login-form";

const authRoutes = [
    {path: ADMIN_ROUTE, Component: Admin}
]

const publicRoutes = [
    {path: MAIN_ROUTE, Component: Main},
    {path: LOGIN_ROUTE, Component: LoginForm},
    {path: COMPETITIONS_ROUTE, Component: Competitions},
]

export const AR = authRoutes;
export const PR = publicRoutes;

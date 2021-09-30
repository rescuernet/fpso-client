import {makeAutoObservable} from "mobx";
import AuthService from "../services/auth-service";
import axios from "axios";
import {API_URL} from "../const/const";



class AuthStore {
    user = {}
    isAuth = false
    isLoading = false
    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }



    async login(email,password) {
        this.setLoading(true);
        try {
            const response = await AuthService.login(email,password);
            localStorage.setItem('token',response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async registration(email,password) {
        try {
            const response = await AuthService.registration(email,password);
            localStorage.setItem('token',response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async authMe() {
        this.isLoading = true;
        try {
            const response = await axios.get(`${API_URL}/refresh`,{withCredentials:true});
            localStorage.setItem('token',response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.isLoading = false;
        }
    }
}

export default new AuthStore();
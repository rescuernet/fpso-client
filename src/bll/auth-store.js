import {makeAutoObservable, runInAction} from "mobx";
import AuthService from "../services/auth-service";
import axios from "axios";
import {API_URL} from "../const/const";



class AuthStore {
    user = {}
    isAuth = false
    isLoading = false
    isInit = false
    authError = {}

    constructor() {
        makeAutoObservable(this);
    }

    login = async (email,password) => {
        runInAction(() => {this.authError = {}})
        runInAction(() => {this.isLoading = true})
        try {
            const response = await AuthService.login(email,password);
            localStorage.setItem('token',response.data.accessToken);
            runInAction(() => {this.user = response.data.user})
            runInAction(() => {this.isAuth = true})
        } catch (e) {
            runInAction(() => {this.authError = e.response})
        } finally {
            runInAction(() => {this.isInit = true})
            runInAction(() => {this.isLoading = false})
        }
    }

    registration = async (email,password) => {
        runInAction(() => {this.isInit = false})
        runInAction(() => {this.isLoading = true})
        try {
            const response = await AuthService.registration(email,password);
            localStorage.setItem('token',response.data.accessToken);
            runInAction(() => {this.user = response.data.user})
            runInAction(() => {this.isAuth = true})
        } catch (e) {
            console.log(e.response?.data?.message);
        }finally {
            runInAction(() => {this.isInit = true})
            runInAction(() => {this.isLoading = false})
        }
    }

    logout = async () => {
        runInAction(() => {this.isLoading = true})
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            runInAction(() => {this.user = {}})
            runInAction(() => {this.isAuth = false})
            return response
        } catch (e) {
            console.log(e.response?.data?.message);
        }finally {
            runInAction(() => {this.isLoading = false})
        }
    }


    authMe = async () => {
        runInAction(() => {this.isInit = false})
        runInAction(() => {this.isLoading = true})
        try {
            const response = await axios.get(`${API_URL}/refresh`,{withCredentials:true});
            localStorage.setItem('token',response.data.accessToken);
            runInAction(() => {this.user = response.data.user})
            runInAction(() => {this.isAuth = true})
        } catch (e) {
            this.logout();
            console.log(e.response?.data?.message);
        } finally {
            runInAction(() => {this.isInit = true})
            runInAction(() => {this.isLoading = false})
        }
    }
}

export default new AuthStore();
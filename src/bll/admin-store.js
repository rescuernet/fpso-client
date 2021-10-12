import {makeAutoObservable, runInAction} from "mobx";
import Store from "./store/"
import AdminService from "../services/admin-service";



class AdminStore {



    constructor() {
        makeAutoObservable(this);
    }

    newsCreate = async (Arr) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminService.newsCreate(Arr);
            console.log(response)
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

}

export default new AdminStore();
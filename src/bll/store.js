import {makeAutoObservable, runInAction} from "mobx";
import AdminService from "../services/admin-service";



class Store {

    isLoading = false
    isInit = false
    width = window.outerWidth

    constructor() {
        makeAutoObservable(this);
    }


}

export default new Store();
import {makeAutoObservable} from "mobx";



class Store {

    isLoading = false
    isInit = false
    width = window.outerWidth

    constructor() {
        makeAutoObservable(this);
    }

}

export default new Store();
import {makeAutoObservable, runInAction} from "mobx";
import Store from "./store"
import uiService from "../services/ui-service";



class UiStore {

    news = []

    constructor() {
        makeAutoObservable(this);
    }

    getNews = async (page) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await uiService.getNews(page);
            runInAction(() => {this.news = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

}

export default new UiStore();
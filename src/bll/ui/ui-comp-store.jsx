import {makeAutoObservable, runInAction} from "mobx";
import Store from "../store"
import uiCompService from "../../services/ui/ui-comp-service";



class UiCompStore {

    comp = []
    compOne = null
    comp_for_main = []

    constructor() {
        makeAutoObservable(this);
    }

    getComp = async (page) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await uiCompService.getComp(page);
            runInAction(() => {this.comp = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    getCompId = async (id) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await uiCompService.getCompId(id);
            runInAction(() => {this.compOne = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    /*getNewsForMain = async (limit) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await uiNewsService.getNews(1,limit);
            runInAction(() => {this.news_for_main = response.data.docs})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }*/

}

export default new UiCompStore();
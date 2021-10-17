import {makeAutoObservable, runInAction} from "mobx";
import Store from "./store"
import AdminService from "../services/admin-service";



class AdminStore {

    news_tmp_avatar = null
    news_tmp_avatar_errors = null

    constructor() {
        makeAutoObservable(this);
    }

    newsAvatarCreate = async (avatar) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminService.newsAvatarCreate(avatar);
            runInAction(() => {this.news_tmp_avatar = response.data.name})
        } catch (e) {
            runInAction(() => {this.news_tmp_avatar_errors =
                <div>
                    <div>Аватар не загрузился!</div>
                    <div>размер максимум 4 мб</div>
                    <div>тип файла JPEG/JPG</div>
                </div>})
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
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
import {makeAutoObservable, runInAction} from "mobx";
import Store from "./store"
import AdminService from "../services/admin-service";



class AdminStore {

    news_tmp_avatar = null
    news_tmp_images_errors = null
    news_tmp_images = []

    constructor() {
        makeAutoObservable(this);
    }

    newsAvatarCreate = async (avatar) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminService.newsAvatarCreate(avatar);
            runInAction(() => {this.news_tmp_avatar = response.data.name})
        } catch (e) {
            runInAction(() => {this.news_tmp_images_errors =
                <div>
                    <div>Изображение не загрузилось!</div>
                    <div>Максимальный размер 4 мб</div>
                    <div>Тип файла JPEG/JPG</div>
                </div>})
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    newsImageCreate = async (image) => {
        runInAction(() => {Store.isLoading = true})
        const imageArr = this.news_tmp_images
        try {
            const response = await AdminService.newsImageCreate(image);
            imageArr.push(response.data.name)
            runInAction(() => {this.news_tmp_images = imageArr})
        } catch (e) {
            runInAction(() => {this.news_tmp_images_errors =
                <div>
                    <div>Изображение не загрузилось!</div>
                    <div>Максимальный размер 4 мб</div>
                    <div>Тип файла JPEG/JPG</div>
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
            if(response.data?.error){
                return response.data.error
            }else{
                runInAction(() => {this.news_tmp_avatar = null})
                runInAction(() => {this.news_tmp_images_errors = null})
                runInAction(() => {this.news_tmp_images = []})
                return 'ok'
            }
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

}

export default new AdminStore();
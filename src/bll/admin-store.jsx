import {makeAutoObservable, runInAction} from "mobx";
import Store from "./store"
import AdminService from "../services/admin-service";



class AdminStore {

    news_tmp_avatar = null
    news_tmp_images = []
    news_tmp_errors = null
    news = []

    constructor() {
        makeAutoObservable(this);
    }

    newsAvatarCreate = async (avatar) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminService.newsAvatarCreate(avatar);
            runInAction(() => {this.news_tmp_avatar = response.data.name})
        } catch (e) {
            runInAction(() => {this.news_tmp_errors =
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
            runInAction(() => {this.news_tmp_errors =
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
                runInAction(() => {this.news_tmp_errors =
                    <div>
                        <div>{response.data.error}</div>
                    </div>})
            }else{
                runInAction(() => {this.news_tmp_avatar = null})
                runInAction(() => {this.news_tmp_errors = null})
                runInAction(() => {this.news_tmp_images = []})
                return 200
            }
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    getNews = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminService.getNews();
            runInAction(() => {this.news = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

}

export default new AdminStore();
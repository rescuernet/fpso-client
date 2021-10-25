import {makeAutoObservable, runInAction} from "mobx";
import Store from "./store"
import AdminService from "../services/admin-service";



class AdminStore {

    news_tmp_avatar_old = null
    news_tmp_avatar_new = null

    news_tmp_images_old = []
    news_tmp_images_new = []

    news_tmp_docs_old = []
    news_tmp_docs_new = []

    news_tmp_errors = null
    news = []

    constructor() {
        makeAutoObservable(this);
    }

    clearData() {
        runInAction(() => {this.news_tmp_avatar_new = null})
        runInAction(() => {this.news_tmp_avatar_old = null})
        runInAction(() => {this.news_tmp_errors = null})
        runInAction(() => {this.news_tmp_images_new = []})
        runInAction(() => {this.news_tmp_images_old = []})
        runInAction(() => {this.news_tmp_docs_new = []})
        runInAction(() => {this.news_tmp_docs_old = []})
    }

    newsAvatarCreate = async (avatar) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminService.newsAvatarCreate(avatar);
            runInAction(() => {this.news_tmp_avatar_new = response.data.name})
        } catch (e) {
            runInAction(() => {this.news_tmp_errors =
                <div>
                    <div>Изображение не загрузилось!</div>
                    <div>Максимальный размер 4 мб</div>
                    <div>Тип файла JPEG/JPG</div>
                </div>})
        } finally {
            runInAction(() => {Store.isLoading = false})
        }
    }

    newsImageCreate = async (image) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminService.newsImageCreate(image);
            runInAction(() => {this.news_tmp_images_new.push(response.data.name)})
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

    newsDocsCreate = async (doc,originName) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminService.newsDocsCreate(doc);
            runInAction(() => {this.news_tmp_docs_new.push({title:originName,doc:response.data.doc})})
        } catch (e) {
            runInAction(() => {this.news_tmp_errors =
                <div>
                    <div>Документ не загрузился!</div>
                    <div>Максимальный размер 10 мб</div>
                    <div>Типы файлов .doc, .docx, .pdf, .xls, .xlsx</div>
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
                    <div>{response.data.error}</div>})
            }else{
                runInAction(() => {this.clearData()})
                return 200
            }
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    newsUpdate = async (Arr) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminService.newsUpdate(Arr);
            if(response.data?.error){
                runInAction(() => {this.news_tmp_errors =
                    <div>{response.data.error}</div>})
            }else{
                runInAction(() => {this.clearData()})
                return 200
            }
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    newsDelete = async (id) => {
        runInAction(() => {Store.isLoading = true})
        try {
            await AdminService.newsDelete(id);
            runInAction(() => {this.clearData()})
            return 200
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
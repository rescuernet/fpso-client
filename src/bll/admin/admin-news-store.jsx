import {makeAutoObservable, runInAction} from "mobx";
import Store from "../store"
import AdminNewsService from "../../services/admin/admin-news-service";
import * as dateFns from "date-fns";


class AdminNewsStore {
    news_tmp_errors = null
    news = []
    tmpNewsId = null
    newsOne = {
        dateStart: '',
        dateEnd: '',
        headerFirst: '',
        headerSecond: '',
        textMain: '',
        fixedNews: false,
        importantNews: false,
        published: false,
        avatar: '',
        images: [],
        docs: [],
        tmpNews: false
    }


    constructor() {
        makeAutoObservable(this);
    }

    clearData() {
        runInAction(() => {
            this.news_tmp_errors = null
            this.tmpNewsId = null
            this.newsOne.dateStart = dateFns.format(new Date(), 'yyyy-MM-dd')
            this.newsOne.dateEnd = ''
            this.newsOne.headerFirst = ''
            this.newsOne.headerSecond = ''
            this.newsOne.textMain = ''
            this.newsOne.fixedNews = false
            this.newsOne.importantNews = false
            this.newsOne.published = false
            this.newsOne.avatar = ''
            this.newsOne.images = []
            this.newsOne.docs = []
            this.newsOne.tmpNews = false
        })
    }

    newsCreate = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminNewsService.newsCreate();
            if(response.data?.error){
                runInAction(() => {this.news_tmp_errors =
                    <div>{response.data.error}</div>})
            }else{
                runInAction(() => {
                    this.clearData()
                    this.tmpNewsId = response.data
                })
                return response
            }
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    newsAvatarCreate = async (avatar) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminNewsService.newsAvatarCreate(avatar);
            runInAction(() => {this.newsOne.avatar = response.data.name})
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
        try {
            const response = await AdminNewsService.newsImageCreate(image);
            runInAction(() => {this.newsOne.images.push(response.data.name)})
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
            const response = await AdminNewsService.newsDocsCreate(doc);
            runInAction(() => {this.newsOne.docs.push({title:originName,doc:response.data.doc})})
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

    newsUpdate = async (id) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminNewsService.newsUpdate(this.newsOne);
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
            const response = await AdminNewsService.newsDelete(id);
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

    getNews = async () => {
        runInAction(() => {Store.isLoading = true})
        runInAction(() => {this.clearData()})
        try {
            const response = await AdminNewsService.getNews();
            runInAction(() => {this.news = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    getNewsId = async (id) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminNewsService.getNewsId(id);
            runInAction(() => {this.newsOne = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

}

export default new AdminNewsStore();
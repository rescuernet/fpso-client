import {makeAutoObservable, runInAction, toJS} from "mobx";
import Store from "../store"
import AdminNewsService from "../../services/admin/admin-news-service";
import * as dateFns from "date-fns";



class AdminNewsStore {
    newsModel = {
        dateStart: dateFns.format(new Date(), 'yyyy-MM-dd'),
        dateEnd: '',
        headerFirst: '',
        headerSecond: null,
        textMain: null,
        fixedNews: false,
        importantNews: false,
        published: false,
        avatar: null,
        images: [],
        docs: []
    }
    news_tmp_errors = null
    news = []
    newsOne = {
        dateStart: dateFns.format(new Date(), 'yyyy-MM-dd'),
        dateEnd: '',
        headerFirst: '',
        headerSecond: '',
        textMain: '',
        fixedNews: false,
        importantNews: false,
        published: false,
        avatar: '',
        images: [],
        docs: []
    }


    constructor() {
        makeAutoObservable(this);
    }

    clearData() {
        runInAction(() => {
            this.news_tmp_errors = null
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
        })
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

    newsCreate = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const arr = {
                avatar: this.news_tmp_avatar_new,
                dateStart: this.news_tmp.dateStart,
                dateEnd: this.news_tmp.dateEnd,
                headerFirst: this.news_tmp.headerFirst,
                headerSecond: this.news_tmp.headerSecond,
                textMain: this.news_tmp.textMain,
                fixedNews: this.news_tmp.fixedNews,
                importantNews: this.news_tmp.importantNews,
                published: this.news_tmp.published,
                images: toJS(this.news_tmp_images_new),
                docs: toJS(this.news_tmp_docs_new)
            }
            const response = await AdminNewsService.newsCreate(arr);
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

    newsUpdate = async (id) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const arr = {
                id,
                avatarNew: this.news_tmp_avatar_new,
                avatarOld: this.news_tmp_avatar_old,
                imagesNew: toJS(this.news_tmp_images_new),
                imagesOld: toJS(this.news_tmp_images_old),
                docsNew: toJS(this.news_tmp_docs_new),
                docsOld: toJS(this.news_tmp_docs_old),
                model: {
                    avatar: this.news_tmp_avatar_new ? this.news_tmp_avatar_new : this.news_tmp_avatar_old,
                    dateStart: this.news_tmp.dateStart,
                    dateEnd: this.news_tmp.dateEnd,
                    headerFirst: this.news_tmp.headerFirst,
                    headerSecond: this.news_tmp.headerSecond,
                    textMain: this.news_tmp.textMain,
                    fixedNews: this.news_tmp.fixedNews,
                    importantNews: this.news_tmp.importantNews,
                    published: this.news_tmp.published,
                    images: toJS(this.news_tmp_images_new).concat(toJS(this.news_tmp_images_old)),
                    docs: toJS(this.news_tmp_docs_new).concat(toJS(this.news_tmp_docs_old))
                }
            }
            const response = await AdminNewsService.newsUpdate(arr);
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
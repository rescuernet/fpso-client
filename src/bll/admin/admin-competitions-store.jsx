import {makeAutoObservable, runInAction} from "mobx";
import Store from "../store"
import * as dateFns from "date-fns";
import AdminCompetitionsService from "../../services/admin/admin-competitions-service";



class AdminCompetitionsStore {

    competitions_tmp_avatar_old = null
    competitions_tmp_avatar_new = null

    competitions_tmp_images_old = []
    competitions_tmp_images_new = []

    competitions_tmp_docs_old = []
    competitions_tmp_docs_new = []

    competitions_tmp_errors = null
    competitions = []
    competitions_tmp = {
        dateStart: dateFns.format(new Date(), 'yyyy-MM-dd'),
        dateEnd: null,
        headerFirst: null,
        headerSecond: null,
        textMain: null,
        fixedNews: false,
        importantNews: false,
        published: false,
        deleteNews: false
    }

    constructor() {
        makeAutoObservable(this);
    }

    clearData() {
        runInAction(() => {this.competitions_tmp_avatar_old = null})
        runInAction(() => {this.competitions_tmp_avatar_new = null})
        runInAction(() => {this.competitions_tmp_errors = null})
        runInAction(() => {this.competitions_tmp_images_old = []})
        runInAction(() => {this.competitions_tmp_images_new = []})
        runInAction(() => {this.competitions_tmp_docs_old = []})
        runInAction(() => {this.competitions_tmp_docs_new = []})
        runInAction(() => {this.news = []})
        runInAction(() => {
            this.competitions_tmp.dateStart = dateFns.format(new Date(), 'yyyy-MM-dd')
            this.competitions_tmp.dateEnd = null
            this.competitions_tmp.headerFirst = null
            this.competitions_tmp.headerSecond = null
            this.competitions_tmp.textMain = null
            this.competitions_tmp.fixedNews = false
            this.competitions_tmp.importantNews = false
            this.competitions_tmp.published = false
        })
    }

    compAvatarCreate = async (avatar) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminCompetitionsService.compAvatarCreate(avatar);
            runInAction(() => {this.competitions_tmp_avatar_new = response.data.name})
        } catch (e) {
            runInAction(() => {this.competitions_tmp_errors =
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



}

export default new AdminCompetitionsStore();
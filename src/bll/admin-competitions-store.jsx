import {makeAutoObservable, runInAction} from "mobx";
import Store from "./store"



class AdminCompetitionsStore {

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



}

export default new AdminCompetitionsStore();
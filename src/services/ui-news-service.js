import $api from "../http/api";
import {RM} from "../routes/routes";

export default class uiNewsService {

    static async getNews(page = 1,limit = 9) {
        return $api.get(`${RM.News.path}?page=${page}&limit=${limit}`)
    }

    static async getNewsId(id) {
        return $api.get(RM.NewsViewId.getUrl(id))
    }
}
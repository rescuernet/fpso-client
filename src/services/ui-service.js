import $api from "../http/api";
import {RM} from "../routes/routes";

export default class uiService {

    static async getNews(page = 1) {
        return $api.get(`${RM.News.path}?page=${page}`)
    }
}
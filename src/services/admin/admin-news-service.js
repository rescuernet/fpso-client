import $api from "../../http/api";
import {ADM_API_RM} from "../../routes/admin-api-routes";
import {ADM_RM} from "../../routes/admin-routes";

export default class AdminNewsService {

    static async newsAvatarCreate(avatar) {
        return $api.post(ADM_API_RM.News__Avatar__Create.path,avatar)
    }

    static async newsImageCreate(image) {
        return $api.post(ADM_API_RM.News__Image__Create.path,image)
    }

    static async newsDocsCreate(doc) {
        return $api.post(ADM_API_RM.News__Docs__Create.path,doc)
    }

    static async newsCreate(Arr) {
        return $api.post(ADM_API_RM.News__Create.path,Arr)
    }

    static async newsUpdate(Arr) {
        return $api.post(ADM_API_RM.News__Update.path,Arr)
    }

    static async newsDelete(id) {
        return $api.post(ADM_API_RM.News__Delete.path,{id})
    }

    static async getNews() {
        return $api.get(ADM_RM.News.path)
    }

    static async getNewsId(id) {
        return $api.get(`${ADM_RM.News.path}/${id}`)
    }
}
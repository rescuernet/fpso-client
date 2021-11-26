import $api from "../../http/api";
import {ADM_API_RM} from "../../routes/admin-api-routes";

export default class AdminCompetitionsService {

    static async create() {
        return $api.post(ADM_API_RM.Competitions__Create.path)
    }

    /*static async compAvatarCreate(avatar) {
        return $api.post(RM.Admin__Competitions__Avatar__Create.path,avatar)
    }

    static async compImageCreate(image) {
        return $api.post(RM.Admin__Competitions__Image__Create.path,image)
    }

    static async newsDocsCreate(doc) {
        return $api.post(RM.Admin__News__Docs__Create.path,doc)
    }

    static async newsCreate(Arr) {
        return $api.post(RM.Admin__News__Create.path,Arr)
    }

    static async newsUpdate(Arr) {
        return $api.post(RM.Admin__News__Update.path,Arr)
    }

    static async newsDelete(id) {
        return $api.post(RM.Admin__News__Delete.path,{id})
    }

    static async getNews() {
        return $api.get(RM.Admin__News.path)
    }*/
}
import $api from "../../http/api";
import {ADM_API_RM} from "../../routes/admin-api-routes";
import {ADM_RM} from "../../routes/admin-routes";

export default class AdminCompetitionsService {

    static async compCreate() {
        return $api.post(ADM_API_RM.Competitions__Create.path)
    }

    static async getCompId(id) {
        return $api.get(ADM_RM.Competitions__Edit.getUrl(id))
    }

    static async compAvatarCreate(avatar) {
        return $api.post(ADM_API_RM.Competitions__Avatar__Create.path,avatar)
    }

}
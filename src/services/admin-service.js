import $api from "../http/api";
import {RM} from "../routes/routes";

export default class AdminService {

    static async newsAvatarCreate(avatar) {
        console.log(avatar)
        return $api.post(RM.Admin__News__Avatar__Create.path,avatar)
    }

    static async newsCreate(Arr) {
        return $api.post(RM.Admin__News__Create.path,Arr)
    }
}
import $api from "../http/api";
import {RM} from "../routes/routes";

export default class AdminService {
    static async newsCreate(Arr) {
        return $api.post(RM.Admin__News__Create.path,Arr)
    }
}
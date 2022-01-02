import $api from "../../http/api";
import {ADM_API_RM} from "../../routes/admin-api-routes";
import {ADM_RM} from "../../routes/admin-routes";


export default class AdminOtherService {

    static async mediaDelTmp(Arr) {
        return $api.post(ADM_API_RM.mediaDelTmp.path,Arr)
    }

    static async referenceBookUpdate(Arr) {
        return $api.post(ADM_API_RM.Reference__Books__update.path,Arr)
    }

    static async referenceBookGet() {
        return $api.get(ADM_RM.Reference__Books.path)
    }
}
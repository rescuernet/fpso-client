import $api from "../../http/api";
import {ADM_API_RM} from "../../routes/admin-api-routes";
import {ADM_RM} from "../../routes/admin-routes";


export default class AdminReferenceBooksService {

    static async pools_get() {
        return $api.get(ADM_API_RM.Reference__Books__Pools_Get.path)
    }

    static async pools_create() {
        return $api.post(ADM_API_RM.Reference__Books__Pools_Create.path)
    }

    static async pools_id(id) {
        return $api.get(ADM_RM.Reference__Books__Pool_Edit.getUrl(id))
    }

}
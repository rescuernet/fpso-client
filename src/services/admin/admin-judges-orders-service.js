import $api from "../../http/api";
import {ADM_API_RM} from "../../routes/admin-api-routes";
import {ADM_RM} from "../../routes/admin-routes";


export default class AdminJudgesOrdersService {

    static async judges_orders_create() {
        return $api.post(ADM_API_RM.Judges_Orders__Create.path)
    }

    static async judges_orders_id(id) {
        return $api.get(ADM_RM.Judges_Orders_Edit.getUrl(id))
    }

    static async judges_orders_people_get() {
        return $api.get(ADM_API_RM.Judges_Orders__People__Get.path)
    }

    static async judges_orders_docs_create(doc) {
        return $api.post(ADM_API_RM.Judges_Orders__Docs__Create.path,doc)
    }

    static async judges_orders_save(arr) {
        return $api.post(ADM_API_RM.Judges_Orders__Save.path,arr)
    }

    static async judges_orders_get(orderType) {
        return $api.get(`${ADM_RM.Judges_Orders.path}?ordertype=${orderType}`)
    }

    /*

    static async pools_save(arr) {
        return $api.post(ADM_API_RM.Reference__Books__Pools_Save.path,arr)
    }

    static async pools_get() {
        return $api.get(ADM_API_RM.Reference__Books__Pools_Get.path)
    }

    static async people_create() {
        return $api.post(ADM_API_RM.Reference__Books__People_Create.path)
    }

    static async people_id(id) {
        return $api.get(ADM_RM.Reference__Books__People_Edit.getUrl(id))
    }

    static async people_avatar_create(avatar) {
        return $api.post(ADM_API_RM.Reference__Books__People_Avatar_Create.path,avatar)
    }

    static async people_save(arr) {
        return $api.post(ADM_API_RM.Reference__Books__People_Save.path,arr)
    }

    static async people_get() {
        return $api.get(ADM_API_RM.Reference__Books__People_Get.path)
    }*/
}
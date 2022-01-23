import $api from "../../http/api";
import {ADM_API_RM} from "../../routes/admin-api-routes";
import {ADM_RM} from "../../routes/admin-routes";


export default class AdminAboutUsService {

    static async about_us_get() {
        return $api.get(ADM_RM.AboutUs.path)
    }

    /*static async judges_orders_id(id) {
        return $api.get(ADM_RM.Judges_Orders_Edit.getUrl(id))
    }

    static async judges_orders_people_get(orderType) {
        return $api.get(`${ADM_API_RM.Judges_Orders__People__Get.path}?ordertype=${orderType}`)
    }

    static async judges_orders_docs_create(doc) {
        return $api.post(ADM_API_RM.Judges_Orders__Docs__Create.path,doc)
    }

    static async judges_orders_save(arr) {
        return $api.post(ADM_API_RM.Judges_Orders__Save.path,arr)
    }

    static async judges_orders_get(orderType) {
        return $api.get(`${ADM_RM.Judges_Orders.path}?ordertype=${orderType}`)
    }*/





}
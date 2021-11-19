import $api from "../../http/api";
import {RM} from "../../routes/routes";

export default class AdminOtherService {

    static async referenceBookUpdate(Arr) {
        return $api.post(RM.Admin__Reference__Books__update.path,Arr)
    }

    static async referenceBookGet() {
        return $api.get(RM.Admin__Reference__Books.path)
    }
}
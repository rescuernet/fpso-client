import $api from "../http/api";
import {RM} from "../routes/routes";

export default class AuthService {
    static async login(email,password) {
        return $api.post(RM.Login.path,{email,password})
    }

    static async registration(email,password) {
        return $api.post('/registration',{email,password})
    }

    static async logout() {
        return $api.post('/logout')
    }
}
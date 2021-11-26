import {makeAutoObservable, runInAction} from "mobx";
import Store from "../store"
import AdminCompetitionsService from "../../services/admin/admin-competitions-service";

class AdminCompetitionsStore {
    tmp_errors = null
    comp = []
    tmpCompId = null
    compOne = null


    constructor() {
        makeAutoObservable(this);
    }

    clearData() {
        runInAction(() => {
            this.tmp_errors = null
            this.tmpCompId = null
            this.competitionsOne = null
        })
    }

    compCreate = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminCompetitionsService.compCreate();
            if(response.data?.error){
                console.log(response.data.error)
                return 'ERROR'
            }else{
                runInAction(() => {
                    this.clearData()
                    this.tmpCompId = response.data
                })
                return 'OK'
            }
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    getCompId = async (id) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminCompetitionsService.getCompId(id);
            runInAction(() => {this.compOne = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    compAvatarCreate = async (avatar) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminCompetitionsService.compAvatarCreate(avatar);
            runInAction(() => {this.compOne.avatar = response.data.name})
        } catch (e) {
            runInAction(() => {this.tmp_errors =
                <div>
                    <div>Изображение не загрузилось!</div>
                    <div>Максимальный размер 4 мб</div>
                    <div>Тип файла JPEG/JPG</div>
                </div>})
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

}

export default new AdminCompetitionsStore();
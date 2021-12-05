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
            this.compOne = null
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

    compDocsCreate = async (doc,originName,section) => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminCompetitionsService.compDocsCreate(doc);
            if(section.name === 'docs'){
                runInAction(() => {this.compOne.docs.push({title:originName,doc:response.data.doc})})
            }
            if(section.name === 'results'){
                runInAction(() => {this.compOne.results[section.day].docs.push({title:originName,doc:response.data.doc})})
            }

        } catch (e) {
            runInAction(() => {this.tmp_errors =
                <div>
                    <div>Документ не загрузился!</div>
                    <div>Максимальный размер 10 мб</div>
                    <div>Типы файлов .doc, .docx, .pdf, .xls, .xlsx</div>
                </div>})
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    compUpdate = async () => {
        runInAction(() => {Store.isLoading = true})
        try {
            const response = await AdminCompetitionsService.compUpdate(this.compOne);
            if(response.data?.error){
                runInAction(() => {this.tmp_errors =
                    <div>{response.data.error}</div>})
            }else{
                runInAction(() => {this.clearData()})
                return 200
            }
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {Store.isInit = true})
            runInAction(() => {Store.isLoading = false})
        }
    }

    getComp = async () => {
        runInAction(() => {
            Store.isLoading = true
            this.clearData()
        })
        try {
            const response = await AdminCompetitionsService.getComp();
            runInAction(() => {this.comp = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {
                Store.isInit = true
                Store.isLoading = false
            })
        }
    }

}

export default new AdminCompetitionsStore();
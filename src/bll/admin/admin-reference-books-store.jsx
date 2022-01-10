import {makeAutoObservable, runInAction, toJS} from "mobx";
import AdminReferenceBooksService from "../../services/admin/admin-reference-books-service";
import Store from "../store";



class AdminReferenceBooksStore {
    tmp_errors = null
    referenceBooks = {
        pools: {
            list: [],
            id: null,
            one: null,
        },

    }

    constructor() {
        makeAutoObservable(this);
    }

    clearData() {
        runInAction(() => {
            this.tmp_errors = null
            this.referenceBooks.pools.one = null
            this.referenceBooks.pools.id = null
            this.referenceBooks.pools.list = null
        })
    }

    poolsGet = async () => {
        runInAction(() => {this.isLoading = true})
        try {
            const response = await AdminReferenceBooksService.pools_get()
            runInAction(() => {this.referenceBooks.pools.list = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {
                this.isInit = true
                this.isLoading = false
            })
        }
    }

    poolsCreate = async () => {
        runInAction(() => {this.isLoading = true})
        try {
            const response = await AdminReferenceBooksService.pools_create()
            if(response.data?.error){
                console.log(response.data.error)
                return 'ERROR'
            }else{
                runInAction(() => {
                    this.referenceBooks.pools.id = response.data
                })
                return 'OK'
            }
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {
                this.isInit = true
                this.isLoading = false
            })
        }
    }

    poolsId = async (id) => {
        runInAction(() => {this.isLoading = true})
        try {
            const response = await AdminReferenceBooksService.pools_id(id)
            runInAction(() => {this.referenceBooks.pools.one = response.data})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {
                this.isInit = true
                this.isLoading = false
            })
        }
    }

    poolSave = async () => {
        runInAction(() => {this.isLoading = true})
        try {
            const response = await AdminReferenceBooksService.pools_save(this.referenceBooks.pools.one)
            if(response.data?.error){
                runInAction(() => {
                    this.tmp_errors = <div>{response.data.error}</div>
                })
            }else{
                this.clearData()
                return 200
            }
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {
                this.isInit = true
                this.isLoading = false
            })
        }
    }


}

export default new AdminReferenceBooksStore();
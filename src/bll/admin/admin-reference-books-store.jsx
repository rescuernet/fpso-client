import {makeAutoObservable, runInAction, toJS} from "mobx";
import AdminReferenceBooksService from "../../services/admin/admin-reference-books-service";



class AdminReferenceBooksStore {

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

    /*clearData() {
        runInAction(() => {
            this.news_tmp_errors = null
            this.tmpNewsId = null
            this.newsOne = null
            this.mediaDel = []
        })
    }*/

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

    /*referenceBookGet = async () => {
        runInAction(() => {this.isLoading = true})
        try {
            const response = await AdminOtherService.referenceBookGet();
            const ref = response.data
            delete ref._id
            delete ref.__v
            runInAction(() => {this.referenceBooks = ref})
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {
                this.isInit = true
                this.isLoading = false
            })
        }
    }

    referenceBookUpdate = async () => {
        runInAction(() => {this.isLoading = true})
        try {
            const clearNullPool = this.referenceBooks.pool.filter((i)=> {
                let item = null
                if(i.poolName && i.poolAddress){
                    item = {poolName:i.poolName,poolAddress:i.poolAddress}
                }
                return item
            });
            await runInAction(() => {this.referenceBooks.pool = clearNullPool})
            await AdminOtherService.referenceBookUpdate(this.referenceBooks);
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {this.isInit = true})
            runInAction(() => {this.isLoading = false})
        }
    }*/


}

export default new AdminReferenceBooksStore();
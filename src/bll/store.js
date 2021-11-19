import {makeAutoObservable, runInAction} from "mobx";
import AdminOtherService from "../services/admin/admin-other-service";



class Store {

    isLoading = false
    isInit = false
    width = window.outerWidth
    referenceBooks = null

    constructor() {
        makeAutoObservable(this);
    }

    referenceBookGet = async () => {
        runInAction(() => {this.isLoading = true})
        try {
            const response = await AdminOtherService.referenceBookGet();
            const ref = this.referenceBooks = response.data
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
                if(i.poolName && i.poolAddress){
                    return {poolName:i.poolName,poolAddress:i.poolAddress}
                }
            });
            runInAction(() => {this.referenceBooks.pool = clearNullPool})
            await AdminOtherService.referenceBookUpdate(this.referenceBooks);
        } catch (e) {
            console.log(e)
        } finally {
            runInAction(() => {this.isInit = true})
            runInAction(() => {this.isLoading = false})
        }
    }


}

export default new Store();
import {makeAutoObservable, runInAction, toJS} from "mobx";
import AdminOtherService from "../services/admin/admin-other-service";



class Store {

    isLoading = false
    isInit = false
    width = window.outerWidth
    referenceBooks = null

    mediaDelTmp = []

    constructor() {
        makeAutoObservable(this);
    }

    setMediaDelTmp(item) {
        if(localStorage.getItem('mediaDelTmp')){
            this.mediaDelTmp = JSON.parse(localStorage.getItem('mediaDelTmp'))
            this.mediaDelTmp.push(item)
        }else{
            this.mediaDelTmp.push(item)
        }
        localStorage.setItem('mediaDelTmp',JSON.stringify(toJS(this.mediaDelTmp)));
    }

    sendMediaDelTmp = async () => {
        if(localStorage.getItem('mediaDelTmp')){
            runInAction(() => {this.isLoading = true})
            try {
                const arr = JSON.parse(localStorage.getItem('mediaDelTmp'))
                const response = await AdminOtherService.mediaDelTmp({mediaDelTmp: arr});

                if(response.data.status === 200){
                    localStorage.removeItem('mediaDelTmp')
                    this.mediaDelTmp = []
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

    referenceBookGet = async () => {
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
    }


}

export default new Store();
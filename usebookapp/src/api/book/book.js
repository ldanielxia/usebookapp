import ajax from'@/api/index.js'

const api = {
    get(url,data) {
        return ajax.get(url,{params:data})
    },
    top10list(data){
        return ajax.get('bookAPI/booktop10list',{params:data})
    },
    search(data,header){
        return ajax.post('bookAPI/search',data,header)
    },
    bookdetail(id,data){
        return ajax.get('bookAPI/bookdetail/'+id,{params:data});
    },
    addBookcommunicate(data,header){
        return ajax.post('commonmybatisAPI/bookcommunicate',data,header)
    },
    booklistbycategory(id,data){
        return ajax.get('bookAPI/booklistbycategory/'+id,{params:data});
    },
    myusebooks(data,header){
        return ajax.post('bookAPI/myusebook',data,header)
    },
    myorderbooks(data,header){
        return ajax.post('bookAPI/orderbook',data,header)
    },
    bookorderdetail(id,data){
        return ajax.get('bookAPI/bookorderdetail/'+id,{params:data});
    },
    mysaledbooks(data,header){
        return ajax.post('bookAPI/salebook',data,header)
    },
    newusebooks(data) {
        const header = {
            'content-type': 'multipart/form-data'  
        }
        return ajax.post('bookAPI/newusebookwithimg',data,header)
    },
    udpateusebookswithimg(data) {
        const header = {
            'content-type': 'multipart/form-data'  
        }
        return ajax.post('bookAPI/updateusebookwithimg',data,header)
    },
    udpateusebooks(data) {
        const header = {
            'content-type': 'multipart/form-data'  
        }
        return ajax.post('bookAPI/updateusebook',data,header)
    },
   
}
export default api
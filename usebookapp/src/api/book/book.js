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
    }
}
export default api
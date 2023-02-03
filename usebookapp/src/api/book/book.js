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
    }
}
export default api
import ajax from'@/api/index.js'

const api = {
    get(url,data) {
        return ajax.get(url,{params:data})
    },
    categorybyid(fatherid,data){
        return ajax.get('categoryAPI/categories/'+fatherid,{params:data})
    },
}
export default api
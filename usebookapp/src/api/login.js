import ajax from'@/api/index.js'

const api = {
    get(url,data) {     
        return ajax.get(url,{params:data})
    },
    login(data,header){
        return ajax.post('usersAPI/users/login',data,header)
    },
 
}
export default api
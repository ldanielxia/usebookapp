import ajax from'@/api/index.js'

const api = {
    add(data,header) {
        return ajax.post('usersAPI/users',data,header)
    },
    exits(data,header){
        return ajax.post('usersAPI/users/exits',data,header)
    },
    getOne(id,data,header) {
        return ajax.get('usersAPI/users/'+id,data,header)
    },
    update(data) {
        return ajax.put('usersAPI/users',data)
    },
}
export default api
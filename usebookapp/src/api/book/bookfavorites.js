import ajax from'@/api/index.js'

const api = {
    add(data,header){
        return ajax.post('bookfavoritesAPI/bookfavorites',data,header)
    },
    delete(data){
        return ajax.delete('bookfavoritesAPI/bookfavorites', {data:data} )
    },
    favoritebook(data){
        return ajax.post('bookAPI/favoritebook', data )
    },
}
export default api
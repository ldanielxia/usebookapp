import ajax from'@/api/index.js'

const api = {
    orders(data) {
        const header = {
            'content-type': 'multipart/form-data'  
        }
        return ajax.post('orderAPI/orders',data,header)
    }
}
export default api
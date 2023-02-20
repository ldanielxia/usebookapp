 import axios from 'axios'

const config = {
    baseURL: process.env.VUE_APP_BASE_API, //  baseURL: 'http://localhost:34741' 
    //baseURL: 'http://localhost:8080/',
    redirectURL:process.env.VUE_APP_REDIRECT_API,
}
let instance = axios.create(config)
const ajax = {
    instance() {
        return instance
    },
    // baseInstance() {
    //     return baseInstance
    // },
    get(url, params) {
        return new Promise((resolve, reject) => {
            // var myurl=config.baseURL+url;
            // 
            url=config.baseURL+url;
            console.log(url);
            instance.get(url, params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        })
    },
    post(url, params,header) {
        return new Promise((resolve, reject) => {
            url=config.baseURL+url;
            instance.post(url, params,header).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        })
    },
    put(url, params) {
        return new Promise((resolve, reject) => {
            instance.put(url, params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        })
    },
    delete(url, params) {
        return new Promise((resolve, reject) => {
            instance.delete(url, params).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        })
    },
    // baseGet() {
    //     return new Promise((resolve, reject) => {
    //         baseInstance.get(url, params).then((response) => {
    //             resolve(response);
    //         }).catch((error) => {
    //             reject(error);
    //         });
    //     })
    // },
    // basePost() {}
}

export default ajax;
// http://shop.bluej.cn/api/

import axios from 'axios'

const http = axios.create({
    baseURL: 'http://shop.bluej.cn/api',
    timeout: 6000
})

export const HttpReq = (url, data, method="post") => {
    return new Promise((resolve, reject)=>{
        http(url, data, {"Content-Type": "application/json"}, method)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    })
}
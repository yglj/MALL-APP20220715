// http://shop.bluej.cn/api/

import axios from 'axios'

const http = axios.create({
    baseURL: 'http://shop.bluej.cn/api',
    timeout: 6000
})

//  0 post 1 get
export const HttpReq = (url, data, method) => {
    let method_http = {0:"post", 1:"get", 2: "put", 3: "delete"}
    method = method_http[method]
    let headers =  {
        "Content-Type": "application/json"
    }

    if (url.includes('bluej') || url.startsWith('/')){
        data = { ...data, "project_id": 249 }
        headers["x-token"] = sessionStorage.getItem("token")
    }

    return new Promise((resolve, reject)=>{
        http({
            url,
            data,
            headers: headers,
            params: method == "get" ? data : "",
            method
        })
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            console.warn(`[error]: ${err.message}`);
            resolve(err.message)
        })
    })

}

// export function getRandomWord(){
//     let text = ""
//     // (async function(){
//     //     console.log(22, text);
//     //     let res = await HttpReq("https://www.ooopn.com/tool/api/yan/api.php?type=text")
//     //     res = text
//     // })()
//     // console.log(33, text);
//     // (async () => {
//     //     text = await HttpReq("https://www.ooopn.com/tool/api/yan/api.php?type=text")
//     // })()
//     return text
// }
//引入axios库
import Axios from "axios";

//超时处理
const instance = Axios.create({
    timeout: 2000,
})

//请求拦截器
instance.interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.reject(err)
})

//响应拦截器
instance.interceptors.response.use(data => {
    console.log('测试')
    return data;
}, err => {
    return Promise.reject(err)
})

//导出拦截处理
export default instance;
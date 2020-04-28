import Axios from "axios";

const instance  = Axios.create({
    timeout:5000,
})

//请求拦截器
instance.interceptors.request.use(config=>{
    //
    return config;
},e=>{
    return Promise.reject(e)
})

//响应拦截器
instance.interceptors.response.use(data=>{
    return data;
},e=>{
    return Promise.reject(e)
})

export default instance;
// 请求拦截
import axios from "axios";
// 设置请求时间
export const instance = axios.create({
  timeout:5000  
})

// 请求前拦截
instance.interceptors.request.use(config=>{

    return config
},error=>{
    return Promise.reject(error)
})

// 请求后拦截 (主要作用简化获取数据的嵌套)
instance.interceptors.response.use(result=>{
    
    return result.data
},err=>{
    return Promise.reject(err)
})
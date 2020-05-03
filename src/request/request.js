import axios from 'axios'
import qs from "qs"

const instance = axios.create({
    timeout:10000
});

// 请求前的拦截
instance.interceptors.request.use(config => {
    // if (config.method == 'post') {
    //     config.data = config.data || {}
    //     config.data = qs.stringify(config.data)
    // } else if (config.method == 'delete' || config.method == 'get') {
    //     config.params = config.params || {}
    //     config.params.token = localStorage.getItem("token")
    // }   
    return config;
}, error => {
    return Promise.reject(error);
});
  
// 返回结果后的拦截
// instance.interceptors.response.use(result => {
//     return result.data;
// }, error => {
//     return Promise.reject(error);
// });

export default instance
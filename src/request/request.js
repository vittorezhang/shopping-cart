import axios from "axios";
import qs from 'qs';
const instance = axios.create({
    timeout : 10000, //ms
});
// 请求前拦截器
instance.interceptors.request.use(config => {
    if(config.method === 'get') {
        config.params = config.params || {};
    }
    return config;
}, error => {
    return Promise.reject(error);
});
// 响应后拦截器

instance.interceptors.response.use(result => {
    return result.data;
}, error => {
    return Promise.reject(error);
});

// 导出
export default instance;
import axios from 'axios';
import qs from 'qs';
// 设置10s请求超时
const instance = axios.create({
    timeout:10000 
});
// 请求前的拦截器
instance.interceptors.request.use(config => {
    if(config.method =="get"){
        config.url = config.url+"?" + qs.stringify(config.params,{arrayFormat:'repeat'});
        delete config.params;
    }
    return config;
},error =>{
    return Promise.reject(error);
});

// 返回结果后的拦截器
instance.interceptors.response.use(result =>{
    return result;

},error =>{
    return Promise.reject(error);
});

export default instance;

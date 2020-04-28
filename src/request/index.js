import request from "./request"

//请求位置接口
export const locationApi  = param => request.get("http://kumanxuan1.f3322.net:8001/v2/pois/"+param);
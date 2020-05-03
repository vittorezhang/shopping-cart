import request from "./request"
// const pre = "/api"
   
//获取经纬度
export const GaodeApi = params => request.get("http://kumanxuan1.f3322.net:8001/v2/pois/"+params.address,{params});



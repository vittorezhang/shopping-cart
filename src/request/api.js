import request from "./request"
// const pre = "/api"
   
//获取经纬度
export const GaodeApi = params => request.get("http://kumanxuan1.f3322.net:8001/v2/pois/"+params.address,{params});

// 获取九宫格的信息
export const GridApi = params => request.get("http://kumanxuan1.f3322.net:8001/v2/index_entry",{params});


// 获取列表的信息
export const ListApi = params => request.get("http://kumanxuan1.f3322.net:8001/shopping/restaurants?latitude=23.128225&longitude=113.289752",{params});


// 获取店铺详情
export const DetailApi = params => request.get("http://kumanxuan1.f3322.net:8001/shopping/restaurant/"+params.id,{params});

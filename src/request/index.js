import request from "./request"

//请求位置数据
export const locationApi = param => { return request.get("http://kumanxuan1.f3322.net:8001/v2/pois/" + param) };
//请求食品分类列表数据
export const foodListApi = param => { return request.get("http://kumanxuan1.f3322.net:8001/v2/index_entry" + param) };
//请求商铺列表数据
export const shopListApi = param => { return request.get("http://kumanxuan1.f3322.net:8001/shopping/restaurants?" + param) };
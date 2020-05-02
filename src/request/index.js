import request from "./request"

//请求位置接口
export const locationApi  = param => request.get("http://kumanxuan1.f3322.net:8001/v2/pois/"+param);

//获取食物分类菜单接口
export const foodListApi = param => request.get("http://kumanxuan1.f3322.net:8001/v2/index_entry"+param)

//获取商铺列表
export const storeListApi = param => request.get("http://kumanxuan1.f3322.net:8001/shopping/restaurants",{params:param})

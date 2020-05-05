import request from "./request"

//请求位置接口
export const locationApi  = param => request.get("http://kumanxuan1.f3322.net:8001/v2/pois/"+param);

//获取食物分类菜单接口
export const foodListApi = param => request.get("http://kumanxuan1.f3322.net:8001/v2/index_entry"+param)

//获取商铺列表
export const storeListApi = param => request.get("http://kumanxuan1.f3322.net:8001/shopping/restaurants",{params:param})

//获取商铺详细接口
export const storeInfoApi = param => request.get("http://kumanxuan1.f3322.net:8001/shopping/restaurant/"+param);

//获取店铺食品列表API
export const storeFoodListApi = param => request.get("http://kumanxuan1.f3322.net:8001/shopping/v2/menu",{params:param})

//获取评分API
export const foodStartApi = param => request.get(`http://kumanxuan1.f3322.net:8001/ugc/v2/restaurants/${param}`)
//获取评论列表
export const commentListApi = ({url,option}) => request.get(`http://kumanxuan1.f3322.net:8001/ugc/v2/restaurants/${url}`,{params:option})

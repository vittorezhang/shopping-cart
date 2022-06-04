import request from "./request"

//请求位置数据
export const locationApi = param => { return request.get("http://kumanxuan1.f3322.net:8001/v2/pois/" + param) };
//请求食品分类列表数据
export const foodListApi = param => { return request.get("http://kumanxuan1.f3322.net:8001/v2/index_entry" + param) };
//请求商铺列表数据
export const shopListApi = param => { return request.get("http://kumanxuan1.f3322.net:8001/shopping/restaurants", { params: param }) };
//请求餐馆详情数据
export const shopImformationApi = param => { return request.get("http://kumanxuan1.f3322.net:8001/shopping/restaurant/" + param.shopid) };
//请求商家的食品列表数据
export const GoodsImformationApi = param => { return request.get("http://kumanxuan1.f3322.net:8001/shopping/v2/menu", { params: param }) };
//请求评价分数数据
export const EvaluateApi = param => { return request.get(`http://kumanxuan1.f3322.net:8001/ugc/v2/restaurants/${param.restaurant_id}/ratings/scores`) };
//请求评价分类数据
export const EvaluateCategoryApi = param => { return request.get(`http://kumanxuan1.f3322.net:8001/ugc/v2/restaurants/${param.restaurant_id}/ratings/tags`) };
//请求评价信息列表数据
export const CommentListApi = param => { return request.get(`http://kumanxuan1.f3322.net:8001/ugc/v2/restaurants/${param.restaurant_id}/ratings`, { params: { offset: param.offset, limit: param.limit } }) };
import request from "./request";
//获取店铺详情
export const getStoreDetail = (params) => request.get('http://kumanxuan1.f3322.net:8001/shopping/restaurant/' + params);

//获取食品列表
export const getFoodList = (params) => request.get('http://kumanxuan1.f3322.net:8001/shopping/v2/menu',params);

//获取评价分数
export const getScores = (params) => request.get('http://kumanxuan1.f3322.net:8001/ugc/v2/restaurants/'+params+'/ratings/scores');

//获取评价分类
export const getCategory = (params) => request.get('http://kumanxuan1.f3322.net:8001/ugc/v2/restaurants/'+params+'/ratings/tags');

//获取评价信息
export const getComments = (id,params) => request.get('http://kumanxuan1.f3322.net:8001/ugc/v2/restaurants/'+ id +'/ratings',{params});


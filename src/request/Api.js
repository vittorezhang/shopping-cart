import request from './request.js';
const pre = "/api";
// 地址
export const getAddress = data =>request.get(pre + "/v2/pois/"+ data.geohash);
// 分类列表
export const getList = data =>request.get(pre + "/v2/index_entry");

// 获取附近商品
export const getGoods = data =>request.get(pre+"/shopping/restaurants",{params:data});

// 获取商家信息
export const getStore = data =>request.get(pre + "/shopping/restaurant/"+ data.shopid);

// 获取商家的商品信息
export const getGoodsInfo = data =>request.get(pre + "/shopping/v2/menu",{params:data});

// 获取评价信息
export const getEvaluate= data =>request.get(pre +`/ugc/v2/restaurants/${data.restaurant_id}/ratings/scores`);

// 获取评价分类
export const getComment =data => request.get(pre +`/ugc/v2/restaurants/${data.restaurant_id}/ratings/tags`)

// 获取评论列表
export const getCommentList =data => request.get(pre +`/ugc/v2/restaurants/${data.restaurant_id}/ratings`,{params:{offset:data.offset,limit:data.limit}})

export const get1 = data => request.get('/api/shopping/v2/menu',{params:data});

export const get2 = data =>request.get("/api/v2" + "/index_entry");
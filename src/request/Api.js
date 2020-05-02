import request from './request.js';

const API = "http://kumanxuan1.f3322.net:8001/v2";
const goodsAPi = "http://kumanxuan1.f3322.net:8001/shopping";
// 地址
export const getAddress = data =>request.get(API + "/pois/"+ data.geohash);
// 分类列表
export const getList = data =>request.get(API + "/index_entry");

// 获取附近商品
export const getGoods = data =>request.get(goodsAPi+"/restaurants",{params:data});
// 获取商家信息
export const getStore = data =>request.get(goodsAPi + "/restaurant/"+ data.shopid);

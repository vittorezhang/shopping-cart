// 引入封装后的axios
import {instance} from "./requse"

// 请求数据
// 获取地理位置
export const pois = params => instance.get("http://kumanxuan1.f3322.net:8001/v2/pois/"+params)
// 获取美食的数据
export const entryList = params => instance.get("http://kumanxuan1.f3322.net:8001/v2/index_entry"+params)

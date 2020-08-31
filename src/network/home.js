// 每个页面路由都在这里进行统一设置，方便后期维护
import { request } from "./request"

// 首页轮播图和推荐的信息请求路由
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 商品请求，包括流行、新品、精选三个模块，数据各不相同，页数也是动态变化的，所以参数无法确定，需要用到的时候传递
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
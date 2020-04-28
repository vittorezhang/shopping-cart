import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import("../views/homePage/homePage.vue"),
    
  },
  {
    path: '/home',
    component: () => import("../views/homePage/homePage.vue"),
  },
  {
    path: '/search',
    component: () => import("../views/search/search.vue"),
  },
  {
    path: '/order',
    component: () => import("../views/order/order.vue"),
  },
  {
    path: '/user',
    component: () => import("../views/user/user.vue"),
  },
  {
    path: '/detail',
    component: () => import("../views/homePage/homePage.vue"),

  }

]

const router = new VueRouter({
  routes
})

export default router

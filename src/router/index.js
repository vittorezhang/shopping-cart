import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/index"
  },
  {
    path: '/index',
    component: () => import("../views/index/index.vue"),

    children: [
      {
        path: '',
        component: () => import("../views/homePage/homePage.vue"),
      },
      {
        path: 'search',
        component: () => import("../views/search/search.vue"),
      },
      {
        path: 'order',
        component: () => import("../views/order/order.vue"),
      },
      {
        path: 'user',
        component: () => import("../views/user/user.vue"),
      },

    ],
  },

  {
    path: '/detail',
    component: () => import("../views/detail/detail.vue"),

  },

]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/home"
  },
  {
    path: '/home',
    component: () => import("../views/home/home.vue"),

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
  }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/home"
  },
  {
    path: "/home",
    component: () => import("../components/Goolecomp"),
    children: [
      {
        path: "",
        component: () => import("../components/homepage/Waimai"),
      },
      {
        path: "/search",
        component: () => import("../components/search/search"),
      },
      {
        path: "/order",
        component: () => import("../components/order/order"),
      },
      {
        path: "/user",
        component: () => import("../components/user/user"),
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

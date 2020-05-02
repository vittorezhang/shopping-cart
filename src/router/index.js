import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeApp',
    component: () => import(/* webpackChunkName: "Home" */ '../views/HomeApp.vue'),
    children:[
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
      }
    ]
  },
  {
    path: '/details/:shopid',
    name: 'Details',
    component: () => import(/* webpackChunkName: "Details" */ '../views/Details.vue'),
  },
  {
    path: '/ceshi/:shopid',
    name: 'ceshi',
    component: () => import(/* webpackChunkName: "ceshi" */ '../views/ceshi.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router

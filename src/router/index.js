import Vue from 'vue'
import VueRouter from 'vue-router';


Vue.use(VueRouter)

  const routes = [
    {
      path: '/index',
      component: () => import(/* webpackChunkName: "index" */ '../views/index/Index.vue')
    }
  
  ]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router

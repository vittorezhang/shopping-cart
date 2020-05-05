import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: "/",
      component:() => import(/* webpackChunkName: "home" */ '../views/home/HomePage.vue'),
      children:[
        {
          path: "/takeaway",
          component:() => import(/* webpackChunkName: "takeaway" */ '../views/takeaway/Takeaway.vue')
        },
        {
          path: "/search",
          component:() => import(/* webpackChunkName: "search" */ '../views/search/Search.vue')
        },
        {
          path: "/order",
          component:() => import(/* webpackChunkName: "order" */ '../views/order/Order.vue')
        },
        {
          path: "/me",
          component:() => import(/* webpackChunkName: "me" */ '../views/me/Me.vue')
        },
      ],
    },
        {
          path: "/detail/:ids",
          component:() => import(/* webpackChunkName: "detail" */ '../views/detail/Detail.vue'),
          children:[
            {
              path: "/productList",
              component:() => import(/* webpackChunkName: "productList" */ '../views/takeaway/productList/ProductList.vue')
            },
            {
              path: "/evaluation",
              component:() => import(/* webpackChunkName: "evaluation" */ '../views/takeaway/evaluation/Evaluation.vue')
            },
            
          ],
        },
]

const router = new VueRouter({
  // routes
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

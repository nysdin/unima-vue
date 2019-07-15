import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  console.log('ifNotAuthenticated')
  if(!store.getters['auth/isAuthenticated']){
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  console.log('ifAuthenticated')
  if(store.getters['auth/isAuthenticated']){
    next() 
    return 
  }
  next('/login')
}

const nextAuth = (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    ifAuthenticated(to, from, next)
  }else if(to.matched.some(record => record.meta.public)){
    next()
  }else{
    ifNotAuthenticated(to, from, next)
  }
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/sell',
      name: 'sell',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "sell" */ './views/Sell.vue')
    },
    {
      path: '/sell/:id/edit',
      name: 'sellEdit',
      meta: { public: true },
      component: () => import(/* webpackChunkName: "sellEdit" */ './views/SellEdit.vue')
    },
    {
      path: '/product/:id',
      name: 'productShow',
      meta: { public: true },
      component: () => import(/* webpackChunkName: "productShow" */ './views/ProductShow.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach')

  if(!store.getters['auth/init']){
    //初期表示なら認証チェックした後にフックを確率
    const unwatch = store.watch( (state, getters) => getters['auth/init'], () => {
      unwatch()
      nextAuth(to, from, next)
    })
  }else{
    nextAuth(to, from,next)
  }
})

export default router
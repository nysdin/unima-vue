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

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      beforeEnter: ifNotAuthenticated
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(store.getters['auth/isAuthenticated']){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})

export default router
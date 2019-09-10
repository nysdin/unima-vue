import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import Croppa from 'vue-croppa'
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-croppa/dist/vue-croppa.css'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.prototype.$stripe = Stripe('pk_test_GRAL4nR6T1zOJHJIN9YAwGsI003jSsSSud')

Vue.use(ElementUI)
Vue.use(Croppa)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

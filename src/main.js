import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import Croppa from 'vue-croppa'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-croppa/dist/vue-croppa.css'
import vuetify from './plugins/vuetify'
import './vee-validate'

Vue.config.productionTip = false

Vue.prototype.$stripe = Stripe(process.env.VUE_APP_STRIPE_PUBLIC_API_KEY)
Vue.use(ElementUI)
Vue.use(Croppa)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from '../router'
import store from '../store'
import './registerServiceWorker'
import '@/assets/js/directive'
import * as filters from '@/assets/js/filters'
import { remInit } from '@/assets/js/util'
import '@/assets/stylus/index.styl'

Vue.config.productionTip = false
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
remInit()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

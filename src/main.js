import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fetch from '@/api'
//点击延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

Object.defineProperty(Vue.prototype, '$fetch', { value: fetch })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

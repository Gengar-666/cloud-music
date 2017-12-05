import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fetch from '@/api'
//点击延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

//监听移动端触摸事件组件
var VueTouch = require('vue-touch')
Vue.use(VueTouch)

import VueLazyLoad from 'vue-lazyload'

//懒加载的默认图片 
import lazyLoadingImg from '../static/img/loading.gif'
//使用懒加载组件
Vue.use(VueLazyLoad,{
  loading: lazyLoadingImg
})

Object.defineProperty(Vue.prototype, '$fetch', { value: fetch })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

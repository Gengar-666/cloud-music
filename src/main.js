import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fetch from '@/api'
import * as types from '@/store/types'

//监听移动端触摸事件组件
var VueTouch = require('vue-touch')
Vue.use(VueTouch)

//图片懒加载
import VueLazyLoad from 'vue-lazyload'

//懒加载的默认图片 
import lazyLoadingImg from '../static/img/loading.gif'
//使用懒加载组件
Vue.use(VueLazyLoad,{
  loading: lazyLoadingImg
})

//api请求
Object.defineProperty(Vue.prototype, '$fetch', { value: fetch })

//mutations_types
Object.defineProperty(Vue.prototype, '$types', { value: types })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

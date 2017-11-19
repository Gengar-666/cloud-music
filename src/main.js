import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { Swipe, SwipeItem } from 'vue-swipe'

//设置全局请求Api
global.API = 'https://bird.ioliu.cn/v1?url=http://118.89.226.181:8080/api'
global.KEYWORD = ''
global.MUSIC_ID = '531925'
store.dispatch('get_musicUrl');

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import songSheetList from '@/components/songSheetList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/songSheetList/:detailId',
      name: 'songSheetList',
      component: songSheetList
    }
  ]
})

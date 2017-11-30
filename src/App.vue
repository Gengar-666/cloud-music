<template>
  <div id="app">
     <drawer :show="menuShow" :pos="pos" :tran="tran">
          <div class="layout" slot="drawer">
            <h2>
              <a href="#">bajian drawer</a>
            </h2>
            <ul>
              <li v-for="(item, index) in navItems" :key="index">
                <a :href="'#'+item">{{item}}</a>
              </li>
            </ul>
          </div>
            <transition :name="transitionName">
            <router-view class="view"></router-view>
          </transition> 
            <!-- 公用组件  -->
           <bubble></bubble>
          <playbar></playbar>
          <loading v-model="isLoading"></loading>
          <div v-transfer-dom>
            <alert v-model="alertShow" title="提示" @on-hide="onHide"> {{ '网络好像不太给力，刷新页面试试~' }}</alert>
          </div>   
        </drawer> 
  </div>
</template>

<script>
import bubble from '@/components/Bubble'
import playbar from '@/components/Playbar'
import drawer from './components/drawer.vue'
import { mapGetters } from 'vuex';
import { Loading, Alert, TransferDomDirective as TransferDom } from 'vux'
export default {
  name: 'app',
  data: () => ({
    pos: 'left',
    tran: 'push',
    navItems: [
      'decide the width u like',
      'Item2',
      'Item3',
      'Item4',
      'Item5'
    ]
  }),
  directives: {
    TransferDom
  },
  computed: {
    ...mapGetters([
      // 过渡效果
      'transitionName',
      // 加载状态是否显示
      'isLoading',
      // 网络错误弹窗是否显示
      'alertShow',
      // 左侧菜单是否显示
      'menuShow'
    ]),
  },
  mounted() {
    this.$store.dispatch('get_musicDetail', 405612296)
    this.$fetch.MusicUrl(405612296).then(res => {
      this.$store.dispatch('get_audioUrl', res.data[0])
      this.$store.dispatch('add_ListenLists', res.data[0])
    })
  },
  methods: {
    onHide() {
      this.$store.state.alertShow = false
      this.$route.path !== '/recommend' && this.$route.path !== '/search' && this.$route.path !== '/login' ? this.$router.go(-1) : ''
    },
    drawerToggle() {
      this.drawerShow = !this.drawerShow
    }
  },
  components: {
    bubble,
    playbar,
    Loading,
    Alert,
    drawer
  }
}
</script>

<style>
*{
    margin: 0px;
    padding: 0px;
  }
  html {
    height: 100%;
    overflow: hidden;
  }

  body {
    height: 100%;
  }

  #app {
    color: #2c3e50;
    height: 100%;
    width: 100%;
    font-family: Source Sans Pro, Helvetica, sans-serif;
  }

@font-face {
  font-family: 'vux-demo';
  /* project id 70323 */
  src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot');
  src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix') format('embedded-opentype'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff') format('woff'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf') format('truetype'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont') format('svg');
}


/* 取消a标签在移动端点击时的蓝色 */

a {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #FFF;
}


/*app页面切换效果*/

.view {
  position: absolute;
  width: 100vw;
  overflow-y: auto;
  transition: all 0.8s cubic-bezier(.5, 0, .1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100vw, 0);
  transform: translate(100vw, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100vw, 0);
  transform: translate(-100vw, 0);
}

.layout {
  width: 300px;
}
</style>

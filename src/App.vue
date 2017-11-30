<template>
  <div id="app">
     <drawer :show="sidebarShow" :pos="pos" :tran="tran" @change-show="changeDrawerShow">
          <div class="sidebar" slot="drawer">
            <sidebar></sidebar>
          </div>
            <transition :name="transitionName">
            <router-view class="view"></router-view>
          </transition> 
          <!-- 公用组件  -->
          <bubble></bubble>
          <playbar></playbar>
          <loading v-model="isLoading"></loading>
          <div v-transfer-dom>
            <alert v-model="alertStatus.alertStatus" title="提示" @on-hide="onHide"> {{ alertText }}</alert>
          </div>
          <div v-transfer-dom>
            <confirm v-model="confirmStatus.confirmStatus" title="提示" @on-cancel="onCancel" @on-confirm="onConfirm">
              <p style="text-align:center;">你还未登录，赶紧去登录吧~</p>
            </confirm>
          </div>
        </drawer> 
  </div>
</template>

<script>
import bubble from '@/components/Bubble'
import playbar from '@/components/Playbar'
import drawer from '@/components/drawer.vue'
import sidebar from '@/components/Sidebar'
import { mapGetters } from 'vuex';
import { Loading, Alert, Confirm, TransferDomDirective as TransferDom } from 'vux'
export default {
  name: 'app',
  data: () => ({
    // 侧边栏方向
    pos: 'left',
    // 过渡效果类型
    tran: 'push'
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
      // 弹窗提示是否显示
      'alertStatus',
      // 弹窗提示内容
      'alertText',
      // confirm弹窗是否显示
      'confirmStatus',
      // 左侧菜单是否显示
      'sidebarShow'
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
    // 网络错误弹窗确定按钮判断是否后退
    onHide() {
      this.$store.commit('set_alertStatus', false)
    },
    // 登录或登录弹窗
    onCancel() {
      this.show = false
      this.$router.go(-1)
    },
    onConfirm() {
      this.show = false
      this.$router.push('/login')
    },
    // 显示侧边栏
    drawerToggle() {
      this.drawerShow = !this.drawerShow
    },
    // 点击遮罩层关闭侧边栏
    changeDrawerShow(state) {
      this.$store.state.sidebarShow = state
    }
  },
  components: {
    bubble,
    playbar,
    Loading,
    Alert,
    Confirm,
    drawer,
    sidebar
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

.sidebar {
  width: 45vw;
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
</style>

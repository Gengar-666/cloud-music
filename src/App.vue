<template>
  <div id="app">
    <div v-transfer-dom>
      <alert v-model="alertShow" title="提示" @on-hide="onHide"> {{ '网络好像不太给力，刷新页面试试~' }}</alert>
    </div>
    <div class="contianer">
      <transition :name="transitionName">
        <router-view class="view"></router-view>
      </transition>
    </div>
    <!-- 公用组件 -->
    <bubble></bubble>
    <playbar></playbar>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import bubble from '@/components/Bubble'
import playbar from '@/components/Playbar'
import { mapGetters } from 'vuex';
import { Loading, Alert, TransferDomDirective as TransferDom } from 'vux'
export default {
  name: 'app',
  data: () => ({
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
      'alertShow'
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
    onHide () {
      this.$store.state.alertShow = false
      this.$route.path !== '/recommend' && this.$route.path !== '/search' && this.$route.path !== '/login' ? this.$router.go(-1) : ''
    }
  },
  components: {
    bubble,
    playbar,
    Loading,
    Alert
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

html {
  overflow-x: hidden;
}

body {
  width: 100vw;
  width: 100vh;
  background: #FFF;
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
</style>

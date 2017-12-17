<template>
  <div id="app">
    <commen>
      <keep-alive>
        <router-view class="view"></router-view>
      </keep-alive>
    </commen>
  </div>
</template>

<script>
// 公用组件
import commen from '@/components/Commen'
export default {
  name: 'app',
  data: () => ({
  }),
  mounted() {
    // 路由里有歌曲id参数就播放此歌曲
    setTimeout(() => {
      if (this.$route.query.id) {
        this.$store.dispatch('handleClickMusic', this.$route.query.id)
      } else if (this.$store.state.listenLists.length > 1) {
        // 随机播放试听列表
        let id = null
        let length = this.$store.state.listenLists.length
        for (let i = length - 1; i > 0; i--) {
          id = this.$store.state.listenLists[Math.floor(Math.random() * (i - 0 + 1) + 0)].id
          break
        }
        this.$store.dispatch('handleClickMusic', id)
      } else {
        // 默认播放歌曲
        this.$store.dispatch('handleClickMusic', 441491828)
      }
    }, 500)
  },
  components: { commen }
}
</script>

<style lang="less">
* {
  margin: 0px;
  padding: 0px;
}

html {
  height: 100%;
  overflow: hidden;
}

body {
  height: 100%;
  background: #FFF;
}

@font-face {
  font-family: 'iconfont';
  /* project id 505314 */
  src: url('https://at.alicdn.com/t/font_505314_0iosjgx5nmefusor.eot');
  src: url('https://at.alicdn.com/t/font_505314_0iosjgx5nmefusor.eot?#iefix') format('embedded-opentype'),
  url('https://at.alicdn.com/t/font_505314_0iosjgx5nmefusor.woff') format('woff'),
  url('https://at.alicdn.com/t/font_505314_0iosjgx5nmefusor.ttf') format('truetype'),
  url('https://at.alicdn.com/t/font_505314_0iosjgx5nmefusor.svg#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}




/* 取消a标签在移动端点击时的蓝色 */

a {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
}

#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  max-width: 500px;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  font-family: "Microsoft YaHei";
}



/*app页面切换效果*/

.view {
  position: absolute;
  width: 100%;
  overflow-y: auto;
  transition: all 0.5s cubic-bezier(.5, 0, .1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(300px, 0);
  transform: translate(300px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-300px, 0);
  transform: translate(-300px, 0);
}
</style>

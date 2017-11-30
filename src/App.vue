<template>
  <div id="app">
    <commen>
      <router-view class="view"></router-view>
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
  max-width: 450px;
  max-height: 800px;
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
  transition: all 0.8s cubic-bezier(.5, 0, .1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}
</style>

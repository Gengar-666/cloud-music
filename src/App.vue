<template>
  <div id="app">
    <music></music>
    <router-view></router-view>
     <playList></playList> 
  </div>
</template>

<script>
import music from './components/music'
import playList from './components/playList'
export default {
  name: 'app',
  components:{music,playList}
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

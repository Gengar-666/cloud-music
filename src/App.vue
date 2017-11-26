<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <div class="contianer">
      <transition :name="transitionName">
        <router-view class="view"></router-view>
      </transition>
    </div>
    <v-playbar />
  </div>
</template>

<script>
import playBar from '@/components/PlayBar'
import { mapState, mapMutations } from 'vuex';
import { Loading } from 'vux'
export default {
  name: 'app',
  computed: {
    ...mapState([
      // 过渡效果
      'transitionName',
      'isLoading'
    ]),
  },
  mounted() {
    // this.$store.dispatch('get_musicDetail', 451169473)
    // this.$fetch.MusicUrl(451169473).then(res => {
    //   this.$store.dispatch('get_audioUrl', res.data[0])
    //   this.$store.dispatch('add_ListenLists', res.data[0])
    // })
  },
  components: {
    'v-playbar': playBar,
    Loading
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

html {
  overflow: hidden;
}

body {
  width: 100vw;
  width: 100vh;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}



/*app页面切换效果*/

.view {
  position: absolute;
  width: 100%;
  transition: all 0.8s cubic-bezier(.55, 0, .1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(150px, 0);
  transform: translate(150px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-150px, 0);
  transform: translate(-150px, 0);
}
</style>

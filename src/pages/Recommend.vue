<template>
  <div id="recommend">
    <banner></banner>
    <song-sheet></song-sheet>
    <music-list isNewSong :musicList="newMusicList" title="最新音乐"></music-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'recommend',
  data: () => ({
  }),
  mounted() {
    this.get_newSongsList()
  },
  computed: {
    ...mapGetters(['newMusicList'])
  },
  methods: {
    ...mapActions(['get_newSongsList'])
  },
  components: {
    banner: resolve => {
      require(['@/components/Banner'], resolve)
    },
    songSheet: resolve => {
      require(['@/components/Songsheet'], resolve)
    },
    musicList: resolve => {
      require(['@/components/MusicList'], resolve)
    }
  }
}
</script>

<style lang="less" scoped>
#recommend {}
</style>
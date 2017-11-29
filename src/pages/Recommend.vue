<template>
  <div id="recommend">
    <banner></banner>
    <song-sheet></song-sheet>
    <music-list isNewSong :musicList="musicList" title="最新音乐"></music-list>
  </div>
</template>

<script>
import banner from '@/components/Banner'
import songSheet from '@/components/Songsheet'
import musicList from '@/components/MusicList'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'recommend',
  data: () => ({
  }),
  mounted() {
    this.get_newSongsList()
  },
  computed: {
    ...mapGetters(['musicList'])
  },
  methods: {
    ...mapActions(['get_newSongsList'])
  },
  components: {
    banner,
    songSheet,
    musicList
  }
}
</script>

<style lang="less" scoped>
#recommend {}
</style>
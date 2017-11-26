<template>
  <div id="recommend">
    <v-banner />
    <v-song-sheet />
    <v-music-list isNewSong :musicList="musicList" title="最新音乐" />
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import SongSheet from '@/components/Songsheet'
import MusicList from '@/components/MusicList'
import { mapState } from 'vuex'
export default {
  name: 'recommend',
  data: () => ({
  }),
  mounted() {
    this.$store.dispatch('get_newSongsList')
  },
  computed: {
    ...mapState({
      musicList: state => state.musicList
    })
  },
  components: {
    'v-banner': Banner,
    'v-song-sheet': SongSheet,
    'v-music-list': MusicList
  }
}
</script>

<style scoped>
#recommend {
  height: 85vh;
  overflow: auto;
}
</style>

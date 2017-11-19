<template>
  <div class="newSongs">
    <div class="tag">
      <img :src="tag" alt="">
      </div>
      <p class="title">{{ title }}</p>
      <div class="remd_newsg">
        <div class="m-sglst" v-for="sgItem in newSongsList">
          <div class="m-sg-item">
            <div class="sg-btn" @click="getId(sgItem.song.id)">
              <div sg-left>
                <div class="sg-title">{{ sgItem.name }}</div>
                <div class="sg-singer">{{ sgItem.song.artists[0].name }}</div>
              </div>
              <div class="sg-play" :style="{ backgroundImage: 'url(' + img + ')' }">
                <span class="play-icon"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import tag from './../../static/img/tag5.jpg'
import img from './../../static/img/sprites.png'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      title: '最新音乐',
      tag,
      img
    }
  },
  created() {
    this.$store.dispatch('get_newSongsList')
  },
  computed: {
    ...mapState({
      newSongsList: state => state.newSongsList
    })
  },
  methods: {
    getId(id) {
      // 获取歌曲Url
      MUSIC_ID = id;
      this.$store.dispatch('get_musicUrl')
    }

  }
}
</script>

<style scoped>
.newSongs {
  margin-bottom: 60px;
  position: relative;
}

.newSongs .tag {
  position: absolute;
  top: -0.5rem;
}

.newSongs img {
  width: 50px;
}

.title {
  width: 68px;
  text-align: center;
  padding: 5px 0 5px 0;
  color: #666;
  font-size: 15px;
  margin-left: 3rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}

.remd_newsg {
  position: relative;
}

.m-sglst {
  margin-left: 10px;
  padding-bottom: 5px;
  padding-top: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.m-sg-item {
  text-decoration: none;
  color: #000;
  display: flex;
}

.sg-btn {
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  display: -webkit-box;
  display: flex;
  position: relative;
  padding-top: 6px;
}

.sg-left {
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  padding: 6px 0;
  width: 0;
}

.sg-play {
  background-position: 0px -265px;
  position: absolute;
  right: 10px;
  width: 40px;
  height: 40px;
  background-size: 250px;
  background-repeat: no-repeat;
}

.sg-singer {
  color: #888;
  font-size: 13px;
  margin-top: 5px;
}
</style>
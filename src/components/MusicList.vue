<template>
  <div id="music-list">
    <div v-show="isNewSong">
      <div class="tag">
      </div>
      <p class="title">{{ title }}</p>
    </div>
    <div class="remd_newsg">
      <div class="m-sglst" v-for="(item, index) in musicList" :key="index">
        <div class="m-sg-item">
          <div class="sg-btn" @click="handleClick(item.song.id)">
            <div class="pic">
              <img :src="item.song.album.blurPicUrl" alt="">
            </div>
            <div sg-left>
              <div class="sg-title">{{ item.name }}</div>
              <div class="sg-singer">{{ item.song.artists[0].name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    isNewSong: Boolean,
    title: String,
    musicList: Array
  },
  data: () => ({
  }),
  mounted() {
  },
  methods: {
    ...mapActions(['handleClickMusic']),
    handleClick(id) {
      // 点击歌曲之后的处理
      this.handleClickMusic(id)
    }
  }
}
</script>

<style lang="less" scoped>
#music-list {
  position: relative;
  .title {
    width: 68px;
    text-align: center;
    padding: 5px 0 5px 0;
    color: #666;
    font-size: 13px;
    margin-left: 1.5rem;
    margin-top: 21rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #ccc;
  }
  .remd_newsg {
    position: relative;
    .m-sglst {
      margin-left: 10px;
      padding-bottom: 5px;
      padding-top: 5px;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      .m-sg-item {
        text-decoration: none;
        color: #000;
        display: flex;
        padding-left: 10px;
        font-size: 14px;
        .sg-btn {
          -webkit-box-flex: 1;
          flex: 1 1 auto;
          display: -webkit-box;
          display: flex;
          position: relative;
          padding-top: 6px;
          .pic {
            img {
              width: 50px;
              height: 50px;
              margin-right: 20px;
            }
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
            font-size: 12px;
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div id="rank-detail" v-if="rankDetail.length !== 0">
    <div class="list-header" :style="{ backgroundImage: 'url(' + rankDetail.coverImgUrl + ')' }">
    </div>
    <div class="list-wrap">
      <div class="list-img">
        <img :src="rankDetail.coverImgUrl" alt="">
      </div>
      <div class="list-content">
        <p>{{ rankDetail.name }}</p>
        <div class="list-author">
          <img :src="rankDetail.avatarUrl" class="headPortrait" alt="">
          <span>{{ rankDetail.nickname }}</span>
        </div>
      </div>
    </div>
    <div class="list-intro">
      <div class="intro-bottom">
        简介：{{ rankDetail.description }}
      </div>
    </div>
    <div class="paly-list">
      <p>歌曲列表</p>
      <div class="sg_list">
        <music-list :musicList="rankDetail"></music-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'rankDetail',
  data: () => ({
  }),
  computed: {
    ...mapGetters([
      // 排行榜歌单详情
      'rankDetail'
    ])
  },
  mounted() {
    this.get_MusicRankDetail(this.$route.query.idx)
  },
  methods: {
    ...mapActions(['get_MusicRankDetail'])
  },
  components: {
    musicList: resolve => {
      require(['@/components/MusicList'], resolve)
    }
  }
}
</script>

<style lang="less" scoped>
#rank-detail {
  overflow: hidden;
  background-color: #f8f8f8;
  .list-header {
    height: 55px;
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 20px;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(20px);
    transform: scale(1.5);
    z-index: 1
  }
  .list-wrap {
    position: relative;
    top: -90px;
    left: 20px;
    z-index: 2;
    .list-img {
      width: 35%;
      img {
        width: 100%;
      }
    }
    .list-content {
      color: #FFF;
      width: 50%;
      position: absolute;
      top: 20px;
      right: 30px;
      font-size: 14px;
      .list-author {
        margin-top: 30px;
        position: relative;
        img {
          width: 2rem;
          border-radius: 50%;
          margin-top: 10px;
        }
        span {
          position: absolute;
          top: 20px;
          margin-left: 6px;
          font-size: 13px;
        }
      }
    }
  }
  .list-intro {
    margin-top: -60px;
    padding-bottom: 20px;
    .intro-tags {
      span {
        font-size: 12px;
        display: inline-block;
        margin-right: 10px;
        padding: 1px 8px;
      }
    }
    .intro-bottom {
      margin-left: 20px;
      font-size: 13px;
      color: #666;
      margin-top: 10px;
      position: relative;
      line-height: 20px;
      max-height: 60px;
      overflow: hidden;
    }
    .intro-bottom::after {
      content: "...";
      position: absolute;
      bottom: 0;
      right: 0;
      padding-left: 40px;
      background: -webkit-linear-gradient(left, transparent, #fff 55%);
      background: -o-linear-gradient(right, transparent, #fff 55%);
      background: -moz-linear-gradient(right, transparent, #fff 55%);
      background: linear-gradient(to right, transparent, #fff 55%);
    }
  }
  .paly-list {
    p {
      padding-left: 20px;
      padding-top: 2px;
      padding-bottom: 2px;
      font-size: 13px;
      color: #666;
      background: #eeeff0;
    }
    .sg_list {
      height: 50vh;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
    }
  }
}
</style>
<template>
  <div id="user">
    <div v-transfer-dom>
    </div>
    <div v-show="user.code == 200">
      <div class="user-wrap" :style="'background-image: url(' + userDetail.profile.backgroundUrl + ')'">
        <div class="user-content">
          <div class="user-top">
            <div class="user-fl">
              <p class="num">{{ userDetail.listenSongs }}</p>
              <p class="listen-num">听歌数</p>
            </div>
            <div class="avatar" :style="'background-image: url(' + userDetail.profile.avatarUrl + ')'"></div>
            <div class="user-fr">
              <p class="num">{{ userDetail.profile.followeds }}</p>
              <p class="followeds">粉丝数</p>
            </div>
          </div>
          <div class="user-bottom">
            <p>{{ userDetail.profile.nickname }}</p>
          </div>
        </div>
      </div>
      <div class="user-playlist">
        <div class="title">歌单{{ userPlayList.playlist.length }}</div>
        <div class="playlist">
          <v-touch class="playlist-item" v-for="(item, index) in userPlayList.playlist" :key="index" v-on:tap="toDetail(item.id)" v-on:press="toDetail(item.id)">
            <img :src="item.coverImgUrl" alt="">
            <div class="text-content">
              <p>{{ item.name }}</p>
              <p class="text">{{ item.trackCount }}首，by{{ item.creator.nickname }}，播放{{ item.playCount }}次</p>
            </div>
          </v-touch>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Confirm, TransferDomDirective as TransferDom } from 'vux'
export default {
  name: 'user',
  data: () => ({
  }),
  directives: {
    TransferDom
  },
  computed: {
    ...mapGetters([
      'user',
      'userDetail',
      'userPlayList'
    ])
  },
  mounted() {
    if (this.user.code == 200) {
      console.log(this.user)
      this.$fetch.UserDetail(this.user.profile.userId).then(res => {
        this.$store.state.userDetail = res
        localStorage.setItem('userDetail', JSON.stringify(res))
      })
      this.$fetch.UserPlaylist(this.user.profile.userId).then(res => {
        this.$store.state.userPlayList = res
        localStorage.setItem('userPlayList', JSON.stringify(res))
      })
    } else {
      this.$store.state.confirmText = 'login'
      this.$store.commit('set_confirmStatus', true)
    }
  },
  methods: {
    toDetail(id) {
      this.$router.push({ name: 'songsheetDetail', query: { id } })
    }
  },
  components: {
    Confirm
  }
}
</script>

<style lang="less" scoped>
#user {
  margin-top: 10px;
  .user-wrap {
    position: relative;
    height: 210px;
    background-size: cover;
    background-position: 50%;
    .user-content {
      height: 100px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      z-index: 2;
      .user-top {
        overflow: hidden;
        display: flex;
        align-items: center;
        .user-fl {
          
          width: 20%;
          color: #FFF;
          float: left;
          text-align: right;
          .listen-num {
            font-size: 12px;
            color: hsla(0, 0%, 100%, .6);
          }
        }
        .user-fr {
          width: 20%;
          color: #FFF;
          float: right;
          .num {
            text-indent: 13px;
          }
          .followeds {
            font-size: 12px;
            color: hsla(0, 0%, 100%, .6);
          }
        }
        .avatar {
          width: 80px;
          height: 80px;
          background-size: cover;
          border-radius: 100px;
          margin: 0 auto;
        }
      }
      .user-bottom {
        color: #FFF;
        text-align: center;
        margin-top: 10px;
      }
    }
  }
  .user-wrap:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: url('./../../static/img/bg.png') repeat-x;
    background-size: contain;
  }
  .user-playlist {
    .title {
      background: #eeeff0;
      height: 28px;
      line-height: 28px;
      color: #666;
      font-size: 13px;
      padding-left: 10px;
    }
    .playlist {
      .playlist-item {
        display: flex;
        align-items: center;
        margin-left: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        font-size: 13px;
        font-weight: bold;
        img {
          width: 60px;
          height: 60px;
        }
        .text-content {
          margin-left: 10px;
        }
        .text {
          font-size: 12px;
          color: #666;
          font-weight: normal;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>

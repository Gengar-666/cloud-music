<template>
  <div id="sidebar">
    <div class="user-info" :style="'background-image: url(' + backgroundUrl + ')'">
      <div class="avatar" :style="'background-image: url(' + avatar + ')'"></div>
      <span class="nickname">{{ user.code == 200 ? userDetail.profile.nickname : '你还没有登录~' }}</span>
      <span class="level" v-show="user.code == 200">Lv.{{ userDetail.level }}</span>
      <div class="sign-in" v-show="user.code == 200" @click="disabled">
        <img src="./../../static/img/signIn.svg" alt="">
        <span>签到</span>
      </div>
    </div>
    <div class="cell-box">
      <group>
        <cell title="个人中心" @click.native="toUser" is-link>
           <img slot="icon" src="./../../static/img/application.svg" alt=""> 
        </cell>
        <cell title="设置" @click.native="disabled" is-link>
          <img slot="icon" src="./../../static/img/config.svg" alt="">
        </cell>
        <cell v-show="user.code == 200" title="退出" @click.native="sign_out" is-link>
          <img slot="icon" src="./../../static/img/signout.svg" alt="">
        </cell>
        <cell v-show="user.code !== 200" title="登录" @click.native="login" is-link>
          <img slot="icon" src="./../../static/img/login.svg" alt="">
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
import defaultAvatar from './../../static/img/defaultAvatar.jpg'
import { mapGetters } from 'vuex'
import { Cell, Group } from 'vux'
export default {
  name: 'sldebar',
  data: () => ({
  }),
  computed: {
    ...mapGetters([
      'user',
      'userDetail'
    ]),
    avatar() {
      if (this.user.code == 200) {
        return this.userDetail.profile.avatarUrl
      } else {
        return defaultAvatar
      }
    },
    backgroundUrl() {
      if (this.user.code == 200) {
        return this.userDetail.profile.backgroundUrl
      } else {
        return ''
      }
    }
  },
  components: {
    Cell,
    Group
  },
  methods: {
    toUser() {
      this.$router.push('/user')
    },
    disabled() {
      this.$store.state.alertText = '暂不可用，敬请期待~'
      this.$store.commit(this.$types.SET_ALERT_STATUS, true)
    },
    login() {
      this.$router.push('/login')
    },
    sign_out() {
      this.$store.state.confirmText = 'sign_out'
      this.$store.commit(this.$types.SET_CONFIRM_STATUS, true)
    }
  }
}
</script>

<style lang="less">
#sidebar {
  height: 100vh;
  .user-info {
    padding-top: 40px;
    padding-left: 20px;
    padding-bottom: 20px;
    background-size: cover;
    background: #000;
    .avatar {
      width: 80px;
      height: 80px;
      background-size: cover;
      border-radius: 50%;
      margin-bottom: 15px;
    }
    .nickname {
      margin-top: 10px;
      font-size: 15px;
      color: #FFF;
    }
    .level {
      font-size: 12px;
      color: #FFF;
      border: 1px solid #FFF;
      border-radius: 50px;
      padding-left: 6px;
      padding-right: 6px;
      margin-left: 5px;
    }
    .sign-in {
      position: absolute;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #FFF;
      border-radius: 50px;
      width: 60px;
      padding-left: 5px;
      padding-right: 10px;
      padding-top: 3px;
      padding-bottom: 3px;
      top: 132px;
      right: 15px;
      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
      span {
        font-size: 15px;
        color: #FFF;
      }
    }
  }
  .cell-box {
    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      margin-top: 5px;
    }
    .sub-item {
      color: #888;
    }
    .slide {
      padding: 0 20px;
      overflow: hidden;
      max-height: 0;
      transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
    }
    .animate {
      max-height: 9999px;
      transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
      transition-delay: 0s;
    }
    .weui-cells {
      font-size: 15px;
    }
  }
}
</style>

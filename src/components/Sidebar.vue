<template>
  <div id="sidebar">
    <div class="user-info">
      <div class="avatar" :style="'background-image: url(' + avatar + ')'"></div>
      <div class="nickname">{{ user.code == 200 ? userDetail.profile.nickname : '你还没有登录~' }}</div>
    </div>
    <div class="cell-box">
      <group>
        <cell title="个人中心" @click.native="toUser" is-link>
          <img slot="icon" src="./../../static/img/application.svg" alt="">
        </cell>
        <cell title="设置" @click.native="config" is-link>
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
    config() {
      this.$store.state.alertText = '开发中，敬请期待~'
      this.$store.commit('set_alertStatus', true)
    },
    login() {
      this.$router.push('/login')
    },
    sign_out() {
      this.$store.state.confirmText = 'sign_out'
      this.$store.commit('set_confirmStatus', true)
    }
  }
}
</script>

<style lang="less">
#sidebar {
  background: #eeeff0;
  height: 100vh;
  .user-info {
    padding-top: 50px;
    .avatar {
      width: 80px;
      height: 80px;
      background-size: cover;
      border-radius: 50%;
      margin: 0 auto;
    }
    .nickname {
      text-align: center;
      margin-top: 10px;
      font-size: 15px;
      color: #333;
      font-weight: bold;
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
      background: #eeeff0;
      font-size: 15px;
    }
  }
}
</style>

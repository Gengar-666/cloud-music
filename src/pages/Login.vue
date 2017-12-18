<template>
  <div id="login">
    <div class="content">
      <img ref="img" src="./../../static/img/loginbg.jpg" alt="">
      <div class="form">
        <div class="phone">
          <input type="text" placeholder="手机号码" v-model="phone">
        </div>
        <div class="pwd">
          <input type="password" placeholder="密码" v-model="password">
        </div>
        <div class="login-btn">
          <button type="button" @click="login">登录</button>
        </div>
      </div>
      <div class="pass">
        <div class="remember-pwd">
          <x-switch style="display: flex; align-items: center;" title='记住密码：' :value-map="['0', '1']" v-model="value"></x-switch>
        </div>
        <v-touch v-on:tap="pass" v-on:press="pass">
          <div class="btn">
            <span>跳过登录</span>
            <img src="./../../static/img/pass.svg" alt="">
          </div>
        </v-touch>
      </div>
    </div>
  </div>
</template>

<script>
import { XSwitch } from 'vux'
export default {
  name: 'login',
  data: () => ({
    btnIsActive: false,
    phone: '',
    password: '',
    value: '1'
  }),
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo) {
      this.phone = userInfo.phone
      this.password = userInfo.password
    }
  },
  methods: {
    login() {
      console.log(1)
      const para = {
        phone: this.phone,
        password: this.password
      }
      this.$fetch.Login(para).then(res => {
        // 是否记住密码
        if (this.value == '1') {
          localStorage.setItem('userInfo', JSON.stringify(para))
        } else {
          localStorage.removeItem('userInfo')
        }
        this.$store.state.user = res
        localStorage.setItem('user', JSON.stringify(res))
        this.$router.push('/user')
      })
    },
    pass() {
      this.$router.push('/recommend')
    }
  },
  components: {
    XSwitch
  }
}
</script>

<style lang="less">
#login {
  height: 80vh;
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  .content {
    width: 100%;
    position: relative;
    img {
      width: 130px;
      height: 130px;
      display: block;
      margin: 0 auto;
    }
    .form {
      width: 85%;
      padding-top: 1px;
      position: absolute;
      z-index: 10;
      left: 0;
      right: 0;
      margin: auto;
      top: 160px;
      background: transparent;
      .phone {
        width: 100%;
        height: 45px;
        border: 1px solid #CCC;
        border-radius: 6px;
        box-shadow: 0 3px 9px #CCC, inset 0 0 9px #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .pwd {
        width: 100%;
        height: 45px;
        border: 1px solid transparent;
        border-radius: 50px;
        border: 1px solid #CCC;
        border-radius: 6px;
        box-shadow: 0 3px 9px #CCC, inset 0 0 9px #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      }
      input {
        width: 90%;
        height: 40px;
        border: none;
        outline: none;
        font-size: 15px;
        text-align: center;
        background: transparent;
        color: #666;
      }
    }
  }
  .pass {
    width: 85%;
    margin: 230px auto;
    overflow: hidden;
    padding-top: 1px;
    padding-bottom: 5px;
    .remember-pwd {
      width: 120px;
      position: absolute;
      font-size: 13px;
      .weui-label {
        width: 65px !important;
      }
      .weui-switch,
      .weui-switch-cp__box {
        width: 40px;
        height: 20px;
      }
      .weui-switch:before,
      .weui-switch-cp__box:before {
        width: 18px;
        height: 18px;
      }
      .weui-switch:after,
      .weui-switch-cp__box:after {
        width: 18px;
        height: 18px;
      }
    }
    .btn {
      float: right;
      width: 115px;
      height: 26px;
      position: relative;
      display: flex;
      align-items: center;
      border: 1px solid #CCC;
      border-radius: 50px;
      box-shadow: 0 3px 3px #CCC, inset 0 0 9px #FFF;
      padding-top: 5px;
      padding-bottom: 5px;
    }
    span {
      position: absolute;
      right: 45px;
      color: #666;
      font-size: 13px;
    }
    img {
      position: absolute;
      top: 3px;
      right: 10px;
      width: 30px;
      height: 30px;
    }
  }
   ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #666;
  }
   :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #666;
  }
   ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #666;
  }
   :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #666;
  }
}

.login-btn {
  position: relative;
  margin-top: 20px;
}

button {
  width: 100%;
  height: 46px;
  font-family: 'Hind Guntur', sans-serif;
  font-size: 15px;
  color: #fff;
  letter-spacing: 0.025em;
  position: absolute;
  background: -webkit-linear-gradient(left, #2A78DC, #CCC);
  background: -moz-linear-gradient(left, #2A78DC, #CCC);
  background: -o-linear-gradient(left, #2A78DC, #CCC);
  background: linear-gradient(to right, #2A78DC, #CCC);
  cursor: pointer;
  border: 0;
  border-radius: 6px;
  min-width: 120px;
  overflow: hidden;
}

.weui-switch:checked,
.weui-switch-cp__input:checked~.weui-switch-cp__box {
  border-color: #2A78DC !important;
  background-color: #2A78DC !important;
}
</style>
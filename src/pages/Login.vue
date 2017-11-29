<template>
  <div id="login">
    <div class="content">
      <img src="./../../static/img/loginbg.jpg" alt="">
      <div class="form">
        <div class="phone">
          <input type="text" placeholder="手机号码" v-model="phone">
        </div>
        <div class="pwd">
          <input type="password" placeholder="密码" v-model="password">
        </div>
        <div class="login-btn">
          <button type="button" :class="{'button-active': btnIsActive}" @click="login">
            <span>登录</span>
          </button>
        </div>
      </div>
      <div class="pass">
        <div class="remember-pwd">
          <x-switch style="display: flex; align-items: center;" title='记住密码：' :value-map="['0', '1']" v-model="value"></x-switch>
        </div>
        <div class="btn" @click="pass">
          <span>跳过登录</span>
        <img src="./../../static/img/pass.svg" alt="">
        </div>
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
    setInterval(() => {
      this.btnIsActive = !this.btnIsActive
    }, 1000)
  },
  methods: {
    login() {
      const para = {
        phone: this.phone,
        password: this.password
      }
      this.$fetch.Login(para).then(res => {
        // 是否记住密码
        if (this.value == '1' ) {
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
    width: 100vw;
    position: relative;
    img {
      width: 150px;
      height: 150px;
      display: block;
      margin: 0 auto;
    }
    .form {
      width: 85vw;
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
    width: 85vw;
    margin: 210px auto;
    overflow: hidden;
    padding-top:1px;
    padding-bottom:5px;
    .remember-pwd {
      width: 120px;
      position: absolute;
      font-size: 13px;
      .weui-label {
        width: 65px !important;
      }
      .weui-switch, .weui-switch-cp__box {
        width: 45px;
        height: 25px;
      }
      .weui-switch:before, .weui-switch-cp__box:before {
        width: 23px;
        height: 23px;
      }
      .weui-switch:after, .weui-switch-cp__box:after {
        width: 23px;
        height: 23px;
      }
    }
    .btn {
      float: right;
      cursor: pointer;
      width: 110px;
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
  line-height: 1;
  color: #fff;
  letter-spacing: 0.025em;
  position: absolute;
  background: -webkit-linear-gradient(left, #2A78DC, #CCC);
  background: -moz-linear-gradient(left, #2A78DC, #CCC);
  background: -o-linear-gradient(left, #2A78DC, #CCC);
  background: linear-gradient(to right, #2A78DC, #CCC);
  padding: 18px 0 11px;
  cursor: pointer;
  border: 0;
  border-radius: 6px;
  min-width: 120px;
  overflow: hidden;
}

button span {
  display: block;
  position: relative;
  z-index: 10;
}

button:after,
button:before {
  padding: 18px 0 11px;
  content: '';
  position: absolute;
  top: 0;
  left: calc(-100% - 30px);
  height: calc(100% - 29px);
  width: calc(100% + 20px);
  color: #fff;
  border-radius: 2px;
  -webkit-transform: skew(-25deg);
  transform: skew(-25deg);
}

button:after {
  background: #fff;
  -webkit-transition: left 0.8s cubic-bezier(0.86, 0, 0.07, 1) 0.2s;
  transition: left 0.8s cubic-bezier(0.86, 0, 0.07, 1) 0.2s;
  z-index: 0;
  opacity: 0.8;
}

button:before {
  background: -webkit-linear-gradient(left, #CCC, #13c276);
  background: -moz-linear-gradient(left, #CCC, #13c276);
  background: -o-linear-gradient(left, #CCC, #13c276);
  background: linear-gradient(to right, #CCC, #13c276);
  z-index: 5;
  -webkit-transition: left 1s cubic-bezier(0.86, 0, 0.07, 1);
  transition: left 1s cubic-bezier(0.86, 0, 0.07, 1);
}

.button-active:after {
  background: #fff;
  -webkit-transition: left 0.8s cubic-bezier(0.86, 0, 0.07, 1) 0.2s;
  transition: left 0.8s cubic-bezier(0.86, 0, 0.07, 1) 0.2s;
  z-index: 0;
  opacity: 0.8;
  left: calc(0% - 10px);
  -webkit-transition: left 0.8s cubic-bezier(0.86, 0, 0.07, 1);
  transition: left 0.8s cubic-bezier(0.86, 0, 0.07, 1);
}

.button-active:before {
  background: -webkit-linear-gradient(left, #CCC, #13c276);
  background: -moz-linear-gradient(left, #CCC, #13c276);
  background: -o-linear-gradient(left, #CCC, #13c276);
  background: linear-gradient(to right, #CCC, #13c276);
  z-index: 5;
  -webkit-transition: left 1s cubic-bezier(0.86, 0, 0.07, 1);
  transition: left 1s cubic-bezier(0.86, 0, 0.07, 1);
  left: calc(0% - 10px);
  -webkit-transition: left 1s cubic-bezier(0.86, 0, 0.07, 1);
  transition: left 1s cubic-bezier(0.86, 0, 0.07, 1);
}
</style>
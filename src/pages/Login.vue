<template>
  <div id="login">
    <div class="content">
      <input type="text" v-model="phone">
    <br>
    <br>
    <input type="password" v-model='password'>
    <br>
    <br>
    <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: () => ({
    phone: '',
    password: ''
  }),
  mounted() {
  },
  methods: {
    login() {
      const para = {
        phone: this.phone,
        password: this.password
      }
      this.$fetch.Login(para).then(res => {
        this.$store.state.user = res
        localStorage.setItem('user', JSON.stringify(res))
        this.$router.push('/user')
      })
    }
  }
}
</script>

<style lang="less" scoped>
#login {
  .content {
    width: 100vw;
    height: 100vh;
    background-image: url('./../../static/img/loginbg.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
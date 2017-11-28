<template>
  <div id="login">
    <div class="content">
      <img src="./../../static/img/loginbg.gif" alt="">
      <div class="form">
        <div class="phone">
          <input type="text" placeholder="手机号码" v-model="phone">
        </div>
        <div class="pwd">
          <input type="password" placeholder="密码" v-model="password">
        </div>
        <canvas></canvas>
        <div class="login-btn">
          <button type="button" :class="{'button-active': btnIsActive}" @click="login">
            <span>登录</span>
          </button>
        </div>
      </div>
      <div class="pass">
        <div class="btn" @click="pass">
            <span>跳过登录</span>
        <img src="./../../static/img/pass.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: () => ({
    btnIsActive: false,
    phone: '',
    password: ''
  }),
  mounted() {
    setInterval(() => {
      this.btnIsActive = !this.btnIsActive
    }, 1000)
    this.H5btn()
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
    },
    pass() {
      this.$router.push('/recommend')
    },
    H5btn() {
      // -----------
      // Definitions
      // -----------
      var canvas = document.querySelector('canvas')
      canvas.width = 840
      canvas.height = 840
      var context = canvas.getContext('2d')
      var currentFrame = 0
      var circles = []
      var circleCount = 10
      // ---------
      // LIFECYCLE
      // ---------
      function update() {
        // ------------
        // Update state
        // ------------
        currentFrame++

        _projection.refZ = 400
        _projection.fLength = 102

        for (var i = 0; i < circles.length; i++) {
          _projection.doProjection(circles[i].shape);
          _projection.rotateY(circles[i].shape, circles[i].rotationX);
          _projection.rotateX(circles[i].shape, circles[i].rotationY);
        }
        // ------
        // Render
        // ------
        render()
      }
      // ------
      // Render
      // ------
      function render() {
        // -----
        // Clear
        // -----
        context.clearRect(0, 0, canvas.width, canvas.height)
        // -----------------
        // Background circle
        // -----------------
        context.beginPath();
        context.fillStyle = 'rgba(0,0,0, 1)'
        context.lineWidth = 5
        context.fill()
        // ----------------
        // Particle circles
        // ----------------
        for (var i = 0; i < circles.length; i++) {
          circles[i].render()
        }
        // ----
        // Loop
        // ----
        requestAnimationFrame(update)
      }
      // ---------------
      // Start Animation
      // ---------------
      requestAnimationFrame(update)
      // -------------
      // 3D Projection
      // -------------
      var Basic3DProjection = function() {

        this.projCenterX = 0
        this.projCenterY = 0
        this.fLength = 400
        this.refZ = 400

        this.getScaleFromZ = function(z) {
          if (this.fLength + z == 0) {
            return 0.001
          } else {
            return this.refZ / (this.fLength + z)
          }
        }
        this.doProjection = function(_object) {

          var x = _object.posX * this.getScaleFromZ(_object.posZ) + this.projCenterX
          var y = _object.posY * this.getScaleFromZ(_object.posZ) + this.projCenterY
          var y0z0 = this.getScaleFromZ(0)

          _object.screenX = x
          _object.screenY = y - y0z0;
          _object.scale = this.getScaleFromZ(_object.posZ)
          _object.pastViewPoint = _object.posZ > this.refZ

        }

        this.rotateY = function(object, ang) {
          var _cos = Math.cos(ang)
          var _sin = Math.sin(ang)

          var tz = object.posZ * _cos - object.posX * _sin
          var tx = object.posZ * _sin + object.posX * _cos
          object.posX = tx
          object.posZ = tz
          this.doProjection(object)
        }

        this.rotateX = function(object, ang) {
          var _cos = Math.cos(ang)
          var _sin = Math.sin(ang)

          var ty = object.posY * _cos - object.posZ * _sin;
          var tz = object.posY * _sin + object.posZ * _cos;
          object.posY = ty
          object.posZ = tz
          this.doProjection(object)
        }

        this.rotateZ = function(object, ang) {
          var _cos = Math.cos(ang)
          var _sin = Math.sin(ang)

          var object = objects[i];
          var tx = object.posX * _cos - object.posY * _sin
          var ty = object.posX * _sin + object.posY * _cos
          object.posX = tx
          object.posY = ty
          this.doProjection(object)
        }

      }

      var _projection = new Basic3DProjection()
      _projection.projCenterX = canvas.width / 2
      _projection.projCenterY = canvas.height / 2
      // --------
      // 3D Shape
      // --------
      var Basic3DObject = function(x, y, z, size) {

        this.posX = x
        this.posY = y
        this.posZ = z
        this.dispSize = size

        this.screenX = 0
        this.screenY = 0

        this.scale = 1
        this.pastViewPoint = false

      }

      function createCircle() {
        this.shape = new Basic3DObject(0, 0, 68, 0)
        this.rotationX
        this.rotationY
        this.size

        this.render = function() {
          context.beginPath()
          context.strokeStyle = 'rgba(182,182,182, ' + (this.shape.posZ * -1) / 60 + ')'
          context.fillStyle = 'rgba(182,182,182, ' + (this.shape.posZ * -1) / 60 + ')'
          context.lineWidth = 2 * this.size
          context.arc(
            this.shape.screenX,
            this.shape.screenY,
            this.size * this.shape.scale,
            0,
            Math.PI * 2,
            false
          );
          if (this.fillOrStroke === 'fill') {
            context.fill()
          } else {
            context.stroke()
          }
        }
      }

      for (var i = 0; i < circleCount; i++) {
        var tempCircle = new createCircle()

        if (Math.random() < 0.5) {
          tempCircle.rotationX = Math.random() / 100;      
        } else {
          tempCircle.rotationX = (Math.random() / 100) * -1
        }

        if (Math.random() < 0.5) {
          tempCircle.fillOrStroke = 'fill'
        } else {
          tempCircle.fillOrStroke = 'stroke'
        }

        if (Math.random() < 0.5) {
          tempCircle.rotationY = Math.random() / 100
        } else {
          tempCircle.rotationY = Math.random() / 100 * -1
        }

        tempCircle.size = Math.random() * 2

        circles.push(tempCircle)
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
      width: 200px;
      height: 200px;
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
      top: 185px;
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
    margin: 200px auto;
    overflow: hidden;
    padding-top:1px;
    padding-bottom:5px; 
    .btn {
      float: right;
      cursor: pointer;
      width: 140px;
      height: 35px;
      position: relative;
      display: flex;
      align-items: center;
      border: 1px solid #CCC;
      border-radius: 50px;
      box-shadow: 0 3px 9px #CCC, inset 0 0 9px #FFF;
      padding-top: 5px;
      padding-bottom: 5px;
    }
    span {
      position: absolute;
      right: 60px;
      color: #666;
    }
    img {
      position: absolute;
      top: 3px;
      right: 10px;
      width: 40px;
      height: 40px;
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

canvas {
  width: 420px;
  height: 420px;
  background: transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1000;
}
</style>
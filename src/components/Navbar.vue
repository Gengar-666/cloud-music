<template>
  <div id="navbar">
    <div class="header">
      <p class="title">这货不是网易云音乐</p>
      <i class="iconfont" id="menu" @click="menuShow">&#xe681;</i>
      <router-link to="/search">
        <i class="iconfont" id="search">&#xe678;</i>
      </router-link>
    </div>
    <ul class="nav">
      <li class="tabs" @click="toggle(index, $event)" v-for="(tab, index) in tabs" :key="index" ref="tab">
        <router-link ref="tabLink" :to="tab.path" :class="{active: activeTab == index}">{{ tab.title }}</router-link>
      </li>
      <li class="tab" :style="{left: left + 'px', width: tabBoxWidth + 'px'}">
        <span class="tab-bottom" :style="{width: tabBottomWidth + 'px'}"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'navbar',
  data: () => ({
    tabBoxWidth: 0,
    tabBottomWidth: 0,
    left: 0,
    tabs: [{
      title: '推荐',
      path: '/recommend',
    }, {
      title: '排行榜',
      path: '/rank',
    }, {
      title: '我的',
      path: '/user',
    }]
  }),
  mounted() {
    // 初始化导航的下标宽度和平移坐标
    this.getTabPosition()
  },
  computed: {
    ...mapGetters([
      'activeTab'
    ])
  },
  methods: {
    // 获取导航的下标宽度和平移坐标
    getTabPosition() {
      this.tabBoxWidth = this.$refs.tab[this.activeTab].clientWidth
      this.tabBottomWidth = this.$refs.tabLink[this.activeTab].$el.clientWidth + 20
      this.left = this.$refs.tab[this.activeTab].clientWidth * this.activeTab + 6
    },
    //导航切换
    toggle(i, e) {
      this.active = i;
      // 计算宽度和平移坐标
      this.tabBoxWidth = this.$refs.tab[i].clientWidth
      this.tabBottomWidth = this.$refs.tabLink[i].$el.clientWidth + 20
      this.left = this.$refs.tab[i].clientWidth * i + 6
    },
    // 左侧菜单显示或隐藏 
    menuShow() {
      this.$store.state.sidebarShow = !this.$store.state.sidebarShow
    }
  },
  watch: {
    // 监听路由变化重新设置导航的下标宽度和平移坐标
    '$route': 'getTabPosition'
  }
}
</script>

<style lang="less" scoped>
#navbar {
  width: 100%;
  position: fixed;
  top: 0;
  .header {
    width: 100%;
    height: 50px;
    background: -webkit-linear-gradient(left, #2A78DC, #CCC);
    background: -moz-linear-gradient(left, #2A78DC, #CCC);
    background: -o-linear-gradient(left, #2A78DC, #CCC);
    background: linear-gradient(to right, #2A78DC, #CCC);
    /* 标准的语法（必须放在最后）*/
    #menu {
      position: absolute;
      top: 15px;
      left: 20px;
      color: #FFF;
      font-size: 18px;
    }

    #search {
      position: absolute;
      top: 14px;
      right: 20px;
      color: #FFF;
      font-size: 23px;
    }

    .title {
      text-align: center;
      color: #FFF;
      line-height: 50px;
    }
  }
  .nav {
    list-style: none;
    height: 50px;
    li {
      display: inline-flex;
      justify-content: center;
      float: left;
      width: 32%;
      a {
        display: inline-block;
        width: 60%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        text-decoration: none;
        color: rgba(0, 0, 0, .6);
        font-size: 14px;
      }
      .active {
        color: #2A78DC !important;
      }
    }
  }
  .tab {
    position: relative;
    height: 3px;
    transition: left .3s;
    -moz-transition: left .3s;
    /* Firefox 4 */
    -webkit-transition: left .3s;
    /* Safari 和 Chrome */
    -o-transition: left .3s;
    /* Opera */
    .tab-bottom {
      display: inline-block;
      height: 2px;
      background: -webkit-linear-gradient(left, #2A78DC, #FFF);
      background: -moz-linear-gradient(left, #2A78DC, #FFF);
      background: -o-linear-gradient(left, #2A78DC, #FFF);
      background: linear-gradient(to right, #2A78DC, #FFF);
    }
  }
}
</style>

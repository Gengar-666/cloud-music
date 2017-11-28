<template>
  <div id="navbar">
    <div class="header">
      <p class="title">这是一个假的网易云音乐</p>
      <img id="menu" :src="MenuIcon" alt="">
      <router-link to="/search">
        <img id="search" :src="SearchIcon" alt="">
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
import { mapState } from 'vuex'
import MenuIcon from './../../static/img/menu.svg'
import SearchIcon from './../../static/img/search1.svg'
export default {
  name: 'navbar',
  data: () => ({
    MenuIcon,
    SearchIcon,
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
    ...mapState({
      activeTab: state => state.activeTab
    })
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
  z-index: 1000;
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
      top: 13px;
      left: 20px;
      width: 25px;
    }

    #search {
      position: absolute;
      top: 10px;
      right: 25px;
      width: 28px;
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

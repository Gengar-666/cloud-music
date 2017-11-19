<template>
  <div class="home">
    <div class="top">
      <p class="title">山寨云音乐 (ง •̀_•́)ง</p>
    </div>
    <ul class="nav">
      <li @click="toggle(index,tab.tag)" v-for="(tab, index) in tabs" :class="{active:active==index}">
         <img :src="tab.img" alt=""> 
         <div>{{ tab.title }}</div>
      </li>
    </ul>
    <component :is="currentView"></component>
  </div>
</template>

<script>
import recommend from "./recommend"
import ranking from "./ranking"
import search from "./search"
import axios from "axios"
import tag1 from "./../../static/img/tag1.jpg"
import tag2 from "./../../static/img/tag2.jpg"
import tag3 from "./../../static/img/tag3.jpg"
export default {
  name: 'home',
  data() {
    return {
      currentView: recommend,
      active: 0,
      tabs: [{
        title: '推荐',
        tag: 'recommend',
        img: tag1
      }, {
        title: '排行榜',
        tag: 'ranking',
        img: tag2
      }, {
        title: '搜索',
        tag: 'search',
        img: tag3
      }]
    }
  },
  beforeCreate() {
        this.$store.dispatch('get_cloudTopList');
  },
  methods: {
    //导航切换
    toggle(i, tag) {
      this.active = i;
      this.currentView = tag;
    }
  },
  components: {
    recommend,
    ranking,
    search,
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 50px;
  background: -webkit-linear-gradient(left, blue, purple);
  background: -moz-linear-gradient(left, blue, purple);
  background: -o-linear-gradient(left, blue, purple);
  background: linear-gradient(to right, blue, purple);
  /* 标准的语法（必须放在最后）*/
}

.title {
  text-align: center;
  color: #FFF;
  line-height: 50px;
}

.nav {
  list-style: none;
  height: 50px;
}

.nav li {
  position: relative;
  float: left;
  width: 33.3%;
  text-align: center;
  line-height: 50px;
  color: rgba(0, 0, 0, .6);
}

.nav img {
  width: 50px;
  position: absolute;
  left: 0;
}
.nav li div {
  text-indent: 1.5rem;
}

.active {
  color: #2A78DC !important;
  border-bottom: 3px solid;
  border-image: -webkit-linear-gradient( red, blue);
  border-image: -moz-linear-gradient( red, blue);
  border-image: linear-gradient( blue, purple) 50 50;
}
</style>

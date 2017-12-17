<template>
  <div id="search">
    <div class="search-bar">
      <v-touch tag="i" class="iconfont back" v-on:tap="back" v-on:press="back">&#xe617;</v-touch>
      <input @focus="cancelShow" @input="getSearchResult(null, true)" v-model="keyword" type="text" :style="{ width }" placeholder="搜索歌曲">
      <v-touch tag="span" v-on:tap="cancelHide" v-on:press="cancelHide" class="cancel" v-show="cancelBtnShow">取消</v-touch>
    </div>
    <div class="hot-search" v-if="searchList.length == 0">
      <p class="hot-title">热门搜索</p>
      <div class="hot-tags">
        <v-touch tag="span" v-for="(tag, index) in hotSearchList" v-on:tap="getSearchResult(tag.name, false)" v-on:press="getSearchResult(tag.msg, false)" :class="['tags-item','active-'+index]" :key="index">{{ tag.name }}</v-touch>
      </div>
    </div>
    <div class="search-list" v-if="searchList.length > 0">
      <p class="search-title">{{ "搜索"+'"'+keyword+'"' }}</p>
      <musicList isSearch :musicList="searchList"></musicList>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'search',
  data: () => ({
    timer: null,
    keyword: '',
    width: '97.5%',
    cancelBtnShow: false
  }),
  computed: {
    ...mapGetters([
      //热门搜索
      'hotSearchList',
      //搜索结果
      'searchList'
    ])
  },
  methods: {
    cancelShow() {
      this.width = '82%'
      this.cancelBtnShow = true
    },
    cancelHide() {
      this.keyword = ''
      this.width = '97.5%'
      this.cancelBtnShow = false
      this.$store.state.searchList = ''
    },
    getSearchResult(keyword, isInput) {
      this.width = '82%'
      this.cancelBtnShow = true
      if (isInput) {
        if (this.keyword !== '') {
          this.$store.state.searchList = []
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.$store.dispatch('get_searchList', this.keyword)
          }, 1000)
        }
      } else {
        this.keyword = keyword
        this.$store.state.searchList = []
        this.$store.dispatch('get_searchList', keyword)
      }
    },
    back() {
      this.$router.go(-1)
      this.$store.state.songsheetDetail = []
    }
  },
  components: {
    musicList: resolve => {
      require(['@/components/MusicList'], resolve)
    }
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
#search {
  .search-bar {
    width: 100%;
    background: #f4f4f4;
    padding: 6px;
    box-sizing: border-box;
    .back {
      position: absolute;
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: #C8C8CD;
      font-size: 20px;
    }
    input {
      border: none;
      height: 40px;
      border-radius: 6px;
      font-size: 14px;
      margin-left: 5px;
      text-indent: 2.5rem;
      outline: medium;
    }
    .cancel {
      font-size: 14px;
      color: rgba(0, 0, 0, .6);
      margin-left: 10px;
    }
  }
  .hot-search {
    padding-left: 15px;
    padding-top: 15px;
    font-size: 14px;
    color: rgba(0, 0, 0, .6);
    .hot-tags {
      margin-top: 10px;
      .tags-item {
        display: inline-block;
        font-size: 14px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        text-decoration: none;
        color: #000;
        border: 1px solid rgba(0, 0, 0, .6);
        border-radius: 100px;
        margin-right: 15px;
        margin-bottom: 10px;
      }
    }
    .active-0 {
      color: #2A78DC !important;
      border: 1px solid #2A78DC !important;
      border-radius: 100px;
    }
  }
  .search-list {
    margin-top: 50px;
    height: 79vh;
    .search-title {
      position: absolute;
      width: 100%;
      top: 52px;
      height: 50px;
      margin-left: 10px;
      padding-right: 10px;
      font-size: 12px;
      line-height: 50px;
      color: #507daf;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      background: #FFF;
    }
  }
}
</style>
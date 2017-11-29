<template>
    <div class="search">
         <div class="search-bar">
            <span class="search-icon"></span>
            <input @focus="cancelShow" @input="searchListShow" v-on:input="getSearchList" v-model="keyword" type="text" :style="inputWidth" placeholder="搜索歌曲">
            <span @click="cancelHide" class="cancel" v-if=" CancelBtnShow !='' ">取消</span>
        </div>
        <component :is="currentView" :keyword="keyword" :result="searchList" :currentView="currentView" v-on:listenToHotSearch="showMsgFromHotSearch"></component>
    </div> 
</template>

<script>
import hotSearch from './HotSearch'
import searchList from './SearchList'
import { mapGetters, mapActions } from 'vuex'
export default {
    data: () => ({
            inputWidth: {
                width: '97.5%'
            },
            CancelBtnShow: '',
            currentView: 'hotSearch',
            keyword: '',
    }),
    computed: {
        ...mapGetters(['searchList'])
    },
    components: {
        hotSearch,
        searchList
    },
    methods: {
        ...mapActions(['get_searchList']),
        showMsgFromHotSearch(data) {
            this.currentView = data.currentView
            this.keyword = data.keyword
            // 获取搜索列表
            this.get_searchList(this.keyword)
        },
        cancelShow() {
            if (this.keyword == "") {
                this.currentView = ''
                this.CancelBtnShow = 'show'
                this.inputWidth.width = '82%'
            }
        },
        cancelHide() {
            this.currentView = 'hotSearch'
            this.CancelBtnShow = ''
            this.inputWidth.width = '97.5%'
            this.keyword = ""
        },
        searchListShow() {
            this.currentView = 'searchList'
        },
        getSearchList() {
            if (this.keyword != "") {
                this.get_searchList(this.keyword)
            }
            if (this.keyword == "" || this.keyword == " ") {
                this.$store.state.searchList = []
                this.result = this.$store.state.searchList
            }
        }
    }
}
</script>

<style lang="less" scoped>
.search {
    .search-bar {
        position: fixed;
        top: 0;
        width: 100%;
        background: #f4f4f4;
        padding: 6px;
        box-sizing: border-box;
        z-index: 1000;
        input {
            border: none;
            height: 40px;
            border-radius: 6px;
            font-size: 14px;
            margin-left: 5px;
            text-indent: 2rem;
            outline: medium;
        }
        .search-icon {
            display: inline-block;
            background-image: url('../../static/img/search.svg');
            width: 25px;
            height: 25px;
            background-repeat: no-repeat;
            background-size: cover;
            position: absolute;
            top: 15px;
            left: 15px;
        }
        .cancel {
            font-size: 14px;
            color: rgba(0, 0, 0, .6);
            margin-left: 10px;
        }
    }
}
</style>

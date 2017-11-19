<template>
    <div class="hot-search">
        <p class="hot-title">热门搜索</p>
        <div class="hot-tags">
            <a href="#" @click="searchListShow(tag.msg)" v-for="(tag,index) in tags" :class="['tags-item','active-'+index]">{{ tag.msg }}</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tags: [{
                msg: '火影忍者'
            },{
                msg: '逆さまの蝶' 
            },{
                msg: 'rollong star'
            },{
                msg: '山外小楼夜听雨' 
            },{
                msg: 'GLORIA' 
            },{
                msg: 'again'
            },{
                msg: '边走边唱' 
            },{
                msg: '成全'
            },{
                msg: '残酷月光'
            },{
                msg: '造梦者'
            }]
        }
    },
    methods: {
        searchListShow (msg) {
            this.$emit('listenToHotSearch',{currentView:'searchList',keyword:msg})
        }
    }
}
</script>

<style lang="less" scoped>
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
}

.active-0 {
    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(blue), to(purple));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border: 1px solid #3c00c3 !important;
    border-radius: 100px;
}
</style>

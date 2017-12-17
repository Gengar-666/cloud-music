<template>
    <div id="rank">
        <v-touch class="list" v-for="(item, index) in list" :key="index" v-on:tap="getDetail(index)" v-on:press="getDetail(index)" :style="'background-image: url(' + item.img + ');'">
            <img ref="img" v-lazy="item.img" alt="">
            <div>
                <p class="title">{{ item.title }}</p>
                <p>每日更新</p>
            </div>
        </v-touch>
    </div>
</template>

<script>
import New from './../../static/img/new.png'
import Hot from './../../static/img/hot.png'
import Original from './../../static/img/original.png'
import Top from './../../static/img/top.png'
export default {
    name: 'rank',
    data: () => ({
        list: [{
            img: New,
            title: '云音乐新歌榜'
        }, {
            img: Hot,
            title: '云音乐热歌榜'
        }, {
            img: Original,
            title: '云音乐原创榜'
        }, {
            img: Top,
            title: '云音乐飙升榜'
        }]
    }),
    mounted() {
    },
    methods: {
        getDetail(idx) {
            this.$router.push({ name: 'rankDetail', query: { idx } })
        }
    }
}
</script>

<style lang="less" scoped>
#rank {
    height: 100%;
    .list {
        height: 23%;
        background: -webkit-linear-gradient(left, #2A78DC, #CCC);
        background: -moz-linear-gradient(left, #2A78DC, #CCC);
        background: -o-linear-gradient(left, #2A78DC, #CCC);
        background: linear-gradient(to right, #2A78DC, #CCC);
        padding-left: 10px;
        display: flex;
        align-items: center;
        width: 92%;
        margin: 0 auto;
        margin-top: 10px;
        border-radius: 6px;
        img {
            width: 25%;
            height: 75%;
            border-radius: 6px;
            border: 1px solid #FFF;
        }
        .title {
            color: #FFF;
            margin-left: 20px;
            font-size: 15px;
        }
        p {
            color: #FFF;
            margin-top: 10px;
            margin-left: 20px;
            font-size: 13px;
        }
    }
}
</style>
<template>
    <div id="songSheetDetail" v-if="songsheetDetail.length !== 0">
        <v-touch class="back" v-on:tap="back" v-on:press="back">
            <i class="iconfont">&#xe617;</i>
        </v-touch>
        <div class="list-header" :style="{ backgroundImage: 'url(' + songsheetDetail.coverImgUrl + ')' }">
        </div>
        <div class="list-wrap">
            <div class="list-img">
                <img :src="songsheetDetail.coverImgUrl" alt="">
            </div>
            <div class="list-content">
                <p>{{ songsheetDetail.name }}</p>
                <div class="list-author">
                    <img :src="songsheetDetail.avatarUrl" class="headPortrait" alt="">
                    <span>{{ songsheetDetail.nickname }}</span>
                </div>
            </div>
        </div>
        <div class="list-intro">
            <div class="intro-tags">
                标签：
                <span v-for="(tag, index) in songsheetDetail.tags" :key="index">{{ tag }}</span>
            </div>
            <div class="intro-bottom">
                简介：{{ songsheetDetail.description }}
            </div>
        </div>
        <div class="paly-list">
            <p>歌曲列表</p>
            <div class="sg_list">
                <music-list :musicList="songsheetDetail"></music-list>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data: () => ({
    }),
    computed: {
        ...mapGetters(['songsheetDetail'])
    },
    activated() {
        //获取歌单内容
        this.get_songsheetDetail(this.$route.query.id)
    },
    methods: {
        ...mapActions(['get_songsheetDetail']),
        back() {
            this.$router.go(-1)
            this.$store.state.songsheetDetail = []
        }
    },
    components: {
        musicList: resolve => {
            require(['@/components/MusicList'], resolve)
        }
    }
}
</script>

<style lang="less" scoped>
#songSheetDetail {
    overflow: hidden;
    background-color: #f8f8f8;
    .back {
        width: 50px;
        height: 50px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
        .iconfont {
            font-size: 23px;
        }
    }
    .list-header {
        height: 55px;
        padding-top: 5px;
        padding-bottom: 30px;
        padding-left: 20px;
        position: relative;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        filter: blur(20px);
        transform: scale(1.5);
        z-index: 1
    }
    .list-wrap {
        position: relative;
        top: -90px;
        left: 20px;
        z-index: 2;
        .list-img {
            width: 35%;
            img {
                width: 100%;
            }
        }
    }
    .list-content {
        color: #FFF;
        width: 50%;
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 14px;
        .list-author {
            margin-top: 30px;
            position: relative;
            img {
                width: 2rem;
                border-radius: 50%;
                margin-top: 10px;
            }
            span {
                position: absolute;
                top: 20px;
                margin-left: 6px;
                font-size: 13px;
            }
        }
    }
    .list-intro {
        margin-top: -60px;
        padding-bottom: 20px;
        .intro-tags {
            margin-left: 20px;
            font-size: 14px;
            color: #666;
            span {
                font-size: 12px;
                display: inline-block;
                margin-right: 10px;
                padding: 1px 8px;
            }
        }
        .intro-bottom {
            height: 60px;
            margin-left: 20px;
            font-size: 13px;
            color: #666;
            margin-top: 10px;
            position: relative;
            line-height: 20px;
            max-height: 60px;
            overflow: hidden;
        }
        .intro-bottom::after {
            content: "...";
            position: absolute;
            bottom: 0;
            right: 0;
            padding-left: 40px;
            background: -webkit-linear-gradient(left, transparent, #fff 55%);
            background: -o-linear-gradient(right, transparent, #fff 55%);
            background: -moz-linear-gradient(right, transparent, #fff 55%);
            background: linear-gradient(to right, transparent, #fff 55%);
        }
    }
    .paly-list {
        p {
            padding-left: 20px;
            padding-top: 2px;
            padding-bottom: 2px;
            font-size: 13px;
            color: #666;
            background: #eeeff0;
        }
        .sg_list {
            height: 50vh;
            overflow-y: auto;
            overflow-x: hidden;
            position: relative;
        }
    }
}
</style>
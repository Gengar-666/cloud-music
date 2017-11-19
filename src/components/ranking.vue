<template>
    <div class="ranking">
        <div class="pic">
            <img :src="banner" alt="">
        </div>
        <div class="hot_sg">
            <div class="m-sglst" @click="getId(sgItem.id)" v-for="( sgItem,index ) in cloudTopList.tarcks">
                <div class="m-sg-item">
                    <div class="sg_num" :class="{ top:index<3 }" v-if="index<9">{{ "0"+(index+1) }}</div>
                    <div class="sg_num" v-else>{{ index+1 }}</div>
                    <div class="sg-btn">
                        <div sg-left>
                            <div class="sg-title">{{ sgItem.name }}</div>
                            <div class="sg-singer">{{ sgItem.artists[0].name }} {{ sgItem.alias[0] }}</div>
                        </div>
                        <div class="sg-play">
                            <span class="play-icon"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="hotdn">
                    <span class="hot-view">查看完整榜单</span>
                </div> -->
    </div>
</template>

<script>
import banner from './../../static/img/new.png'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            banner
        }
    },
    computed: {
        ...mapState({
            //推荐歌单
            cloudTopList: state => state.cloudTopList
        })
    },
    methods: {
        getId(id) {
            // 获取歌曲Url
            MUSIC_ID = id;
            this.$store.dispatch('get_musicUrl');
        }

    }
}
</script>

<style scoped>
.hot_sg {
    margin-bottom: 60px;
}

.pic img {
    width: 100%;
}

.hot_sg {
    position: relative;
}

.sg_num {
    line-height: 30px;
    margin-right: 10px;
    font-size: 18px;
}

.top {
    color: #df3436;
}

.m-sglst {
    margin-left: 10px;
    padding-bottom: 5px;
    padding-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    padding-top: 10px;
    padding-bottom: 10px;
}

.m-sg-item {
    text-decoration: none;
    color: #000;
    display: flex;
}

.sg-btn {
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    display: -webkit-box;
    display: flex;
    position: relative;
}

.sg-left {
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    padding: 6px 0;
    width: 0;
}

.sg-play {
    background-position: 0px -265px;
    position: absolute;
    right: 10px;
    width: 40px;
    height: 40px;
    background-image: url(../../static/img/sprites.png);
    background-size: 250px;
    background-repeat: no-repeat;
}

.sg-singer {
    width: 260px;
    color: #888;
    font-size: 13px;
}

.hotdn {
    text-align: center;
    margin-top: 10px;
    color: #999;
    font-size: 14px;
}
</style>

<template>
    <div class="play-list">
        <div class="bottom">
             <div class="pic">
                <img :src="songDetail.al.picUrl" alt="">
            </div>
            <div class="title">
                <p>{{ songDetail.name }}</p>
                <p class="song-name">{{ songDetail.ar[0].name }}</p>
            </div>
            <div class="play-btn" @click="play(playStatus)">
                <img :src="playBtn" alt="">
            </div> 
        </div>
    </div>
</template>

<script>
import play from './../../static/img/play.svg'
import pause from './../../static/img/pause.svg'
import { mapState } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState({
            songDetail: state => state.songDetail,
            playStatus: state => state.playStatus,
            playBtn : state => state.playBtn
        })
    },
    methods: {
        play(status) {
            if (status != false) {
                this.$store.state.playStatus = false;
                this.$store.state.playBtn = play;
            }
            else {
                this.$store.state.playStatus = true;
                this.$store.state.playBtn = pause;
            }
        }
    }
}
</script>

<style lang="less" scoped>
.bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: -webkit-linear-gradient(left, blue, purple);
    background: -moz-linear-gradient(left, blue, purple);
    background: -o-linear-gradient(left, blue, purple);
    background: linear-gradient(to right, blue, purple);
    padding-top: 10px;
    padding-bottom: 8px;
    padding-left: 10px;
    .pic {
        display: inline-block;
        img {
            width: 40px;
        }
    }
    .title {
        display: inline-block;
        color: #FFF;
        font-size: 13px;
        position: absolute;
        left: 60px;
        top: 12px;
    }
    .title .song-name {
        margin-top: 3px;
        color:#ccc;
        font-size: 12px;
    }
    .play-btn {
        display: inline-block;
        float: right;
        margin-right: 2rem;
        margin-top: 3px;
        img {
            width: 33px;
        }
    }
}
</style>

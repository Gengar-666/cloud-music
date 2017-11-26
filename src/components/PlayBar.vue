<template>
<div id="playbar">
    <div id="music">
        <audio :src="audioUrl.url" @canplay="playMusic" ref="player" loop="loop"></audio>  
    </div>
        <div class="palyer" v-if="musicDetail.length !==0">
             <div class="pic">
                <img :src="musicDetail.al.picUrl" alt="">
            </div>
            <div class="title">
                <p>{{ musicDetail.name }}</p>
                <p class="song-name">{{ musicDetail.ar[0].name }}</p>
            </div>
            <div class="play-btn" @click="play(playStatus)">
                <img :src="playBtn" alt="">
            </div> 
        </div>  
</div>
</template>

<script>
import { mapState } from 'vuex'
import play from './../../static/img/play.svg'
import pause from './../../static/img/pause.svg'
export default {
    name: 'music',
    data: () => ({
    }),
    computed: {
        ...mapState({
            //音乐url
            audioUrl: state => state.audioUrl,
            //播放状态
            playStatus: state => state.playStatus,
            musicDetail: state => state.musicDetail,
            playStatus: state => state.playStatus,
            playBtn : state => state.playBtn
        })
    },
    methods: {
        //播放音乐
        playMusic() {
            //设置播放状态
            this.$store.commit('set_playStatus', true);
            //播放歌曲
            this.$refs.player.play();
        },
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
    },
    watch: {
        //监听歌曲播放状态
        playStatus(state) {
            if (state != false) {
                this.$nextTick(() => {
                    this.$refs.player.play();
                })
            } else {
                this.$refs.player.pause();
            }
        }
    }
}
</script>

<style lang="less" scoped>
.palyer {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 40px;
    z-index: 1000;
    background: -webkit-linear-gradient(left, #2A78DC, #CCC);
    background: -moz-linear-gradient(left, #2A78DC, #CCC);
    background: -o-linear-gradient(left, #2A78DC, #CCC);
    background: linear-gradient(to right, #2A78DC, #CCC);
    padding-top: 10px;
    padding-bottom: 8px;
    padding-left: 10px;
    .pic {
        display: inline-block;
        img {
            width: 40px;
            height: 40px;
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

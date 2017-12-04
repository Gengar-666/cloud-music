<template>
    <div id="playbar">
        <div id="music">
            <audio :src="audioUrl.url" @canplay="playMusic($event)" ref="player"></audio>
        </div>
        <div class="palyer" v-if="musicDetail.length !==0 && $route.path !=='/login'" @click="playShow">
            <div class="pic">
                <img :src="musicDetail.al.picUrl" alt="">
            </div>
            <div class="title">
                <p>{{ musicDetail.name }}</p>
                <p class="song-name">{{ musicDetail.ar[0].name }}</p>
            </div>
            <div class="btn">
                <div class="play-btn" @click.stop="play(playStatus)">
                    <img :src="playBtn" alt="">
                </div>
                <div class="next" @click.stop="next()">
                    <img src="./../../static/img/next.svg" alt="">
                </div>
                <div class="listenLists" @click.stop="getListenLists">
                    <img src="./../../static/img/listenLists.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import play from './../../static/img/play.svg'
import pause from './../../static/img/pause.svg'

export default {
    name: 'music',
    data: () => ({
    }),
    computed: {
        ...mapGetters([
            // 歌曲url
            'audioUrl',
            // 播放状态
            'playStatus',
            // 歌曲详情
            'musicDetail',
            // 试听列表
            'listenLists',
            // 播放模式
            'playType',
            // 播放状态
            'playStatus',
            // 按钮状态
            'playBtn',
            // 歌曲总时间
            'musicDuration',
            // 歌曲当前时间
            'musicCurrentTime',
            // 是否滑动进度条
            'isTouchMove',
            // 滑动进度条后的时间节点
            'newTime'
        ])
    },
    mounted() {
    },
    methods: {
        // 显示播放信息
        playShow() {
            this.$store.state.playShow = true
        },
        //播放音乐
        playMusic(e) {
            let _this = this
            _this.$store.state.musicDuration = e.target.duration
            var timer = setInterval(() => {
                _this.$store.state.musicCurrentTime = e.target.currentTime
            }, 1000)
            //设置播放状态
            _this.$store.commit('set_playStatus', true)
            //播放歌曲
            _this.$refs.player.play()
            //监听歌曲是否播放完毕
            e.target.addEventListener('ended', function() {
                clearInterval(timer)
                _this.next()
            }, false)
        },
        // 播放或暂停
        play(status) {
            if (status != false) {
                this.$store.state.playStatus = false
                this.$store.state.playBtn = play
            }
            else {
                this.$store.state.playStatus = true
                this.$store.state.playBtn = pause
            }
        },
        // 下一首
        next() {
            let id = null
            let musicList = []
            this.listenLists.map(i => {
                musicList.push(i)
            })
            // 是否列表随机
            if (this.playType == 'random') {
                for (var i = musicList.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i - 0 + 1) + 0);
                    var t = musicList[i];
                    musicList[i] = musicList[j];
                    musicList[j] = t;
                }
            }
            for (let i = 0; i < musicList.length; i++) {
                // 判断是不是最后一首
                if (i === musicList.length - 1) {
                    id = musicList[0].id
                    break
                }
                // 获取下一首歌曲
                if (musicList[i].id === this.musicDetail.id) {
                    id = musicList[i + 1].id
                    break
                }
            }
            this.$store.dispatch('get_musicDetail', id)
            this.$fetch.MusicUrl(id).then(res => {
                this.$store.dispatch('get_audioUrl', res.data[0])
            })
        },
        //获取试听列表
        getListenLists() {
            this.$store.state.listenListStatus = true
        }
    },
    watch: {
        //监听歌曲播放状态
        playStatus(state) {
            if (state != false) {
                this.$nextTick(() => {
                    this.$refs.player.play()
                })
            } else {
                this.$refs.player.pause()
            }
        },
        // 是否滑动进度条
        isTouchMove(val) {
            setTimeout(() => {
                this.$store.state.isTouchMove = false
                // 设置播放时间节点
                this.$refs.player.currentTime = this.newTime
            }, 0)
        }
    }
}
</script>

<style lang="less" scoped>
#playbar {
    width: 100%;
    position: absolute;
    bottom: 0;
    .palyer {
        width: 100%;
        height: 40px;
        z-index: 1000;
        background: -webkit-linear-gradient(left, #2A78DC, #CCC);
        background: -moz-linear-gradient(left, #2A78DC, #CCC);
        background: -o-linear-gradient(left, #2A78DC, #CCC);
        background: linear-gradient(to right, #2A78DC, #CCC);
        padding-top: 10px;
        padding-bottom: 8px;
        .pic {
            display: inline-block;
            position: absolute;
            left: 10px;
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
            color: #ccc;
            font-size: 12px;
        }
        .play-btn {
            display: inline-block;
            position: absolute;
            right: 5.5rem;
            top: 18px;
            img {
                width: 25px;
                height: 25px;
            }
        }
        .next {
            display: inline-block;
            position: absolute;
            right: 3.1rem;
            top: 18px;
            img {
                width: 25px;
                height: 25px;
            }
        }
        .listenLists {
            display: inline-block;
            position: absolute;
            right: 0.5rem;
            top: 15px;
            img {
                width: 30px;
                height: 30px;
            }
        }
    }
}
</style>

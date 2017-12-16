<template>
    <div id="playbar">
        <div id="music">
            <audio :src="audioUrl.url" @canplay="playMusic($event)" ref="player"></audio>
        </div>
        <div class="palyer" v-if="musicDetail.length !==0 && $route.path !=='/login'" @click="playShow">
            <div class="pic">
                <img v-lazy="musicDetail.al.picUrl" alt="">
            </div>
            <div class="title">
                <p v-if="musicDetail.alia.length !==0" class="top">{{ musicDetail.name + '(' + musicDetail.alia[0] + ')' }}
                </p>
                <p v-else class="top">{{ musicDetail.name }}</p>
                <p class="bottom">{{ musicDetail.ar[0].name }}{{ musicDetail.ar[1] ? '/' + musicDetail.ar[1].name : ''}}</p>
            </div>
            <div class="btn">
                <div class="play-btn" @click.stop="play(playStatus)">
                    <i v-show="playStatus == false" class="iconfont">&#xe625;</i>
                    <i v-show="playStatus" class="iconfont">&#xe629;</i>
                </div>
                <div class="listenLists" @click.stop="getListenLists">
                    <i class="iconfont">&#xe640;</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
            // 歌曲总时间
            'musicDuration',
            // 歌曲当前时间
            'musicCurrentTime',
            // 是否滑动滚动条
            'isTouchMove',
            // 滑动进度条后的时间节点
            'newTime',
            // 歌词
            'Lyric'
        ])
    },
    mounted() {
    },
    methods: {
        // 显示播放信息
        playShow() {
            this.$store.state.playStyleObject = {
                'opacity': 1,
                'zIndex': 100
            }
            this.$router.push('/play')
        },
        //播放音乐
        playMusic(e) {
            let _this = this
            _this.$store.state.musicDuration = e.target.duration
            //设置播放状态
            _this.$store.commit(_this.$types.SET_PLAY_STATUS, true)
            //播放歌曲
            _this.$refs.player.play()
            //监听歌曲是否播放完毕
            e.target.addEventListener('ended', function() {
                _this.next()
            })
            //监听当前播放时间和对应歌词
            e.target.addEventListener('timeupdate', function() {
                _this.$store.state.musicCurrentTime = e.target.currentTime
                for (let i = 0; i < _this.Lyric.length; i++) {
                    if (_this.Lyric[i].time >= e.target.currentTime) {
                        if (i !== 0) {
                            _this.$store.state.nowLrcIndex = i - 1
                            break
                        }
                    } else if (i === _this.Lyric.length - 1) {
                        // 结束
                        _this.$store.state.nowLrcIndex = i - 1
                    }
                }
            }, false)
        },
        // 播放或暂停
        play(status) {
            this.$store.state.playStatus = !status
        },
        // 下一首
        next() {
            this.$store.dispatch('set_next_or_prev_Music', 'next')
        },
        //获取试听列表
        getListenLists() {
            this.$store.state.listenListStatus = true
        }
    },
    watch: {
        //监听歌曲播放状态
        playStatus(status) {
            if (status) {
                this.$nextTick(() => {
                    this.$refs.player.play()
                })
            } else {
                this.$refs.player.pause()
            }
        },
        // 是否滑动滚动条
        isTouchMove(val) {
            if (val) {
                this.$refs.player.pause()
            }
        },
        // 设置播放时间节点
        newTime(val) {
            this.$refs.player.currentTime = val
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
            .top {
                width: 55vw;
                height: 15px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .bottom {
                margin-top: 3px;
                color: #ccc;
                font-size: 12px;
            }
        }
        .play-btn {
            display: inline-block;
            position: absolute;
            right: 4rem;
            top: 18px;
            .iconfont {
                color: #FFF;
                font-size: 25px;
            }
        }
        .listenLists {
            display: inline-block;
            position: absolute;
            right: 1rem;
            top: 15px;
            .iconfont {
                color: #FFF;
                font-size: 30px;
            }
        }
    }
}
</style>

<template>
    <div id="play">
        <actionsheet v-model="playShow.playShow">
            <p slot="header">
                <ul>
                    <li>
                        <div class="play-box" v-if="musicDetail.length !==0">
                            <div class="header">
                                <v-touch class="back" v-on:tap="back" v-on:press="back">
                                    <img src="./../../static/img/back.svg" alt="">
                                </v-touch>
                                <div class="title">
                                    <marquee v-if="musicDetail.alia.length !==0" scrolldelay="160">
                                        <p class="top">
                                            {{ musicDetail.name }}{{ '(' + musicDetail.alia[0] + ')' }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ musicDetail.name }}{{ '(' + musicDetail.alia[0] + ')' }}
                                        </p>
                                    </marquee>
                                    <p v-else class="top">{{ musicDetail.name }}</p>
                                    <p class="bottom">{{ musicDetail.ar[0].name }}{{ musicDetail.ar[1] ? '/' + musicDetail.ar[1].name : ''}}</p>
                                </div>
                                <v-touch class="share" v-on:tap="share" v-on:press="share">
                                    <img src="./../../static/img/share.svg" alt="">
                                </v-touch>
                            </div>
                            <div class="play-bg" :style="'background-image: url(' + musicDetail.al.picUrl + ')'">
                            </div>
                            <div class="play-disc" :style="'transform: rotate(' + rotate + 'deg)'">
                                <div class="play-img">
                                    <img class="u-img" :src="musicDetail.al.picUrl">
                                </div>
                            </div>
                            <div class="play-disc-img"></div>
                            <v-touch class="progress-bar" v-on:panstart="panstart" v-on:panend="panend">
                                <span class="currentTime">{{ Math.floor(musicCurrentTime.musicCurrentTime/60)+":"+(musicCurrentTime.musicCurrentTime%60/100).toFixed(2).slice(-2) }}</span>
                                <range v-model="currentTime" @on-change="onChange" :rangeBarHeight="2"></range>
                                <span class="duration">{{ Math.floor(musicDuration/60)+":"+(musicDuration%60/100).toFixed(2).slice(-2) }}</span>
                            </v-touch>
                            <v-touch class="play-bar">
                                <ul>
                                    <v-touch tag="li" v-on:tap="togglePlayType" v-on:press="togglePlayType">
                                        <img v-show="playType == 'listloop'" src="./../../static/img/listloop.svg" alt="">
                                        <img v-show="playType == 'random'" src="./../../static/img/random.svg" alt="">
                                    </v-touch>
                                    <v-touch tag="li" v-on:tap="prev" v-on:press="prev">
                                        <img class="prev" src="./../../static/img/next.svg" alt="">
                                    </v-touch>
                                    <v-touch tag="li" v-on:tap="play(playStatus)" v-on:press="play(playStatus)">
                                        <img v-show="playStatus == false" class="btn" src="./../../static/img/play.svg" alt="">
                                        <img v-show="playStatus" class="btn" src="./../../static/img/pause.svg" alt="">
                                    </v-touch>
                                    <v-touch tag="li" v-on:tap="next" v-on:press="next">
                                        <img class="next" src="./../../static/img/next.svg" alt="">
                                    </v-touch>
                                    <v-touch tag="li" v-on:tap="getListenLists" v-on:press="getListenLists">
                                        <img src="./../../static/img/listenLists.svg" alt="">
                                    </v-touch>
                                </ul>
                            </v-touch>
                        </div>
                    </li>
                </ul>
            </p>
        </actionsheet>
    </div>
</template>

<script>
import { Actionsheet, Range } from 'vux'
import { mapGetters } from 'vuex';
export default {
    name: 'play',
    data: () => ({
        RotateTimer: null,
        // 滑动到的时间节点
        newTime: 0,
        // 旋转角度
        rotate: 0
    }),
    mounted() {
    },
    computed: {
        ...mapGetters([
            'playShow',
            'playType',
            'musicDetail',
            // 播放状态
            'playStatus',
            // 歌曲总时间
            'musicDuration',
            // 歌曲当前时间
            'musicCurrentTime'
        ]),
        // 当前播放进度
        currentTime: {
            get() {
                return this.musicCurrentTime.musicCurrentTime / this.musicDuration * 100
            },
            set(newVal) {
            }
        }
    },
    methods: {
        // 旋转定时器
        transformRotate() {
            clearInterval(this.RotateTimer)
            this.RotateTimer = null
            this.RotateTimer = setInterval(() => {
                this.rotate += 0.5
            }, 30)
        },
        //滑动开始
        panstart() {
            this.$store.state.isTouchMove = true
        },
        // 滑动结束
        panend() {
            this.$store.state.isTouchMove = false
            this.$store.state.newTime = this.newTime
        },
        onChange(val) {
            this.newTime = this.musicDuration * val / 100
        },
        // 返回
        back() {
            this.$store.state.playShow = false
        },
        // 分享
        share() {
            this.$store.state.alertText = '暂不可用，敬请期待~'
            this.$store.commit('set_alertStatus', true)
        },
        // 切换播放模式
        togglePlayType() {
            this.$store.state.playType = this.playType == 'listloop' ? 'random' : 'listloop'
        },
        // 播放或暂停
        play(status) {
            this.$store.state.playStatus = !status
        },
        // 上一首
        prev() {
            this.$store.dispatch('set_next_or_prev_Music', 'prev')
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
    components: {
        Actionsheet,
        Range
    },
    watch: {
        playStatus(val) {
            if (val) {
                this.transformRotate()
            } else if (!val) {
                clearInterval(this.RotateTimer)
                this.RotateTimer = null
            }
        }
    }
}
</script>

<style lang="less">
#play {
    ul {
        height: 99vh;
        position: relative;
        li {
            list-style: none;
            height: 100%;
            .play-box {
                height: 90vh;
                background: transparent;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                .header {
                    position: fixed;
                    top: 15px;
                    width: 100%;
                    height: 50px;
                    z-index: 100;
                    background: transparent;
                    display: flex;
                    .back {
                        width: 50px;
                        height: 50px;
                        position: relative;
                        img {
                            width: 30px;
                            height: 30px;
                            position: absolute;
                            left: 0;
                            right: 0;
                            top: 0;
                            bottom: 0;
                            margin: auto;
                        }
                    }
                    .title {
                        position: absolute;
                        top: 10px;
                        left: 60px;
                        width: 80vw;
                        display: inline-block;
                        text-align: left;
                        marquee {
                            width: 65vw;
                        }
                        .top {
                            color: #FFF;
                            font-size: 13px;
                        }
                        .bottom {
                            margin-top: 1px;
                            font-size: 12px;
                        }
                    }
                    .share {
                        width: 50px;
                        height: 50px;
                        position: absolute;
                        right: 10px;
                        img {
                            width: 25px;
                            height: 25px;
                            position: absolute;
                            left: 0;
                            right: 0;
                            top: 0;
                            bottom: 0;
                            margin: auto;
                        }
                    }
                }
                .play-bg {
                    width: 100%;
                    height: 80%;
                    background-repeat: no-repeat;
                    background-size: 100% auto;
                    -webkit-transform: scale(1.5);
                    transform: scale(1.5);
                    -webkit-transform-origin: center top;
                    transform-origin: center top;
                    z-index: -1;
                    transition: opacity .3s linear;
                    filter: blur(20px);
                }
                .play-bg:after {
                    content: " ";
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 0;
                    background-color: rgba(0, 0, 0, .5);
                }
                .play-disc {
                    position: absolute;
                    z-index: 100;
                    top: 100px;
                    left: 0;
                    right: 0;
                    margin: auto;
                    width: 260px;
                    height: 260px;
                    background: url('./../../static/img/disc.png');
                    background-size: contain;
                    background-repeat: no-repeat;
                    .play-img {
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        width: 160px;
                        height: 160px;
                        border-radius: 50%;
                        overflow: hidden;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .play-disc-img {
                    position: absolute;
                    top: 30px;
                    left: 42%;
                    z-index: 100;
                    width: 84px;
                    height: 122px;
                    background: url('./../../static/img/disc1.png') no-repeat;
                    background-size: contain;
                }
                .progress-bar {
                    position: relative;
                    width: 85vw;
                    height: 50px;
                    margin-left: 4vw;
                    .range-quantity {
                        background: #2A78DC;
                    }
                    .range-handle {
                        width: 18px;
                        height: 18px;
                        top: -8px !important;
                    }
                    .range-min {
                        color: transparent;
                    }
                    .range-max {
                        color: transparent;
                    }
                    .currentTime {
                        position: absolute;
                        color: #ccc;
                        top: -6px;
                        left: 8px;
                        font-size: 12px;
                    }
                    .duration {
                        color: #333;
                        position: absolute;
                        top: -6px;
                        right: -13px;
                        font-size: 12px;
                    }
                }
                .play-bar {
                    margin-top: -20px;
                    ul {
                        overflow: hidden;
                        height: 50px;
                        li {
                            vertical-align: text-top;
                            display: inline-flex;
                            width: 18%;
                            align-items: center;
                            justify-content: center;
                            img {
                                width: 25px;
                                height: 25px;
                            }
                            .btn {
                                width: 35px;
                                height: 35px;
                            }
                            .prev {
                                width: 30px;
                                height: 30px;
                                transform: rotate(180deg)
                            }
                            .next {
                                width: 30px;
                                height: 30px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

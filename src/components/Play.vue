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
                                    <p class="top">{{ musicDetail.name }}</p>
                                    <p class="bottom">{{ musicDetail.ar[0].name }}</p>
                                </div>
                                <v-touch class="share" v-on:tap="share" v-on:press="share">
                                    <img src="./../../static/img/share.svg" alt="">
                                </v-touch>
                            </div>
                            <div class="play-bg" :style="'background-image: url(' + musicDetail.al.picUrl + ')'">
                            </div>
                            <div class="play-disc">
                                <div class="play-img">
                                    <img class="u-img" :src="musicDetail.al.picUrl">
                                </div>
                            </div>
                            <v-touch class="progress-bar" v-on:panend="panend">
                                <span class="currentTime">{{ Math.floor(musicCurrentTime.musicCurrentTime/60)+":"+(musicCurrentTime.musicCurrentTime%60/100).toFixed(2).slice(-2) }}</span>
                                <range v-model="currentTime" @on-change="onChange" @touchmove.native="setTime"></range>
                                <span class="duration">{{ Math.floor(musicDuration/60)+":"+(musicDuration%60/100).toFixed(2).slice(-2) }}</span>
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
        // 滑动到的时间节点
        newTime: 0
    }),
    computed: {
        ...mapGetters([
            'playShow',
            'musicDetail',
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
        panend() {
            console.log(this.newTime)
        },
        // 设置滑动的时间节点
        setTime() {
            // 判断是否手滑
            if (Math.abs(this.newTime - this.$store.state.musicCurrentTime) > 2) {
                this.$store.state.isTouchMove = true
                this.$store.state.newTime = this.newTime
            }
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
        }
    },
    components: {
        Actionsheet,
        Range
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
                    top: 10px;
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
                        .top {
                            color: #FFF;
                            font-size: 14px;
                        }
                        .bottom {
                            color: #333;
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
                    width: 280px;
                    height: 280px;
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
                        width: 180px;
                        height: 180px;
                        border-radius: 50%;
                        overflow: hidden;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .play-disc:after {
                    content: " ";
                    position: absolute;
                    top: -50px;
                    left: 135px;
                    z-index: 5;
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
                    .range-min {
                        color: transparent;
                    }
                    .range-max {
                        color: transparent;
                    }
                    .currentTime {
                        position: absolute;
                        color: #000;
                        top: -10px;
                        left: 8px;
                        font-size: 15px;
                    }
                    .duration {
                        position: absolute;
                        color: #000;
                        top: -10px;
                        right: -13px;
                        font-size: 15px;
                    }
                }
            }
        }
    }
}
</style>

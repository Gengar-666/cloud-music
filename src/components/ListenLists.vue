<template>
    <div id="listenLists">
        <actionsheet v-model="listenListStatus.listenListStatus">
            <p slot="header">
                <ul>
                    <li v-show="listenLists.length != 0" class="header">
                        <div class="toggle-btn" @click="togglePlayType">
                            <img v-show="playType == 'listloop'" src="./../../static/img/listloop.svg" alt="">
                            <img v-show="playType == 'random'" src="./../../static/img/random.svg" alt="">
                            <span>{{ playType == 'listloop' ? '列表循环' : '随机播放'}}</span>
                        </div>
                        <div class="delete-btn" @click="deleteAll">
                            <img src="./../../static/img/delete.svg" alt="">
                            <span>清空全部</span>
                        </div>
                    </li>
                    <li v-show="listenLists.length == 0" style="text-align: center;">试听列表暂无歌曲~</li>
                    <li class="list" v-for="(item, index) in listenLists" :key="index">
                        <div class="play" @click="playMusic(item.id)">
                            <img :src="item.picUrl" alt="">
                            <p>{{ item.musicName }}</p>
                            <span>{{ item.singer }}</span>
                        </div>
                        <img class="delete" src="./../../static/img/close.svg" alt="" @click="deleteMusic(item.id)">
                    </li>
                </ul>
            </p>
        </actionsheet>
    </div>
</template>

<script>
import { Actionsheet } from 'vux'
import { mapGetters } from 'vuex';
export default {
    name: 'listenLists',
    data: () => ({
    }),
    computed: {
        ...mapGetters([
            // 试听列表显示状态
            'listenListStatus',
            // 试听列表
            'listenLists',
            // 播放模式
            'playType'
        ])
    },
    methods: {
        // 播放试听列表歌曲
        playMusic(id) {
            this.$store.dispatch('get_musicDetail', id)
            this.$fetch.MusicUrl(id).then(res => {
                this.$store.dispatch('get_audioUrl', res.data[0])
            })
        },
        // 切换模仿模式
        togglePlayType() {
            this.$store.state.playType = this.playType == 'listloop' ? 'random' : 'listloop'
        },
        // 删除试听列表歌曲
        deleteMusic(id) {
            for (let i = 0; i < this.listenLists.length; i++) {
                if (this.listenLists[i].id === id) {
                    this.$store.state.listenLists.splice(i, 1)
                    localStorage.setItem('listenLists', JSON.stringify(this.$store.state.listenLists))
                }
            }
        },
        // 删除试听列表全部歌曲
        deleteAll() {
            this.$store.state.listenLists = []
            localStorage.removeItem('listenLists')
        }
    },
    components: { Actionsheet }
}
</script>

<style lang="less" scoped>
#listenLists {
    ul {
        position: relative;
        max-height: 380px;
        overflow: auto;
        padding-left: 10px;
        li {
            position: relative;
            height: 35px;
            text-align: left;
            margin-top: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            font-size: 13px;
            .play {
                position: relative;
                width: 80%;
            }
        }
        .list {
            img {
                width: 35px;
                height: 35px;
            }
            p {
                position: absolute;
                top: 3px;
                left: 45px;
                font-size: 13px;
                line-height: 10px;
            }
            span {
                position: absolute;
                bottom: 5px;
                left: 45px;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.6);
            }
            .delete {
                position: absolute;
                top: 0;
                right: 15px;
                width: 30px;
                height: 30px;
            }
        }
        .header {
            position: relative;
            margin-top: 1px;
            .delete-btn {
                position: absolute;
                top: 0;
                right: 5px;
                width: 100px;
                display: flex;
                align-items: center;
                span {}
                img {
                    width: 30px;
                    height: 30px;
                }
            }
            .toggle-btn {
                position: absolute;
                top: 3px;
                width: 120px;
                display: flex;
                align-items: center;
                img {
                    width: 30px;
                    height: 30px;
                    margin-left: 5px;
                }
                span {
                    margin-left: 5px;
                }
            }
        }
    }
}
</style>

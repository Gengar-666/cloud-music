<template>
    <div id="commen">
        <drawer :show="sidebarShow" :pos="pos" :tran="tran" @change-show="changeDrawerShow">
            <div class="sidebar" slot="drawer">
                <sidebar></sidebar>
            </div>
            <transition :name="transitionName">
                <slot></slot>
            </transition>
            <bubble></bubble>
            <playbar></playbar>
            <loading v-model="isLoading"></loading>
            <div v-transfer-dom>
                <alert v-model="alertStatus.alertStatus" title="提示" @on-hide="onHide"> {{ alertText }}</alert>
            </div>
            <div v-transfer-dom>
                <confirm v-model="confirmStatus.confirmStatus" title="提示" @on-cancel="onCancel" @on-confirm="onConfirm">
                    <p style="text-align:center;">{{ confirmText == 'login' ? '你还未登录，赶紧去登录吧~' : '确定退出吗？' }}</p>
                </confirm>
            </div>
            <actionsheet v-model="listenListStatus.listenListStatus" show-cancel>
                <p slot="header">
                    <ul>
                        <li v-show="listenLists.length != 0" class="header">
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
        </drawer>
    </div>
</template>

<script>
import {
    Loading,
    Alert,
    Confirm,
    Actionsheet,
    TransferDomDirective as TransferDom
} from 'vux'
import bubble from '@/components/Bubble'
import playbar from '@/components/Playbar'
import drawer from '@/components/drawer.vue'
import sidebar from '@/components/Sidebar'
import { mapGetters } from 'vuex';

export default {
    name: 'commen',
    data: () => ({
        // 侧边栏方向
        pos: 'left',
        // 过渡效果类型
        tran: 'push'
    }),
    directives: {
        TransferDom
    },
    computed: {
        ...mapGetters([
            // 过渡效果
            'transitionName',
            // 加载状态是否显示
            'isLoading',
            // 弹窗提示是否显示
            'alertStatus',
            // 弹窗提示文字
            'alertText',
            // confirm弹窗提示文字
            'confirmText',
            // confirm弹窗是否显示
            'confirmStatus',
            // 左侧菜单是否显示
            'sidebarShow',
            // 试听列表显示状态
            'listenListStatus',
            // 试听列表
            'listenLists'
        ])
    },
    mounted() {
        this.$store.dispatch('handleClickMusic', 405612296)
    },
    methods: {
        // 播放试听列表歌曲
        playMusic(id) {
            this.$store.dispatch('get_musicDetail', id)
            this.$fetch.MusicUrl(id).then(res => {
                this.$store.dispatch('get_audioUrl', res.data[0])
            })
        },
        // 删除试听列表歌曲
        deleteMusic(id) {
            for (let i = 0; i < this.listenLists.length; i++) {
                if (this.listenLists[i].id === id) {
                    console.log(i)
                    this.$store.state.listenLists.splice(i, 1)
                }
            }
        },
        // 删除试听列表全部歌曲
        deleteAll() {
            this.$store.state.listenLists = []
        },
        // 网络错误弹窗确定按钮判断是否后退
        onHide() {
            this.$store.commit('set_alertStatus', false)
        },
        // 登录或退出弹窗
        onCancel() {
            this.$store.commit('set_confirmStatus', false)
            this.$route.path == '/user' && this.user.code == 200 ? this.$router.go(-1) : ''
        },
        // 登录或退出弹窗
        onConfirm() {
            if (this.confirmText == 'sign_out') {
                this.$store.state.user = ''
                localStorage.removeItem('user')
            }
            this.$store.commit('set_confirmStatus', false)
            this.$router.push('/login')
        },
        // 显示侧边栏
        drawerToggle() {
            this.drawerShow = !this.drawerShow
        },
        // 点击遮罩层关闭侧边栏
        changeDrawerShow(state) {
            this.$store.state.sidebarShow = state
        }
    },
    components: {
        bubble,
        playbar,
        Loading,
        Alert,
        Confirm,
        drawer,
        sidebar,
        Actionsheet
    }
}
</script>

<style lang="less" scoped>
#commen {
    width: 100%;
    height: 100%;
    .sidebar {
        width: 160px;
    }
    ul {
        position: relative;
        max-height: 300px;
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
        }
    }
}
</style>

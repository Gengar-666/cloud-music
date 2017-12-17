<template>
    <div id="song-sheet">
        <div class="tag">
        </div>
        <p class="title">{{ title }}</p>
        <div id="song-sheet-box">
            <ul class="song-list">
                <li class="song-item" v-for="(item, index) in songsheet" :key="index">
                    <router-link :to="{name:'songsheetDetail', query:{id:item.id}}">
                        <div class="pic-wrap">
                            <img v-lazy="item.picUrl" alt="">
                        </div>
                    </router-link>
                    <p class="text">{{ item.name }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data: () => ({
        title: '推荐歌单'
    }),
    mounted() {
        this.get_songsheet()
    },
    computed: {
        ...mapGetters([
            //推荐歌单
            'songsheet'
        ])
    },
    methods: {
        // 获取推荐歌单
        ...mapActions(['get_songsheet'])
    }
}
</script>

<style lang="less" scoped>
#song-sheet {
    zoom: 1;
    position: relative;
    .tag {
        position: absolute;
        top: 0.5rem;
    }
    .title {
        width: 68px;
        text-align: center;
        padding: 5px 0 5px 0;
        color: #666;
        font-size: 13px;
        margin-left: 1rem;
        margin-top: 1.1rem;
        margin-bottom: 0.5rem;
        border-bottom: 1px solid #ccc;
    }
    #song-sheet-box {
        width: 100%;
        ul {
            list-style: none;
            li {
                width: 33.3%;
                float: left;
                padding: 0 10px;
                box-sizing: border-box;
                margin-top: 10px;
                font-size: 13px;
                p {
                    font-size: 12px;
                    height: 35px;
                }
                .pic-wrap {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    img {
                        width: 100%;
                    }
                }
                .text {
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}
</style>
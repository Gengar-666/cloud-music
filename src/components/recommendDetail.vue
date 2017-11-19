<template>
    <div class="song-sheet">
        <div class="tag">
        <img :src="tag" alt="">
        </div>
        <p class="title">{{ title }}</p>
        <div id="recommend">
            <ul class="song-list">
                <li class="song-item" v-for="item in recommendSongList">
                    <router-link :to="{name:'songSheetList',params:{detailId:item.id}}" >
                        <div class="pic-wrap">
                            <img :src="item.picUrl" alt="">
                            <span class="fire" :style="{ backgroundImage: 'url(' + img + ')' }"></span>
                            <span class="play" :style="{ backgroundImage: 'url(' + img + ')' }"></span>
                        </div>
                    </router-link>
                    <p>{{ item.name }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import tag from './../../static/img/tag4.jpg'
import img from './../../static/img/sprites.png'
import { mapState } from 'vuex'
export default {
    props: ['songSheet'],
    data() {
        return {
            title: '推荐歌单',
            tag,
            img
        }
    },
    computed: {
        ...mapState({
            //推荐歌单
            recommendSongList: state => state.recommendSongList
        })
    }
}
</script>

<style scoped>
.song-sheet {
    overflow: auto;
    zoom: 1;
    position: relative
}

.song-sheet .tag {
    position: absolute;
    top: 0.5rem;
}

.song-sheet img {
    width: 50px;
}

.title {
    width: 68px;
    text-align: center;
    padding: 5px 0 5px 0;
    color: #666;
    font-size: 15px;
    margin-left: 3rem;
    margin-top: 1.1rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #ccc;
}

#recommend {
    width: 100%;
}

ul {
    list-style: none;
}

ul li {
    width: 33.3%;
    float: left;
    padding: 0 10px;
    box-sizing: border-box;
    margin-top:10px;
}
ul li {
    font-size: 13px;
}
ul li p {
    height: 35px;
}
.pic-wrap {
    width: 100%;
    height: 100%;
    position: relative;
}

.pic-wrap img {
    width: 100%;
}

.fire {
    display: block;
    background-position: -162px -215px;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 22px;
    height: 22px;
    background-size: 320px;
    background-repeat: no-repeat;
}

.play {
    display: block;
    background-position: 0px -265px;
    position: absolute;
    top: 68px;
    left: 6px;
    width: 40px;
    height: 40px;
    background-size: 250px;
    background-repeat: no-repeat;
}
</style>
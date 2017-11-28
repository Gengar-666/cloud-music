<template>
    <div id="search-list">
        <p class="search-title">
            {{ "搜索"+'"'+keyword+'"' }}
        </p>
        <ul>
            <li v-for="(item, index) in result" class="search-item" :key="index" @click="getMusicUrl(item.id)">
                <img :src="item.album.blurPicUrl" alt="">
                <p class="name">{{ item.name }}</p>
                <span>{{ item.artists[0].name }}-{{ item.album.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['keyword', 'result'],
    data: () => ({
    }),
    mounted() {
        console.log(this.result)
    },
    methods: {
        getMusicUrl(id) {
            // 获取歌曲Url
            this.$store.dispatch('get_musicDetail', id)
            this.$fetch.MusicUrl(id).then(res => {
                this.$store.dispatch('get_audioUrl', res.data[0])
                this.$store.dispatch('add_ListenLists', res.data[0])
            })
        }
    }
}
</script>

<style lang="less" scoped>
#search-list {
    margin-bottom: 60px;
    height: 66vh;
    .search-title {
        position: fixed;
        width: 100%;
        top: 52px;
        height: 50px;
        margin-left: 10px;
        padding-right: 10px;
        font-size: 12px;
        line-height: 50px;
        color: #507daf;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        z-index: 1000;
        background: #FFF;
    }
    ul {
        margin-top: 100px;
        .search-item {
            position: relative;
            -webkit-box-align: center;
            align-items: center;
            height: 45px;
            margin-left: 10px;
            font-size: 14px;
            border-bottom: 1px solid rgba(0, 0, 0, .1);
            padding-top: 5px;
            img {
                width: 40px;
                height: 40px;
                position: absolute;
            }
            .name {
                height: 50%;
                color: #333;
                margin-left: 50px;
                font-size: 13px;
            }
            span {
                display: inline-block;
                width: 85%;
                height: 50%;
                font-size: 12px;
                color: rgba(0, 0, 0, .6);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-left: 50px;
            }
        }
    }
}
</style>

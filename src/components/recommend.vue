<template>
    <div class="recommend">
        <banner></banner>
        <songSheet></songSheet>
        <newSongs></newSongs>
    </div>
</template>

<script>
import banner from "./banner"
import songSheet from './recommendDetail'
import newSongs from './newSongs'
export default {
    name: 'home',
    data() {
        return {
            active: 0,
            tabs: [{
                title: '推荐',
            }, {
                title: '排行榜',
            }, {
                title: '搜索',
            }],
        }
    },
    created () {
        this.$store.dispatch('get_recommendSongList');
    },
    methods: {
        //导航切换
        toggle(i) {
            this.active = i;
        }
    },
    components: {
        banner,
        songSheet,
        newSongs
    }
}
</script>

<style scoped>

</style>
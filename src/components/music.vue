<template>
    <div id="music">
        <audio :src="musicUrl" @canplay="playMusic" ref="player" loop="loop"></audio>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'music',
    data() {
        return {}
    },
    computed: {
        ...mapState({
            //音乐url
            musicUrl: state => state.musicUrl,
            //播放状态
            playStatus: state => state.playStatus
        })
    },
    methods: {
        //播放音乐
        playMusic() {
            //设置播放状态
            this.$store.commit('set_playStatus', true);
            //播放歌曲
            this.$refs.player.play();
        }
    },
    watch: {
        //监听歌曲播放状态
        playStatus(state) {
            if (state != false) {
                this.$nextTick(() => {
                    this.$refs.player.play();
                    console.log(state)
                })
            } else {
                this.$refs.player.pause();
            }
        }
    }
}
</script>

export default {
    //设置推荐歌单
    set_recommendSongList(state, payload) {
        state.recommendSongList = payload;
    },
    //设置最新音乐
    set_newSongsList(state, payload) {
        state.newSongsList = payload;
    },
    //设置云音乐飙升榜
    set_cloudTopList(state, payload) {
        state.cloudTopList.banner = payload.coverImgUrl;
        state.cloudTopList.tarcks = payload.tracks;
    },
    //设置搜索列表
    set_searchList(state, payload) {
        state.searchList = payload;
    },
    //设置音乐url
    set_musicUrl(state, payload) {
        state.musicUrl = payload;
        state.playListShow = true;
    },
    //设置歌曲详情
    set_songDetail(state, payload) {
        state.songDetail = payload;
    },
    //设置播放状态
    set_playStatus(state, payload) {
        state.playStatus = payload;
    }
}

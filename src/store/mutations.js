export default {
    // 设置当前点击播放歌曲
    set_audioUrl(state, music) {
        state.audioUrl = music
    },
    // 设置试听列表
    set_ListenLists(state, music) {
        state.listenLists.push(music)
    },
    //设置推荐歌单
    set_songsheet(state, payload) {
        state.songsheet = payload;
    },
    //设置歌单详情
    set_songsheetDetail(state, payload) {
        state.songsheetDetail = payload
    },
    //设置最新音乐
    set_musicList(state, payload) {
        state.musicList = payload;
    },
    //设置云音乐排行榜歌单
    set_MusicRankDetail(state, payload) {
        state.rankDetail = payload
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
    set_musicDetail(state, payload) {
        state.musicDetail = payload;
    },
    //设置播放状态
    set_playStatus(state, payload) {
        state.playStatus = payload;
    },
    addRouteChain(state, route) {
        state.routeChain.push(route);
    },
    popRouteChain(state) {
        state.routeChain.pop();
    },
    settransitionName(state, dir) {
        state.transitionName = dir;
    }
}

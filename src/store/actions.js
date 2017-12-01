import fetch from '@/api'
export default {
    // 点击歌曲之后的处理
    handleClickMusic({ dispatch, commit }, id) {
        dispatch('get_musicDetail', id)
        fetch.MusicUrl(id).then(res => {
            dispatch('get_audioUrl', res.data[0])
            commit('set_playStatus', id);
        })
    },
    // 获取当前点击歌曲url
    get_audioUrl({ commit }, music) {
        commit('set_audioUrl', music)
    },
    // 添加试听列表
    add_ListenLists({ commit }, music) {
        commit('set_ListenLists', music)
    },
    //获取推荐歌单
    get_songsheet({ commit }) {
        fetch.Recommend().then(res => {
            commit('set_songsheet', res.result)
        })
    },
    //获取最新音乐
    get_newSongsList({ commit }) {
        fetch.Newsong().then(res => {
            commit('set_musicList', res.result)
        })
    },
    //获取推荐歌单详情
    get_songsheetDetail({ commit }, id) {
        fetch.SongsheetDetail(id).then(res => {
            commit('set_songsheetDetail', res.playlist)
        })
    },
    //获取云音乐排行榜
    get_MusicRankDetail({ commit }, idx) {
        fetch.MusicRank(idx).then(res => {
            commit('set_MusicRankDetail', res.result)
        })
    },
    //获取搜索列表
    get_searchList({ commit }, keywords) {
        fetch.Search(keywords).then(res => {
            commit('set_searchList', res.result.songs)
        })
    },
    //获取歌曲详情
    get_musicDetail({ dispatch, commit }, ids) {
        fetch.MusicDetail(ids).then(res => {
            const music = {
                id: res.songs[0].id,
                musicName: res.songs[0].name,
                picUrl: res.songs[0].al.picUrl,
                singer: res.songs[0].ar[0].name
            }
            dispatch('add_ListenLists', music)
            commit('set_musicDetail', res.songs[0])
        })
    },
    //获取播放状态
    get_playStatus(state, payload) {
        state.playStatus = payload;
    }
}
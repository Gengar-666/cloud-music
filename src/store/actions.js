import fetch from '@/api'
export default {
    //获取当前点击歌曲url
    get_audioUrl({commit}, music) {
        commit('set_audioUrl', music)
    },
    // 添加试听列表
    add_ListenLists({commit}, music) {
        commit('set_ListenLists', music)
    },
    //获取推荐歌单
    get_songsheet({commit}) {
        fetch.Recommend().then(res => {
            commit('set_songsheet',res.result)
        })
    },
    //获取最新音乐
    get_newSongsList({commit}) {
        fetch.Newsong().then(res => {
            commit('set_musicList',res.result)
        })
    },
    //获取推荐歌单详情
    get_songsheetDetail({commit}, id) {
        fetch.SongsheetDetail(id).then(res => {
            commit('set_songsheetDetail',res.playlist)
        })
    },
    //获取云音乐排行榜
    get_MusicRankDetail({commit}, idx) {
        fetch.MusicRank(idx).then(res => {
            commit('set_MusicRankDetail', res.result)
        })
    },
    //获取搜索列表
    get_searchList({commit}, keywords) {
        fetch.Search(keywords).then(res => {
            console.log(res)
            commit('set_searchList', res.result.songs)
        })
    },
    // //获取音乐url
    // get_musicUrl(context) {
    //     ajax.get(API + '/music/url?id=' + MUSIC_ID)
    //         .then(data => {
    //             context.commit('set_musicUrl',data.data[0].url);

    //             //解决移动4G网络下不能自动播放和第一下点击不会播放的问题
    //             context.commit('set_playStatus',MUSIC_ID);
                
    //             context.dispatch('get_songDetail');
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // },
    //获取歌曲详情
    get_musicDetail({commit}, ids) {
        fetch.MusicDetail(ids).then(res => {
            commit('set_musicDetail',res.songs[0])
        })
    },
    //获取播放状态
    get_playStatus(state, payload) {
        state.playStatus = payload;
    }
}
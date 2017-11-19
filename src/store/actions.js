import ajax from './../api'
export default {
    //获取推荐歌单
    get_recommendSongList(context) {
        ajax.get(API + '/personalized')
            .then(data => {
                context.commit('set_recommendSongList',data.result);
            })
            .catch(err => {
                console.log(err);
            })
    },
    //获取最新音乐
    get_newSongsList(context) {
        ajax.get(API + '/personalized/newsong')
            .then(data => {
                context.commit('set_newSongsList',data.result);
            })
            .catch(err => {
                console.log(err);
            })
    },
    //获取云音乐飙升榜
    get_cloudTopList(context) {
        ajax.get(API + '/top/list?idx=3')
            .then(data => {
                context.commit('set_cloudTopList',data.result);
            })
            .catch(err => {
                console.log(err);
            })
    },
    //获取搜索列表
    get_searchList(context) {
        ajax.get(API + '/search?keywords=' + KEYWORD)
            .then(data => {
                console.log(data)
                context.commit('set_searchList',data.result.songs);
            })
            .catch(err => {
                console.log(err);
            })
    },
    //获取音乐url
    get_musicUrl(context) {
        ajax.get(API + '/music/url?id=' + MUSIC_ID)
            .then(data => {
                context.commit('set_musicUrl',data.data[0].url);

                //解决移动4G网络下不能自动播放和第一下点击不会播放的问题
                context.commit('set_playStatus',MUSIC_ID);
                
                context.dispatch('get_songDetail');
            })
            .catch(err => {
                console.log(err);
            })
    },
    //获取歌曲详情
    get_songDetail(context) {
        ajax.get(API + '/song/detail?ids=' + MUSIC_ID)
            .then(data => {
                console.log(data)
                context.commit('set_songDetail',data.songs[0]);
                // context.playListShow = true;
            })
            .catch(err => {
                console.log(err);
            })
    },
    //获取播放状态
    get_playStatus(state, payload) {
        state.playStatus = payload;
    }
}
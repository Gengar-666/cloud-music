export default {
    // 设置当前点击播放歌曲
    set_audioUrl(state, music) {
        state.audioUrl = music
    },
    // 设置试听列表
    set_ListenLists(state, music) {
        let flag = true
        for (let i = 0; i < state.listenLists.length; i++) {
            if (state.listenLists[i].id == music.id) {
                flag = false
                break
            }
        }
        if (flag) {
            state.listenLists.unshift(music)
            localStorage.setItem('listenLists', JSON.stringify(state.listenLists))
        }
    },
    //设置推荐歌单
    set_songsheet(state, payload) {
        state.songsheet = payload;
    },
    //设置歌单详情
    set_songsheetDetail(state, payload) {
        payload.tracks.forEach((item, i) => {
            const obj = {
                id: item.id,
                name: item.name,
                singerName: `${item.ar[0].name} - ${item.al.name}`
            }
            state.songsheetDetail.push(obj)
        })
        state.songsheetDetail.coverImgUrl = payload.coverImgUrl
        state.songsheetDetail.name = payload.name
        state.songsheetDetail.avatarUrl = payload.creator.avatarUrl
        state.songsheetDetail.nickname = payload.creator.nickname
        state.songsheetDetail.description = payload.description
        state.songsheetDetail.tags = payload.tags
    },
    //设置最新音乐
    set_newMusicList(state, payload) {
        payload.forEach((item, i) => {
            const obj = {
                id: item.song.id,
                name: item.name,
                blurPicUrl: item.song.album.blurPicUrl,
                singerName: item.song.artists[0].name
            }
            state.newMusicList.push(obj)
        })
    },
    //设置云音乐排行榜歌单
    set_MusicRankDetail(state, payload) {
        payload.tracks.forEach((item, i) => {
            const obj = {
                id: item.id,
                name: item.album.name,
                singerName: `${item.album.artists[0].name} - ${item.album.name}`
            }
            state.rankDetail.push(obj)
        })
        state.rankDetail.coverImgUrl = payload.coverImgUrl
        state.rankDetail.name = payload.name
        state.rankDetail.avatarUrl = payload.creator.avatarUrl
        state.rankDetail.nickname = payload.creator.nickname
        state.rankDetail.description = payload.description
    },
    //设置搜索列表
    set_searchList(state, payload) {
        payload.forEach((item, i) => {
            const obj = {
                id: item.id,
                name: item.name,
                blurPicUrl: item.album.blurPicUrl,
                singerName: `${item.artists[0].name} - ${item.album.name}`
            }
            state.searchList.push(obj)
        })
    },
    //设置音乐url
    set_musicUrl(state, payload) {
        state.musicUrl = payload;
        state.playListShow = true;
    },
    //设置歌曲详情
    set_musicDetail(state, payload) {
        console.log(payload)
        state.musicDetail = payload;
    },
    //设置当前播放歌曲歌词
    set_musicLrc(state, Lyric) {
        if (Lyric == 'nolyric') {
            state.Lyric = []
        } else {
            state.nowLrcIndex = 0
            state.nowLrcTop = 0
            // 把时间转换成毫秒
            let newLyric = []
            let arr = Lyric.split('\n')
            arr.map(i => {
                let newArr = i.split(']')
                newArr[0] = ((newArr[0].substring(1, 3) * 60 + newArr[0].substring(4) * 1).toFixed(2))
                if (newArr[1] !== '') {
                    const obj = {
                        time: newArr[0],
                        lrc: newArr[1]
                    }
                    newLyric.push(obj)
                }
            })
            state.Lyric = newLyric
        }
    },
    //设置播放状态
    set_playStatus(state, payload) {
        state.playStatus = payload;
    },
    //设置弹窗提示状态
    set_alertStatus(state, payload) {
        state.alertStatus = payload
    },
    //设置confirm弹窗状态
    set_confirmStatus(state, payload) {
        state.confirmStatus = payload
    },
    /* 设置路由前进后退的效果 */
    addRouteChain(state, route) {
        state.routeChain.push(route);
    },
    popRouteChain(state) {
        state.routeChain.pop();
    },
    settransitionName(state, dir) {
        state.transitionName = dir;
    }
    /* end */
}

import Vue from 'vue'
import Vuex from 'vuex'
import fetch from '@/api'
import router from '@/router'
import * as types from './types'

const state = {
    // 用户信息
    user: JSON.parse(localStorage.getItem('user')) || {
        profile: {
            backgroundUrl: null
        }
    },
    // 用户详细信息
    userDetail: JSON.parse(localStorage.getItem('userDetail')) || {
        profile: {
            followeds: null
        }
    },
    // 用户歌单
    userPlayList: JSON.parse(localStorage.getItem('userPlayList')) || {
        playlist: []
    },
    // 热门搜索
    hotSearchList: [{
        name: '火影忍者'
    }, {
        name: 'Wind Of Change'
    }, {
        name: '水星记'
    }, {
        name: '大鱼'
    }, {
        name: '像风一样'
    }, {
        name: '我想'
    }, {
        name: '给未来的自己'
    }, {
        name: '成全'
    }, {
        name: '残酷月光'
    }, {
        name: '骂醒我'
    }],
    // 是否加载状态
    isLoading: false,
    // 是否显示弹窗提示
    alertStatus: false,
    // 是否显示confirm弹窗
    confirmStatus: false,

    /* 判断前进后退 */
    count: 1,
    transitionName: 'slide-right',
    routeChain: [],
    /* END */

    // 弹窗提示文字
    alertText: '',
    // confirm弹窗提示文字
    confirmText: '',
    // 侧边栏显示状态
    sidebarShow: false,
    // 试听列表显示状态
    listenListStatus: false,
    // 播放页是否显示
    playShow: true,
    // 导航下标位置
    activeTab: 0,
    // 试听列表
    listenLists: JSON.parse(localStorage.getItem('listenLists')) || [
        {
            "id": 202360,
            "musicName": "骂醒我",
            "picUrl": "http://p1.music.126.net/4SNgD8XFxmkMpfg700cZPw==/60473139544728.jpg",
            "singer": "周汤豪"
        }, {
            "id": 523533641,
            "musicName": "残酷月光（再传一次我就不信这个邪）",
            "picUrl": "http://p1.music.126.net/rnLCGSXHIT1wx7VSZvbTUA==/109951163033938440.jpg",
            "singer": "leegof"
        }, {
            "id": 512384678,
            "musicName": "成全（Cover 刘若英）",
            "picUrl": "http://p1.music.126.net/CGQc6fxsaCaLMq58gqSGYA==/109951163033894325.jpg",
            "singer": "Fiveonesix"
        }, {
            "id": 176028,
            "musicName": "给未来的自己(Live) - live",
            "picUrl": "http://p1.music.126.net/_Pg1PySV1Ot9MYN7g39G9w==/78065325577768.jpg",
            "singer": "杨宗纬"
        }, {
            "id": 407435011,
            "musicName": "我想",
            "picUrl": "http://p1.music.126.net/O6d7GYY3gp2uy8zehvcOjQ==/17699938184267410.jpg",
            "singer": "余佳运"
        }, {
            "id": 516657051, "musicName": "像风一样",
            "picUrl": "http://p1.music.126.net/fNbj5uDwltSDLbETdnEYYQ==/109951163069265719.jpg",
            "singer": "薛之谦"
        }, {
            "id": 413812448,
            "musicName": "大鱼",
            "picUrl": "http://p1.music.126.net/aiPQXP8mdLovQSrKsM3hMQ==/1416170985079958.jpg",
            "singer": "周深"
        }, {
            "id": 441491828,
            "musicName": "水星记",
            "picUrl": "http://p1.music.126.net/wSMfGvFzOAYRU_yVIfquAA==/2946691248081599.jpg",
            "singer": "郭顶"
        }, {
            "id": 28765012,
            "musicName": "Wind Of Change",
            "picUrl": "http://p1.music.126.net/Hyw3w51X-y-0hUXeT_hFoA==/3264450024433087.jpg",
            "singer": "Susan Wong"
        }, {
            "id": 405597568,
            "musicName": "山外小楼夜听雨",
            "picUrl": "http://p1.music.126.net/L8SZ53Nf5le4JDvG6qVB6g==/1424967072083597.jpg",
            "singer": "任然"
        }
    ],
    // 播放模式
    playType: 'listloop',
    // 当前播放歌曲Url
    audioUrl: '',
    // 推荐歌单
    songsheet: [],
    // 最新音乐列表
    newMusicList: [],
    // 歌单详情
    songsheetDetail: [],
    // 搜索列表
    searchList: [],
    // 歌曲详情
    musicDetail: [],
    // 排行榜歌单详情
    rankDetail: [],
    // 歌手单曲
    singerSong: {},
    // 专辑旋转角度
    rotate: 0,
    // 音乐歌词
    Lyric: '',
    // 当前歌词下标
    nowLrcIndex: '',
    // 当前歌词位置
    nowLrcTop: 0,
    // 播放状态
    playStatus: false,
    // 歌曲总时间
    musicDuration: 0,
    // 歌曲当前时间
    musicCurrentTime: 0,
    // 是否滑动播放进度条
    isTouchMove: false,
    // 滑动进度条后的时间节点
    newTime: 0,
    // 是否当前音乐
    curMusic: '',
    // 底部播放列表开关
    songListStatus: false
}

const getters = {
    user: state => state.user,
    userDetail: state => state.userDetail,
    userPlayList: state => state.userPlayList,
    isLoading: state => state.isLoading,
    alertStatus: state => state,
    confirmStatus: state => state,
    count: state => state.count,
    transitionName: state => state.transitionName,
    routeChain: state => state.routeChain,
    alertText: state => state.alertText,
    confirmText: state => state.confirmText,
    sidebarShow: state => state.sidebarShow,
    listenListStatus: state => state,
    playShow: state => state.playShow,
    activeTab: state => state.activeTab,
    listenLists: state => state.listenLists,
    playType: state => state.playType,
    audioUrl: state => state.audioUrl,
    songsheet: state => state.songsheet,
    newMusicList: state => state.newMusicList,
    songsheetDetail: state => state.songsheetDetail,
    hotSearchList: state => state.hotSearchList,
    searchList: state => state.searchList,
    musicDetail: state => state.musicDetail,
    rankDetail: state => state.rankDetail,
    singerSong: state => state.singerSong,
    rotate: state => state.rotate,
    Lyric: state => state.Lyric,
    nowLrcIndex: state => state.nowLrcIndex,
    nowLrcTop: state => state.nowLrcTop,
    playStatus: state => state.playStatus,
    musicDuration: state => state.musicDuration,
    musicCurrentTime: state => state,
    isTouchMove: state => state.isTouchMove,
    newTime: state => state.newTime,
    curMusic: state => state.curMusic,
    songListStatus: state => state.songListStatus
}

const actions = {
    // 点击歌曲之后的处理
    handleClickMusic({ dispatch, commit }, id) {
        dispatch('get_musicLrc', id)
        dispatch('get_musicDetail', id)
        fetch.MusicUrl(id).then(res => {
            dispatch('get_audioUrl', res.data[0])
            commit(types.SET_PLAY_STATUS, id)
        })
    },
    // 获取当前点击歌曲url
    get_audioUrl({ commit }, music) {
        commit(types.SET_AUDIO_URL, music)
    },
    // 添加试听列表
    add_ListenLists({ commit }, music) {
        commit(types.SET_LISTEN_LISTS, music)
    },
    //获取推荐歌单
    get_songsheet({ commit }) {
        fetch.Recommend().then(res => {
            commit(types.SET_RECOMMEND_SONGSHEET, res.result)
        })
    },
    //获取最新音乐
    get_newSongsList({ commit }) {
        fetch.Newsong().then(res => {
            commit(types.SET_NEW_MUSIC_LIST, res.result)
        })
    },
    //获取歌单详情
    get_songsheetDetail({ commit }, id) {
        fetch.SongsheetDetail(id).then(res => {
            commit(types.SET_SONGSHEET_DETAIL, res.playlist)
        })
    },
    //获取云音乐排行榜歌单详情
    get_MusicRankDetail({ commit }, idx) {
        fetch.MusicRank(idx).then(res => {
            commit(types.SET_MUSIC_RANk_DETAIL, res.result)
        })
    },
    //获取搜索列表
    get_searchList({ commit }, keywords) {
        fetch.Search(keywords).then(res => {
            commit(types.SET_SEARCH_LIST, res.result.songs)
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
            commit(types.SET_MUSIC_DETAIL, res.songs[0])
        })
    },
    //获取歌词
    get_musicLrc({ commit }, id) {
        fetch.GetLRC(id).then(res => {
            if (res.nolyric) {
                commit(types.SET_MUSIC_LRC, 'nolyric')
            } else {
                commit(types.SET_MUSIC_LRC, res.lrc.lyric)
            }
        })
    },
    //下一首
    set_next_or_prev_Music(store, type) {
        let id = null
        let musicList = []
        store.state.listenLists.map(i => {
            musicList.push(i)
        })
        // 是否列表随机
        if (store.state.playType == 'random') {
            for (var i = musicList.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i - 0 + 1) + 0)
                var t = musicList[i]
                musicList[i] = musicList[j]
                musicList[j] = t
            }
        }
        if (type == 'next') {
            for (let i = 0; i < musicList.length; i++) {
                // 判断是不是最后一首
                if (i === musicList.length - 1) {
                    id = musicList[0].id
                    break
                }
                // 获取下一首歌曲
                if (musicList[i].id === store.state.musicDetail.id) {
                    id = musicList[i + 1].id
                    break
                }
            }
        } else if (type == 'prev') {
            for (let i = 0; i < musicList.length; i++) {
                // 判断是不是最后一首
                if (i === musicList.length - 1) {
                    id = musicList[0].id
                    break
                }
                // 获取下一首歌曲
                if (musicList[i].id === store.state.musicDetail.id) {
                    id = musicList[i - 1].id
                    break
                }
            }
        }
        store.dispatch('handleClickMusic', id)
    }
}

const mutations = {
    //设置播放状态
    [types.SET_PLAY_STATUS](state, payload) {
        state.playStatus = payload;
    },
    //设置弹窗提示状态
    [types.SET_ALERT_STATUS](state, payload) {
        state.alertStatus = payload
    },
    //设置confirm弹窗状态
    [types.SET_CONFIRM_STATUS](state, payload) {
        state.confirmStatus = payload
    },
    /* 设置路由前进后退的效果 */
    [types.ADD_ROUTE_CHAIN](state, route) {
        state.routeChain.push(route);
    },
    [types.POP_ROUTE_CHAIN](state) {
        state.routeChain.pop();
    },
    [types.SET_TRANSITION_NAME](state, dir) {
        state.transitionName = dir;
    },
    /* end */
    // 设置当前点击播放歌曲
    [types.SET_AUDIO_URL](state, music) {
        state.audioUrl = music
    },
    // 设置试听列表
    [types.SET_LISTEN_LISTS](state, music) {
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
    [types.SET_RECOMMEND_SONGSHEET](state, payload) {
        state.songsheet = payload;
    },
    //设置歌单详情
    [types.SET_SONGSHEET_DETAIL](state, payload) {
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
    [types.SET_NEW_MUSIC_LIST](state, payload) {
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
    [types.SET_MUSIC_RANk_DETAIL](state, payload) {
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
    [types.SET_SEARCH_LIST](state, payload) {
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
    //设置歌曲详情
    [types.SET_MUSIC_DETAIL](state, payload) {
        state.musicDetail = payload;
    },
    //设置当前播放歌曲歌词
    [types.SET_MUSIC_LRC](state, Lyric) {
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
    }
}

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
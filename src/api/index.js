import axios from 'axios'
import qs from 'qs'
import store from '@/store'

// 配置默认请求超时
axios.defaults.timeout = 12000
// 配置默认接口地址
// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.baseURL = 'http://106.14.151.175:3000'

export const fetchGet = (url, para) => {
    store.state.isLoading = true
    return new Promise((resolve, reject) => {
        axios.get(url, { params: para })
            .then(res => {
                setTimeout(() => {
                    store.state.isLoading = false
                }, 500)
                resolve(res.data)
            }, err => {
                reject(err)
                store.state.isLoading = false
                store.state.alertShow = true
            })
            .catch(err => {
                reject(err)
            })
    })
}

export default {
    axios,
    // 登录
    Login(params) {
        return fetchGet('login/cellphone', params)
    },
    // 获取用户详情
    UserDetail(uid) {
        return fetchGet('/user/detail', {uid})
    },
    // 获取用户信息,歌单，收藏，mv, dj 数量
    UserSubcount() {
        return fetchGet('/user/subcount')
    },
    // 获取用户歌单
    UserPlaylist(uid) {
        return fetchGet('/user/playlist', {uid})
    },
    // 搜索
    Search(keywords) {
        return fetchGet('search', {keywords})
    },
    // 获取音乐 url
    MusicUrl(id) {
        return fetchGet('music/url', {id})
    },
    // 推荐歌单
    Recommend() {
        return fetchGet('personalized')
    },
    // 歌单详情
    SongsheetDetail(id) {
        return fetchGet('playlist/detail', {id})
    },
    // 最新音乐
    Newsong() {
        return fetchGet('personalized/newsong')
    },
    // 排行榜 0：新歌榜, 1：热歌榜, 2：原创歌曲榜, 3：飙升榜
    MusicRank(idx) {
        return fetchGet('top/list', {idx})
    },
    // 获取歌曲详情
    MusicDetail(ids) {
        return fetchGet('song/detail', {ids})
    }
}
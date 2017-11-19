//初始化按钮
import pause from './../../static/img/pause.svg'

export default {
  // 推荐歌单
  recommendSongList: '',
  // 最新音乐
  newSongsList: '',
  // 云音乐飙升榜
  cloudTopList: {
    'banner':'',
    'tracks':''
  },
  // 推荐歌单详情
  songListDetails: {
    'picUrl': '',
    'playCount': 0,
    'name': '',
    'creator': {
      'avatarUrl': ''
    },
    'tracks': []
  },
  // 搜索列表
  searchList: '',
  // 歌曲详情
  songDetail: '',
  // 歌手单曲
  singerSong: {
    'artist': {
      'picUrl': '',
      'name': ''
    }
  },
  // 歌手专辑
  Singeralbums: {

  },
  // 专辑内容
  albums: {
    'album': {
      'picUrl': '',
      'name': '',
      'info': {
        'likedCount': '',
        'commentCount': '',
        'shareCount': ''
      },
      'artist': {
        'name': ''
      }
    }
  },
  // 底部导航栏播放按钮状态
  playBtn: pause,
  // 音乐歌词
  Lyric: '[00:00.00]歌词加载中!',
  // 音乐url
  musicUrl: '',
  // 播放状态
  playStatus: false,
  // 歌曲总时间
  musicDuration: 0,
  // 歌曲当前时间
  musicCurtime: 0,
  // 是否当前音乐
  curMusic: '',
  // 底部播放列表开关
  songListStatus: false,
  // 加载状态
  isLoading: false
}
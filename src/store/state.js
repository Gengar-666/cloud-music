//初始化按钮
import pause from './../../static/img/pause.svg'

export default {
  // 是否加载状态
  isLoading: false,
  count: 1,
  transitionName: 'slide-right',
  routeChain: [],
  activeTab: 0,
  // 试听列表
  listenLists:[],
  // 当前播放歌曲Url
  audioUrl: '',
  // 推荐歌单
  songsheet: [],
  // 音乐列表
  musicList: [],
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
  // 歌手专辑
  Singeralbums: {},
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
  // 播放状态
  playStatus: false,
  // 歌曲总时间
  musicDuration: 0,
  // 歌曲当前时间
  musicCurtime: 0,
  // 是否当前音乐
  curMusic: '',
  // 底部播放列表开关
  songListStatus: false
}
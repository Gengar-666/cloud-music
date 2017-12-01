export default {
  // 用户信息
  user: state => state.user,
  // 用户详细信息
  userDetail: state => state.userDetail,
  // 用户歌单
  userPlayList: state => state.userPlayList,
  // 是否加载状态
  isLoading: state => state.isLoading,
  // 是否显示弹窗提示
  alertStatus: state => state,
  // 是否显示confirm弹窗
  confirmStatus: state => state,

  /* 判断前进后退 */
  count: state => state.count,
  transitionName: state => state.transitionName,
  routeChain: state => state.routeChain,
  /* END */

  // 弹窗提示文字
  alertText: state => state.alertText,
  // confirm弹窗提示文字
  confirmText: state => state.confirmText,
  // 侧边栏显示状态
  sidebarShow: state => state.sidebarShow,
  // 试听列表显示状态
  listenListStatus: state => state,
  // 导航下标位置
  activeTab: state => state.activeTab,
  // 试听列表
  listenLists: state => state.listenLists,
  // 当前播放歌曲Url
  audioUrl: state => state.audioUrl,
  // 推荐歌单
  songsheet: state => state.songsheet,
  // 音乐列表
  musicList: state => state.musicList,
  // 歌单详情
  songsheetDetail: state => state.songsheetDetail,
  // 搜索列表
  searchList: state => state.searchList,
  // 歌曲详情
  musicDetail: state => state.musicDetail,
  // 排行榜歌单详情
  rankDetail: state => state.rankDetail,
  // 歌手单曲
  singerSong: state => state.singerSong,
  // 底部导航栏播放按钮状态
  playBtn: state => state.playBtn,
  // 音乐歌词
  Lyric: state => state.Lyric,
  // 播放状态
  playStatus: state => state.playStatus,
  // 歌曲总时间
  musicDuration: state => state.musicDuration,
  // 歌曲当前时间
  musicCurtime: state => state.musicCurtime,
  // 是否当前音乐
  curMusic: state => state.curMusic,
  // 底部播放列表开关
  songListStatus: state => state.songListStatus
}
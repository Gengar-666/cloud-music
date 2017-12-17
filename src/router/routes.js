//登录
import Login from '@/pages/Login'
//布局
import Layout from '@/pages/Layout'
//推荐
import Recommend from '@/pages/Recommend'
//排行榜
import Rank from '@/pages/Rank'
//我的
import User from '@/pages/User'
//搜索
import Search from '@/pages/Search'
//歌单详情
import SongsheetDetail from '@/pages/SongsheetDetail'
//排行榜详情
import RankDetail from '@/pages/RankDetail'
// //播放页
// import Play from '@/pages/Play'
const routes = [
    {
        path: '/',
        redirect: '/recommend',
        component: Layout,
        children: [
            {
                path: '/recommend',
                name: 'recommend',
                component: Recommend
            },
            {
                path: '/rank',
                name: 'rank',
                component: Rank
            },
            {
                path: '/user',
                name: 'user',
                component: User
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/songsheet-detail',
        name: 'songsheetDetail',
        component: SongsheetDetail
    },
    {
        path: '/rank-detail',
        name: 'rankDetail',
        component: RankDetail
    }
]

export default routes
//登录
const Login = resolve => {
    require(['@/pages/Login'], resolve)
}
//布局
const Layout = resolve => {
    require(['@/pages/Layout'], resolve)
}
//推荐
const Recommend = resolve => {
    require(['@/pages/Recommend'], resolve)
}
//排行榜
const Rank = resolve => {
    require(['@/pages/Rank'], resolve)
}
//我的
const User = resolve => {
    require(['@/pages/User'], resolve)
}
//搜索
const Search = resolve => {
    require(['@/pages/Search'], resolve)
}
//歌单详情
const SongsheetDetail = resolve => {
    require(['@/pages/SongsheetDetail'], resolve)
}
//排行榜详情
const RankDetail = resolve => {
    require(['@/pages/RankDetail'], resolve)
}
const routes = [
    {
        path: '/',
        redirect: '/play',
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
    },
    {
        path: '/play',
        name: 'play',
        component: resolve => {
            require(['@/pages/Play'], resolve)
        }
    }
]

export default routes
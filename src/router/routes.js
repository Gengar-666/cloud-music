// 登录
import Login from '@/pages/Login'
// 布局
import Layout from '@/pages/Layout'

const routes = [
    {
        path: '/',
        redirect: '/login',
        component: Layout,
        children: [
            {
                path: '/recommend',
                name: 'recommend',
                component: resolve => {
                    require(['@/pages/Recommend'], resolve)
                }
            },
            {
                path: '/rank',
                name: 'rank',
                component: resolve => {
                    require(['@/pages/Rank'], resolve)
                }
            },
            {
                path: '/user',
                name: 'user',
                component: resolve => {
                    require(['@/pages/User'], resolve)
                }
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
        component: resolve => {
            require(['@/pages/Search'], resolve)
        }
    },
    {
        path: '/songsheet-detail',
        name: 'songsheetDetail',
        component: resolve => {
            require(['@/pages/SongsheetDetail'], resolve)
        }
    },
    {
        path: '/rank-detail',
        name: 'rankDetail',
        component: resolve => {
            require(['@/pages/RankDetail'], resolve)
        }
    }
]

export default routes
import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/routes'
import store from '@/store'

Vue.use(Router)

const router = new Router({ routes })

router.beforeEach((to, from, next) => {
    store.state.sidebarShow = false
    store.state.activeTab = to.path == '/recommend' ? 0 : to.path == '/rank' ? 1 : to.path == '/user' ? 2 : 0
    // 定义一个可以记录路由路径变化的数组，这里用在vuex，其实也可以用sessionStorage,或者在window.routeChain等变量
    // 不一定要用到vuex
    let routeLength = store.state.routeChain.length;
    if (routeLength === 0) {
        store.commit('settransitionName', 'fade');
        if (to.path === from.path && to.path === '/') {
            //当直接打开根路由的时候
            store.commit('addRouteChain', to);
        } else {
            //直接打开非根路由的时候其实生成了两个路径，from其实就是根路由
            store.commit('addRouteChain', from);
            store.commit('addRouteChain', to);
        }
    } else if (routeLength === 1) {
        store.commit('settransitionName', 'slide-left');
        store.commit('addRouteChain', to);
    } else {
        let lastBeforeRoute = store.state.routeChain[routeLength - 2];
        if (lastBeforeRoute.path === to.path) {
            store.commit('popRouteChain');
            store.commit('settransitionName', 'slide-right');
        } else {
            store.commit('addRouteChain', to);
            store.commit('settransitionName', 'slide-left');
        }
    }
    next();
});

export default router
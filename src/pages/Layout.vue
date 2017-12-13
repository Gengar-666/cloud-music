<template>
    <div id="layout">
        <navbar></navbar>
        <div id="content">
            <transition :name="transitionName">
                <keep-alive>
                    <router-view class="view"></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'layout',
    data: () => ({
    }),
    computed: {
        ...mapGetters([
            // 过渡效果
            'transitionName'
        ])
    },
    components: {
        navbar: resolve => {
            require(['@/components/Navbar'], resolve)
        }
    }
}
</script>

<style lang="less" scoped>
#layout {
    #content {
        width: 100%;
        height: 75vh;
        overflow-y: auto;
        position: relative;
        margin-top: 100px;
    }
}
</style>

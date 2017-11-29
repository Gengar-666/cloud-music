<template>
    <div id="layout">
        <navbar></navbar>
        <div id="content">
            <transition :name="transitionName">
                <router-view class="view"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import navbar from '@/components/Navbar'
export default {
    name: 'layout',
    data: () => ({
    }),
    components: {
        navbar
    },
    mounted() {
    },
    computed: {
        ...mapGetters([
            // 过渡效果
            'transitionName'
        ])
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
#layout {
    #content {
        width: 100vw;
        height: 75vh;
        overflow-y: auto;
        position: relative;
        margin-top: 100px;
    }
}
</style>

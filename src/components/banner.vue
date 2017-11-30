<template>
    <div id="banner">
        <swiper auto height="120px">
            <swiper-item class="black" v-for="(item, index) in bannerList" :key="index">
                <img style="width:100%;" :src="item.img" alt="">
            </swiper-item>
            <swiper-item class="black" v-for="(item, index) in textList" :key="index">
                <h2 class="title fadeInUp animated">{{ item.title }}</h2>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'
import banner from './../../static/img/banner.jpg'
export default {
    data: () => ({
        bannerList: [
            { img:banner }
        ],
        textList: [
            { title: '你无处可藏' },
            { title: '不是它可恶' },
            { title: '而是它不懂你' },
            { title: '我们试图' },
            { title: '做些改变' }
        ]
    }),
    mounted() {
    },
    components: {
        Swiper,
        SwiperItem
    }
}
</script>

<style lang="less" scoped>
#banner {
    padding-top: 10px;
}

.copyright {
    font-size: 12px;
    color: #ccc;
    text-align: center;
}

.text-scroll {
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
}

.text-scroll p {
    font-size: 12px;
    text-align: center;
    line-height: 30px;
}

.black {
    background: -webkit-linear-gradient(left, #000);
    background: -moz-linear-gradient(left, #000);
    background: -o-linear-gradient(left, #000);
    background: linear-gradient(to right, #000);
}

.title {
    line-height: 120px;
    text-align: center;
    color: #fff;
}

.animated {
    animation-duration: 1s;
    animation-fill-mode: both;
}

.vux-indicator.custom-bottom {
    bottom: 30px;
}

@-webkit-keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
    100% {
        opacity: 1;
        transform: none;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
    100% {
        opacity: 1;
        transform: none;
    }
}

.fadeInUp {
    animation-name: fadeInUp;
}

.swiper-demo-img img {
    width: 100%;
}
</style>

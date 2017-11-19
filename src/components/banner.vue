<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="str in banners" :style="{ backgroundImage: 'url(' + str.url + ')' }"></div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { mapState } from 'vuex'
import Swiper from 'swiper'
import banner1 from './../../static/img/banner1.jpg'
import banner2 from './../../static/img/banner2.jpg'
import banner3 from './../../static/img/banner3.jpg'
import banner4 from './../../static/img/banner4.jpg'
export default {
    data () {
        return {
            banners:[{
                url:banner1
            },{
                url:banner2
            },{
                url:banner3
            },{
                url:banner4
            }]
        }
    },
    mounted() {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                loop: true,
                speed: 600,
                autoplay: 3000,
                onTouchEnd: function () {
                    swiper.startAutoplay()
                }
            });
    }
}
</script>

<style lang="less" scoped>
.swiper-container {
    width: 100%;
    height: 12rem;
    .swiper-wrapper {
        width: 100%;
        height: 100%;
    }
    .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .swiper-pagination-bullet {
        width: 0.833rem;
        height: 0.833rem;
        display: inline-block;
        background: #7c5e53;
    }
}
</style>

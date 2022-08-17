<template>
    <div class="body">

        <!-- 静态组件区域（分类） -->
        <van-notice-bar scrollable mode="closeable" :text="oneWord" color="#1989fa" background="#ecf9ff" class="notice"
            v-if="noticeShow" />

        <!-- <div class="address">
            <img src="@/assets/addr.png" alt="" class="addr-btn">
            <span> {{ addr }}</span>
            <img src="@/assets/ben.png" alt="">
        </div> -->
        <label :class="['search-box', {'search-active': searchAttch}]">
            <img src="@/assets/search.png" alt="">
            <input type="text" :placeholder="placeholder" class="search" @click="enterSearch">
        </label>

        <div class="swiper">
            <van-swipe style="height: 0.87rem;" indicator-color="white" :autoplay="2500" lazy-render vertical>
                <van-swipe-item v-for="(v, k) in carouselImgs" :key="k"> <img :src="v" alt="">
                </van-swipe-item>
                <template #indicator="{ active, total }">
                    <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
                </template>
            </van-swipe>

        </div>
        <div class="shop-list">
            <router-link v-for="(item, index) in shopList" :key="index" class="shop-item"
                :to=" `/classify/${item.classify_id}` ">
                <img :src="item.imgUrl" :alt="item.imgName">
                <div>{{item.desc}}</div>
            </router-link>
        </div>

        <div class="block"></div>
    </div>
</template>

<script setup >
import { ref, reactive, toRef, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { HttpReq } from '@/tool/request'
import { throttleFunc } from '@/tool/ty'

let router = useRouter()

// let noticeShow = ref(true)
// let searchAttch = ref(false)
const props = defineProps({
    carouselImgs: Array,
    noticeShow: Boolean,
    searchAttch: Boolean
})

// 随意一句话
let oneWord = ref('no b  , do something')
async function getRandomWord(){
    // oneWord.value = await HttpReq("https://www.ooopn.com/tool/api/yan/api.php?type=text")
    // setInterval( async ()=>{
    //     oneWord.value = await HttpReq("https://www.ooopn.com/tool/api/yan/api.php?type=text")
    // }, 60000)
}
getRandomWord()

let placeholder = ref('please seach goods')
let shopList = reactive([
    { imgName: "超市", desc: "超市便利", imgUrl: "https://i.postimg.cc/FzmLt3sy/1.png", classify_id: 1921},
    { imgName: "菜市场", desc: "菜市场", imgUrl: "https://i.postimg.cc/bYHnxC33/2.png", classify_id: 1873 },
    { imgName: "水果店", desc: "水果店", imgUrl: "https://i.postimg.cc/QMT9H0Fg/3.png", classify_id: 1873 },
    { imgName: "鲜花", desc: "鲜花绿植", imgUrl: "https://i.postimg.cc/Vk5bcY1V/4.png", classify_id: 1920 },
    { imgName: "医药健康", desc: "医药健康", imgUrl: "https://i.postimg.cc/kGct7GBk/5.png", classify_id: 1923 },
    { imgName: "家居", desc: "家居时尚", imgUrl: "https://i.postimg.cc/nzKX1rYC/6.png", classify_id: 1922 },
    { imgName: "蛋糕", desc: "烘培蛋糕", imgUrl: "https://i.postimg.cc/HkK8Yfks/7.png", classify_id: 1873 },
    { imgName: "签到", desc: "签到", imgUrl: "https://i.postimg.cc/dtsy42fv/8.png", classify_id: 1858 },
    { imgName: "大牌免运", desc: "大牌免运", imgUrl: "https://i.postimg.cc/tCBVf106/9.png", classify_id: 1876 },
    { imgName: "红包", desc: "红包套餐", imgUrl: "https://i.postimg.cc/0Q16mDST/10.png", classify_id: 1875 },

])

// `http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`


// 自定义事件,进入搜索框
const enterSearch = (el) => {
    el.target == document.activeElement && router.push('/search')
}






</script>

<style lang="scss" scoped>


// 通告栏
    .notice{
        box-sizing: border-box;
        // position: fixed;
        width: 100vw;
        height: 0.3rem;
        line-height: 0.3rem;
    }

    //  轮播图 指示器样式
  .custom-indicator {
      position: absolute;
      right: 0.05rem;
      bottom: 0.05rem;
      padding: 0.02rem 0.05rem;
      font-size: 0.14rem;
      background: rgba(255, 255, 255, 0.6);
      color: #000;
      font-style: italic;
  }

    .body {
        // height: 3.88rem;
        background-color: #fff;
        // overflow-x: hidden;
    }
    .block {
        width: 100%;
        height: 0.1rem;
        background-color: #f1f1f1;
    }


    .address {
        display: flex;
        justify-content: space-around;
        height: 24px;
        margin-top: 0.1rem;
        span {
            margin-left: -0.24rem;
            line-height: 22px;
            font-size: .16rem;
        }
        img {
            vertical-align: middle;
        }

    }

    .search-box {
        display: flex;
        align-items: center;
        margin-top: 0.1rem;
        height: 0.32rem;
        width: 100%;
        background: #fff;
        img {
            position: relative;
            width: 0.2rem;
            height: 0.2rem;
            left: 0.32rem;
        }
        .search {
                box-sizing: border-box;
                display: block;
                margin: 0.16rem auto;
                margin-left: 0rem;
                padding: 0  0.44rem ;
                width: 3.4rem;
                height: 0.32rem;
                border-radius: 0.24rem;
                outline: none;
                border: none;
                background-color: #f5f5f5;
                font-size: 0.16rem;
        }
    }

    .search-active {
        margin-top: 0;
        height: 0.5rem;
        line-height: 0.4rem;
        background: #1c79c0;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999
    }

    .swiper{
        margin: 0.12rem auto 0;
        width: 3.39rem;
        height: 0.86rem;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .shop-list{
        margin: 0.16rem 0;
        height: 1.42rem;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .shop-item{
            margin: 0 0.16rem;
            width: 0.4rem;
            height: 0.71rem;
            text-align: center;

            img {
                display: block;
                margin: 0 auto 0.06rem;
                width: 0.4rem;
                height: 0.4rem;
            }
            div {
                width: 0.48rem;
                height: 0.17rem;
                color: #000;
            }
        }
    }
</style>
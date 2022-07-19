<template>
    <div class="body">
        <!-- 静态组件区域（分类组件） -->
        <div class="phoneStatus"></div>
        <div class="address">
            <img src="@/assets/addr.png" alt="" class="addr-btn">
            <span> {{ addr }}</span>
            <img src="@/assets/ben.png" alt="">
        </div>
        <label class="search-box">
            <img src="@/assets/search.png" alt="">
            <input type="text" :placeholder="placeholder" class="search">
        </label>
        <div class="swiper">
            <img src="@/assets/swiper1.png" alt="">
        </div>
        <div class="shop-list">
            <div v-for="(item, index) in shopList" :key="index" class="shop-item">
                <img src="@/assets/shop1.png" :alt="item.alt">
                <div>{{item.name}}</div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
let addr =ref('北京理工大学国防科技园2号类10层')
let placeholder = ref('山姆会员商铺店铺优惠品')

let shopList = reactive([
    { "alt": "超市", "name": "超市便利", "pic": "../../../assets/shop1.png"},
    { "alt": "超市", "name": "超市便利", "pic": "@/assets/shop1.png"},
    { "alt": "超市", "name": "超市便利", "pic": "@/assets/shop1.png"},
    { "alt": "超市", "name": "超市便利", "pic": "@/assets/shop1.png"},
    { "alt": "超市", "name": "超市便利", "pic": "@/assets/shop1.png"},
    { "alt": "超市", "name": "超市便利", "pic": "@/assets/shop1.png"},
    { "alt": "超市", "name": "超市便利", "pic": "@/assets/shop1.png"},
    { "alt": "超市", "name": "超市便利", "pic": "@/assets/shop1.png"},
])


</script>

<style lang="scss" scoped>


    .body {
        height: 3.78rem;
        background-color: #fff;
    }


    .phoneStatus{
        height: 20px;
    }
    .address {
        display: flex;
        justify-content: space-around;
        height: 24px;
        margin-top: 0.16rem;
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
        display: block;
        position: relative;
        img {
            position: absolute;
            left: 0.32rem;
            top: 0.08rem;
        }
        .search {
                box-sizing: border-box;
                display: block;
                margin: 0.16rem auto;
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
            width: 0.48rem;
            height: 0.71rem;

            img {
                display: block;
                margin: 0 auto 0.06rem;
                width: 0.4rem;
                height: 0.4rem;
            }
            div {
                width: 0.48rem;
                height: 0.17rem;
            }
        }
    }
</style>
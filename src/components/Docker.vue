<template>
    <div class="docker">
        <!-- 容器区域 -->
        <router-link :class="['tab-item', { 'active':  $route.fullPath == v.url }]"
            v-for="(v, k) in homeNavList" :key="k" @click="$store.commit('changeRouterType', 'push') "
            :to=" v.url ">
            <!-- <img src="@/assets/tab-home.png" alt=""> -->
            <van-icon class="tab-icon" :name=" $route.fullPath == v.url ? v.iconActive : v.icon " />
            <span>{{ v.name }}</span>
        </router-link>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from  'vue-router'
import { useStore } from 'vuex'
let route = useRoute()
let store = useStore()
store.commit('changeRouterType', 'back')
// let curPath = route.fullPath
// if(curPath != "/"){
//     store.commit('changeRouterType', 'back')
// }else{
//     store.commit('changeRouterType', 'push')
// }

let homeNavList = [
    { name: "首页", url: "/", icon: "wap-home-o", iconActive: "wap-home"},
    { name: "购物车", url: "/cart", icon: "shopping-cart-o", iconActive: "shopping-cart" },
    { name: "订单", url: "/order", icon: "orders-o", iconActive: "orders-o" },
    { name: "我的", url: "/me", icon: "user-circle-o", iconActive: "user-circle-o" },
]


</script>

<style lang="scss" scoped>


    .docker {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: .49rem;
        background-color: #fff;
        border-top: 1px solid #f1f1f1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;

        .tab-item {
            width: 0.36rem;
            height: 0.5rem;
            line-height: 0.2rem;
            font-size: 0.1rem;
            .tab-icon {
                display: block;
                margin: 0.07rem auto 0;
                width: 0.2rem;
                height: 0.2rem;
                font-size: 0.2rem;
                color: #000;
            }
        }

        .active {
            .tab-icon, span {
                color:#1FA4FC
            }
        }
    }
</style>
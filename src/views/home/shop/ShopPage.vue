<template>
    <div>
        <label class="search-box">
            <router-link class="back-arrow" to="/" v-show="!searchVal"> &lt; </router-link>
            <img src="@/assets/search.png" alt="" :class="['search-btn', { 'search-btn-move': searchVal }]">
            <input type="text" placeholder="请输入...." v-model="searchVal" @input="search" @click="enterSearch"
                :class="['search', {'ipt-extend': !searchVal}]">
            <span @click="cleanIpt" v-show="searchVal" class="cancel">取消</span>
        </label>

        <NearBy :shopId="route.params.shopId"></NearBy>

        <div class="shop-main">
            <ShopSideBar class="shop-main-l"></ShopSideBar>
            <GoodList class="shop-main-r"></GoodList>
        </div>

        <PopUpList></PopUpList>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import NearBy from '../components/NearBy.vue';
import ShopSideBar from './ShopSideBar.vue';
import GoodList from './GoodList.vue';
import PopUpList from './PopUpList.vue';

let route = useRoute();
let router = useRouter();
// let shopId = route.query.shopId
// console.log(route.fullPath, "shop page");

let searchVal = ref('')
const cleanIpt = () => {
    searchVal.value = ""
}

// 自定义事件
const enterSearch = (el) => {
    // console.log(el.target == document.activeElement);
    el.target == document.activeElement && router.push({
        path: '/search', query: { "back": route.fullPath }
    })
}

</script>

<style lang="scss" scoped>

.search-box {
    display: block;
    position: relative;
    margin-top: 0.16rem;
    height: 0.32rem;
    line-height: 0.32rem;
    font-size: 0.16rem;

    .back-arrow {
        display: inline-block;
        position: absolute;
        left: 0.2rem;
        width: 0.12rem;
        font-size: 0.21rem;
        color: #b6b6b6;
        font-weight: 700;
    }

    .search-btn {
        position: absolute;
        left: 0.56rem;
        top: 50%;
        transform: translate(0, -50%);
        z-index: 1;
        transition: all 0.2s;
    }


    .search {
        box-sizing: border-box;
        display: inline-block;
        position: absolute;
        right: 0.6rem;

        padding: 0 0.44rem;
        width: 2.95rem;
        height: 0.32rem;
        border-radius: 0.24rem;
        outline: none;
        border: none;
        background-color: #f5f5f5;
        transition: all 0.2s;
    }

    .ipt-extend {
        right: 0.2rem;
        width: 3.1rem;
    }

    .search-btn-move {
        left: 0.32rem;
    }

    .cancel {
        position: absolute;
        right: 0.12rem;
    }
}

.shop-main{
    width: 100%;
    margin-top: -0.01rem;
    background: #fff;

    .shop-main-l {
        display: inline-block;
        width: 0.76rem;
        vertical-align: top;
    }
    .shop-main-r {
        display: inline-block;
        width: calc(100% - 0.76rem);
        vertical-align: top;
        background-color: #fff;
    }
}

</style>
<template>
    <div>
        <label class="search-box">
            <router-link class="back-arrow" :to="backPath" v-show="!searchVal"> &lt; </router-link>
            <img src="@/assets/search.png" alt="" :class="['search-btn', {'search-btn-move': searchVal}]">
            <input type="text" :placeholder="placeholder" v-search-focus v-model="searchVal" @input="search"
                :class="['search', {'ipt-extend': !searchVal}]">
            <span @click="cleanIpt" v-show="searchVal" class="cancel">取消</span>
        </label>

        <component :is='searchVal ? SearchList : SearchHistory ' :historyList="historyList" :hotList="hotList">
        </component>

        <!-- <SearchHistory :historyList="historyList" :hotList="hotList" v-if="!searchVal">
        </SearchHistory>
        <SearchList v-else></SearchList> -->

    </div>
</template>

<script setup>
import SearchHistory from './SearchHistory.vue';
import SearchList from './SearchList.vue';
import { useRoute } from 'vue-router'
import { ref } from 'vue';

let route = useRoute()
let backPath = route.query.back  || '/'

let placeholder = ""

let searchVal = ref('')
let historyList = ref([])
let hotList = ref([])


historyList.value = ["麻辣香菇", "先河", "sam shop 商店", "牛奶咖啡", "happy birth", "开，香槟了", "奶嘴"]
hotList.value = ["麻辣香菇", "先河", "sam shop 商店", "牛奶咖啡", "happy birth", "开，香槟了", "奶嘴"]

// 自定义指令
const vSearchFocus = {
    mounted: (el) => {
        // 在元素上做些操作
        el.focus()
    },
}

const cleanIpt = () => {
    searchVal.value = ""
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

    .search-btn-move{
        left: 0.32rem;
    }

    .cancel{
        position: absolute;
        right: 0.12rem;
    }
}
</style>
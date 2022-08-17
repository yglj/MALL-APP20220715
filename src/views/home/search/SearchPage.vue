<template>
    <div>
        <label class="search-box">
            <router-link class="back-arrow" :to="backPath" v-show="!searchVal"> &lt; </router-link>
            <img src="@/assets/search.png" alt="" :class="['search-btn', {'search-btn-move': searchVal}]">
            <input type="text" :placeholder="placeholder" v-search-focus v-model="searchVal"
                @input="searchIpt($event.target.value) " :class="['search', {'ipt-extend': !searchVal}]"
                autocomplete>
            <span @click="cleanIpt" v-show="searchVal" class="cancel">取消</span>
        </label>

        <component :is='toggleCom ? SearchList : SearchHistory  ' :historyList="historyList.list()" :hotList="hotList"
            :searchList="searchList" :searchCount="searchCount" @searchHot="searchHot"
            @clearHistory="historyList.clear">
        </component>

    </div>
</template>

<script setup>
import SearchHistory from './SearchHistory.vue';
import SearchList from './SearchList.vue';
import { useRoute } from 'vue-router'
import { ref, reactive, computed, watch } from 'vue';
import { debounce } from '@/tool/ty'
import { HttpReq } from '../../../tool/request';
import { Toast } from 'vant'


let route = useRoute()
let backPath = route.query.back  || '/'

let placeholder = ""

let searchVal = ref('')
let historyList =  reactive({
    push(val){
        let history  = localStorage.getItem('historySearch')
        if(history){
            history = JSON.parse(history)
            while(history.length > 10){
                history.pop()
            }
            history.unshift(val)
            history = [... new Set(history)]
            localStorage.setItem('historySearch', JSON.stringify(history))
        }else{
            localStorage.setItem('historySearch', JSON.stringify( [val] ) )
        }
    },
    clear(){
        localStorage.removeItem('historySearch')
    },
    list() {
       return ref(JSON.parse(localStorage.getItem('historySearch')) || ["你别狗叫"]).value
    },
})


let hotList = ref([])
let searchList = ref([])
let searchCount = ref(null)

// historyList.value = ["麻辣香菇", "先河", "sam shop 商店", "牛奶咖啡", "happy birth", "开，香槟了", "奶嘴"]
hotList.value = ["光刻机", "裙子", "super market", "山竹", "happy birth", "秋冬季", "玫瑰"]

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


let toggleCom = ref('')
//  com toggle 丝滑
watch(
    searchVal,
    (nv, ov) => {
        if(!nv.trim()) {
            toggleCom.value = nv
        }
    }
)

const searchHot = (v2v) => {
    // click tag
    searchVal.value = v2v
    search(v2v)
}

//  need fang dou
const search =  async (v2v, args) =>{
    if (!v2v.trim()) {
        return
    }
    console.log(v2v);
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 400
    })

    historyList.push(v2v)

    let res = await HttpReq('/goodsSearch', { name: v2v }, 1)

    toggleCom.value = v2v
    searchList.value = res.result.rows
    searchCount.value = res.result.count

}

const searchIpt = debounce(search, 1000)



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
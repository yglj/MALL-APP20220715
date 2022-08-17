<template>
    <div class="body" ref="bodyNode">

        <div class="wrapper">

            <StaticPart :carouselImgs="carouselImgs"
            :noticeShow="noticeShow" :searchAttch="searchAttch"
            ></StaticPart>

            <NearBy :waterfullList="waterfullList" @loadData="loadRecommend" :bodyNode="bodyNode">
                <template v-slot:default>
                    <div>
                        <h2 class="nearby_text">热门推荐</h2>
                    </div>
                </template>
            </NearBy>

        </div>
        <Docker />
    </div>
</template>

<script setup>
/*
静态组件
热门推荐
*/
import StaticPart from './components/StaticPart.vue';
import NearBy from './components/NearBy.vue';
import Docker from '../../components/Docker.vue';
import { HttpReq } from '@/tool/request';
import { ref, onMounted } from 'vue'
import { Toast } from 'vant'
import { throttleFunc } from '@/tool/ty'

let carouselImgs = ref([])
let waterfullList = ref([])
let bodyNode = ref(null)

// 轮播图图片
const getCarousel = async () => {
    let res = await HttpReq('/carousel', null,  1)
    carouselImgs.value = res.result.map((v) => v.s_photos[0].path)
}
getCarousel()

// 提取富文本
const getRichText = (str) => str.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, "")

// 首页商品推荐
Toast.setDefaultOptions({ duration: 1000 });
const getRecommend = ((limit) => {
        limit = limit || 2
        let start = 0
        return async  () => {
            let res
            if (waterfullList.value.length == 0){
                    res = await HttpReq('/goods', null, 1)
                    res = res.result.rows.map( val => {
                    let { id, name:title , price } = val
                    let imgUrl = val.s_goods_photos[0].path
                    let classify = val.s_classify.name
                    let sold_num = val.sold_num
                    return  { id, title, price, imgUrl, classify, sold_num }
                })
            }else{
                res = await HttpReq('/goods/3818', null , 1)
                res = JSON.parse( getRichText(  res.result.rich_text ))
                res = res.slice(start, start + limit)
                start += limit
                if(res.length == 0) {
                    Toast('加載完畢，已無更多數據。');
                }
            }
            waterfullList.value = waterfullList.value.concat(res)
        }
})(4)

// 获取热门推荐
getRecommend()
const loadRecommend = () => {
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
    });
    getRecommend()
}

let noticeShow = ref(true)
let searchAttch = ref(false)
onMounted(()=>{
// 触底加载
    // if(!bodyNode) return
    bodyNode.value.addEventListener("scroll",
        throttleFunc( (
        (e) =>{
            // let preSltop = document.documentElement.scrollTop
            let preSltop = bodyNode.value.scrollTop
            return () => {
                // let { scrollHeight: sh, scrollTop: st, clientHeight: ch } = document.documentElement
                let { scrollHeight: sh, scrollTop: st, clientHeight: ch } = bodyNode.value
                if (sh - st - ch < 20 && preSltop < st) {
                    // emits("loadData")
                    loadRecommend()
                }
                preSltop = st
            }
        })(), 600)
    )

    // 吸顶
    bodyNode.value.addEventListener("scroll",
        throttleFunc(() => {
            let { scrollHeight: sh, scrollTop: st, clientHeight: ch } = bodyNode.value
            if (st > 50) {
                noticeShow.value = false
                searchAttch.value = true
            }else {
                noticeShow.value = true
                searchAttch.value = false
            }
        }, 100)
    )
})

</script>

<style lang="scss" scoped>
    .body {
        // height: calc(100vh - 0.2rem);
        overflow-y: scroll;
    }

    :root {
        --van-toast-text-color: #ffa;
        --van-toast-loading-icon-color: var(--van-white)
    }

    .wrapper {
        height: calc(100vh - 0.2rem);
    }

    .cimg {
        width: 100%;
        height: 2rem;
    }


    .nearby_text {
        padding: 0.12rem;
        font-weight: bold;
        margin: 0 0 0 0.18rem;
        font-size: 0.18rem;
        line-height: 0.25rem;
    }
</style>
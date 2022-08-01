<template>
    <div>

        <div class="wrapper">
            <!-- this is index
            静态组件
            分类组件
            商铺组件
            容器组件（其他组件，非home私有） -->
            <StaticPart :carouselImgs="carouselImgs"></StaticPart>

            <NearBy :waterfullList="waterfullList" @loadData="loadRecommend">
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
import StaticPart from './components/StaticPart.vue';
import NearBy from './components/NearBy.vue';
import Docker from '../../components/Docker.vue';
import { HttpReq } from '@/tool/request';
import { ref } from 'vue'
import { Toast } from 'vant'

let carouselImgs = ref([])
let waterfullList = ref([])

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
                    return  { id, title, price, imgUrl, classify }
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

</script>

<style lang="scss" scoped>

    :root {
        --van-toast-text-color: #ffa;
        --van-toast-loading-icon-color: var(--van-white)
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
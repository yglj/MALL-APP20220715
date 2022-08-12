<template>
    <div>
        <Header title="商品分类" doName="" @goBack="$router.back()"></Header>
        <van-row class="classify-list">
            <div v-for="item in classifyList" :key="item.id"
                :class="['classify-item', { 'classify-active': classifyId == item.id }]" @click="classifyId = item.id">
                {{ classifyNameCN[item.name] }}
            </div>
        </van-row>

        <div class="waterfull-ct">

            <div class="waterfull" v-masonry gutter="15" percent-position="true" fit-width="true" ref="waterfullEl">
                <div v-masonry-tile class="card" v-for="item in waterfullList(classifyId)" :key="item.id">
                    <router-link :to="'/goods/' + item.id " class="shop-info">
                    <van-badge content="Hot" position="top-left" v-if="item.sold_num > 2" class="badge">
                    </van-badge>
                        <img :src="item.s_goods_photos[0].path" alt="" />
                        <div class="goodsMsg">
                            <div class="goodsName"> {{ item.name }} </div>
                            <van-row justify="space-between">
                                <strong>￥{{ item.sale_price }} <u>￥{{item.price}}</u></strong>
                                <span>月售:{{item.sold_num}}</span>
                            </van-row>
                        </div>
                    </router-link>

                </div>
            </div>

        </div>

    </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { computed, ref, onMounted, onUpdated, nextTick } from 'vue'
import { useStore } from 'vuex';
import { HttpReq } from '@/tool/request';
import { useRouter} from 'vue-router'

let router = useRouter()

let classifyId = ref(router.currentRoute.value.params.classify_id)
let classifyList = ref(null)

let waterfullList = computed(() => id => {
    let item = classifyList.value && classifyList.value.find(v=>v.id == id)
    return item && item.s_goods
} )


const getGoodsClassify = async () => {
    let res = await HttpReq('/classify/classifyGoods', null, 1)
    classifyList.value = res.result
    // console.log(waterfullList.value(classifyId) );

    // classifyList.value.forEach((value, index, array) => {
    //     console.log(value.id, classifyNameCN[value.name]);
    // })
}



const classifyNameCN = {
    recommend: "推荐",
    clothes: "衣服",
    food: "美食",
    technology: "科技",
    Jewel: "大牌",
    flower: "园艺",
    fruits: "超市",
    furniture: "家居",
    medicine: "健康"
}

id: 3818
name: "热门推荐"
price: 100000000000
s_goods_photos: Array[1]
sale_price: null
sold_num: 8

getGoodsClassify()


</script>

<style lang="scss" scoped>








.classify-list {
    width: 100%;
    height: 0.34rem;
    line-height: 0.34rem;
    border-top: 1px solid #ccc;
    display: inline-block;
    white-space: nowrap;
    // background: rgb(127, 191, 244);
    overflow-y: hidden;
    overflow-x: scroll;
    &::-webkit-scrollbar {
            display: none;
            /* Chrome Safari */
        }
    .classify-item {
        display: inline-block;
        width: 0.6rem;
        margin: 0 0.1rem;
        font-size: 0.16rem;
        line-height: 0.24rem;
        color: rgb(38, 172, 229);
        text-align: center;
    }
    .classify-active {
        margin: 0.04rem 0;
        height: 0.24rem;
        background: rgb(230, 243, 81);
        color: red;
        border-radius: 0.2rem;
    }
}

.waterfull-ct {
    width: 100vw;
    background: rgba(178, 196, 233, .1);
}


.waterfull {
    box-sizing: border-box;
    min-height: calc( 100vh - 1rem);
    padding: 0.2rem 0.1rem;


    .title {
        margin: 0.14rem 0 0.14rem 0.18rem;
        h2 {
            font-size: 0.18rem;
            color: #333;
        }
    }

    .card {
        width: 40vw;
        background-color: #fff;
        padding: 0.08rem;
        box-shadow: 0 0.06rem 0.06rem rgba(208, 63, 167, 0.14);
        border-radius: 0.08rem;
        margin-bottom: 0.1rem;
        position: relative;

        .badge {
            width:0.4rem; height:0.2rem; line-height:0.2rem;
            position: absolute;
            top: 0.1rem;
            left: 0.1rem;
        }

        img {
            width: 100%;
            display: block;
            height: auto;
        }

        .goodsMsg {
            .goodsName {
                margin: 0.1rem 0;
                font-size: 0.15rem;
                color: #333;
                font-weight: 600;
                width: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }

            span {
                font-size: 0.06rem;
                color: #000;
            }

            strong {
                color: #ff4142;
                font-size: 0.14rem;
            }
            u {
                text-decoration: line-through;
                color: #999;
                font-size: 0.12rem;
            }

        }
    }
}
</style>
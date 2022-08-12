<template>
    <div class="goods-ct">
        <van-nav-bar title="" left-text="" left-arrow :class="navBarStyle" @click-left="goBack">
            <template #right>
                <div class="navbar-nav" v-if="navBarStyle.includes('active')">
                    <span>商品</span>
                    <span>详情</span>
                    <span>推荐</span>
                </div>
                <router-link :to=" `/search?back=${route.fullPath}` ">
                    <van-icon name="search" size="21" />
                </router-link>
            </template>
        </van-nav-bar>
        <van-swipe @change="" class="goodsSwipe">
            <van-swipe-item v-for="v in cardRef.s_goods_photos" :key="v.id">
                <img :src="v.path" alt="">
            </van-swipe-item>
        </van-swipe>

        <van-config-provider :theme-vars="cardThemeVars">
            <van-card :price="cardRef.price" title="" class="goods-card">
                <template #tags>
                    <van-row class="card-title"> {{cardRef.title}} </van-row>
                    <van-row class="card-desc">支持七天无理由退换货，质量保证，闪电发货！</van-row>
                    <van-row class="card-tag">
                        <van-tag plain type="danger" v-for="tag in cardRef.desc" class="tag-item">{{tag}}</van-tag>
                    </van-row>
                </template>
            </van-card>
        </van-config-provider>

        <van-tabs v-model:active="activeName">
            <van-tab title="商品介绍" name="a" class="vtab-row">
                <van-row span="6" v-for="v in cardRef.s_goods_photos" :key="v.id">
                    <img :src="v.path" alt="">
                </van-row>
            </van-tab>
            <van-tab title="规格参数" name="b">
                <van-cell>
                    <img src="@/assets/swiper1.png" alt="">
                </van-cell>
            </van-tab>
            <van-tab title="售后保障" name="c">

                <div class="mod_tit_line">
                    <van-cell>
                        <strong>1.划线价：</strong>商品展示的划横线价格为参考价，该价格可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品在京东平台上曾经展示过的销售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考。
                    </van-cell>
                    <van-cell>
                        <strong>2.折扣：</strong>如无特殊说明，折扣指销售商在原价、或划线价（如品牌专柜标价、商品吊牌价、厂商指导价、厂商建议零售价）等某一价格基础上计算出的优惠比例或优惠金额；如有疑问，您可在购买前联系销售商进行咨询。
                    </van-cell>
                    <van-cell>
                        <strong>3.异常问题：</strong>商品促销信息以商品详情页“促销”栏中的信息为准；商品的具体售价以订单结算页价格为准；如您发现活动商品售价或促销信息有异常，建议购买前先联系销售商咨询。
                    </van-cell>
                </div>
            </van-tab>
        </van-tabs>

        <div class="holder"></div>
        <van-action-bar>
            <!-- popver 不被 root app 包裹 -->

            <van-action-bar-icon icon="cart" text="购物车" :badge="cartCountById(cardRef.id)" color="#ee0a24" to="/cart" />
            <van-action-bar-icon icon="star-o" text="收藏" color="#ff5000" />
            <van-action-bar-button type="warning" text="加入购物车" @click="addCart" color="#be99ff" />
            <van-popover v-model:show="showPopover" placement="top-end">
                <van-grid square clickable :border="true" column-num="3" class="popContent">
                    <!-- <van-row> -->
                    <van-col class="pop-col-one">
                        <img :src="cardRef.img_one " />
                    </van-col>
                    <van-col class="pop-col-two">
                        <div>
                            <h3>{{cardRef.title}}</h3>
                            <van-icon name="cross" class="pop-close" @click="showPopover = false" />
                        </div>
                        <div class="pop-msg">
                            <!-- <van-button icon="plus" type="primary" size="small" @click="changeCartItem( 1)" /> -->
                            <van-button icon="plus" type="primary" size="small"
                                @click="immediatelyBuy( prepareOrder[0].num + 1)" />
                            <!-- <span class="pop-num"> {{ cartCountById(cardRef.id) }} </span> -->
                            <span class="pop-num"> {{ prepareOrder[0].num }} </span>
                            <!-- <van-button icon="minus" type="warning" size="small" @click="changeCartItem( -1)" -->
                            <van-button icon="minus" type="warning" size="small"
                                @click="immediatelyBuy( prepareOrder[0].num - 1)"
                                color="linear-gradient(to right, #ff6034, #ee0a24)" />
                            <!-- <span class="pop-price"> ￥{{ cardRef.price * cartCountById(cardRef.id) }} </span> -->
                            <span class="pop-price"> ￥{{ cardRef.price * prepareOrder[0].num }} </span>
                            <van-button type="primary" size="large" class="go-cart" color="#7232dd" @click="toPay">去结算
                            </van-button>
                        </div>
                    </van-col>
                    <!-- </van-row> -->
                </van-grid>
                <template #reference>
                    <van-action-bar-button type="danger" text="立即购买" color="#7232dd" style="width:140px"
                        @click="immediatelyBuy(1)" />
                </template>
            </van-popover>
        </van-action-bar>

    </div>
</template>

<script setup>
import { ref,reactive, computed, onBeforeMount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { HttpReq } from '@/tool/request';
import { ConfigProvider } from 'vant'
import { scrollDoSome } from '@/tool/ty'
import { useStore } from 'vuex'
import { isNumeric } from 'vant/lib/utils';

//  vuex
let store = useStore()
let cartCountById = computed((id) => store.getters['cart/cartCountById'] )
onBeforeMount(
    ()=>{
        store.dispatch('cart/getCartData', cardRef.id)
        // console.log(store.state.cart.cartList);
    }
)
onMounted( ()=>{
})


// router
let route = useRoute()
let router = useRouter()

// ref
let cardRef = reactive({
    id: ref(null),
    desc: ref(null),
    title: ref(null),
    price: ref(null),
    s_goods_photos: ref(null)
})
let navBarStyle = ref("goods-navbar")
let activeName = ref("a")
let showPopover = ref(false)
let prepareOrder = computed(() => store.state.order.prepareOrder )
//method
const goBack = () => {
    // history.back()
    router.push("/")
}

const changeCartItem = async (add) => {
    // update cart num to request
    // let res
    // let num = cartCountById.value(cardRef.id)
    // if (num <=1 && add < 0) return
    // if (num > 0) {
    //     res = await store.dispatch("cart/changeCartItem", { "goods_id": cardRef.id, "add": add })
    // } else {
    //     res = await store.dispatch("cart/addCart", cardRef.id)
    // }
    // store.dispatch("cart/getCartData", cardRef.id)

    // update immediately  buy num
    // store.commit({
    //     type: "order/DEL_PREPARE_ORDER",
    // })
}

const addCart = async () => {
    let res
    let num = cartCountById.value(cardRef.id)
    if(num > 0){
        res = await store.dispatch("cart/changeCartItem", { "goods_id": cardRef.id, "add": 1 })
    }else{
        res = await store.dispatch("cart/addCart", cardRef.id)
    }
    store.dispatch("cart/getCartData", cardRef.id)
}

const getGoodsData = async () => {
    let id = route.params.goodsId
    // let req_data = { "project_id": "231", "id": "3851" } // 漂亮姐姐
    let res = await HttpReq(`/goods/${id}`, null, 1)
    res = res.result
    cardRef.id = res.id
    cardRef.title = res.name
    cardRef.desc = res.desc.split("#")
    cardRef.price = res.price + ".00"
    cardRef.s_goods_photos = res.s_goods_photos
    cardRef.img_one = res.s_goods_photos[0].path
}

//  first params is not event e,  need params $event
const immediatelyBuy = (num) => {
    // if( !isNumeric(num) ) return
    store.commit({
        type: "order/PREPARE_ORDER",
        goods_info: [{
            id: cardRef.id,
            num: num || 1
        }]
    })
}

const toPay = () => {
    router.push('/pay')
}

//  called func
getGoodsData()

scrollDoSome( (sh, st, ch)=>{
    navBarStyle.value = st >= 70 ? "goods-navbar goods-navbar-active" : "goods-navbar"
}, 100)

const cardThemeVars = {
    cardPriceColor: "#f2270c",
    cardDescColor: "#aaa",
    cardFontSize: "0.16rem",
    cardTitleLineHeight: '0.32rem',
    cardPriceFontSize: "0.3rem",
    cardPriceIntegerFontSize: "0.3rem",
};
</script>

<style lang="scss" scoped>

.goods-ct {
    height: calc(100vh - 0.2rem);
}


.popContent{
    width: 100vw;
    font-size: 0.16rem;
    padding: 0.1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    border-radius: 0.36rem;
    .pop-col-one {
        img {
            width: 0.8rem;
            height: 1rem;
        }
    }
    .pop-col-two {
        margin-left: 0.3rem;
        font-weight: bold;
        h3 {
            display: inline-block;
            margin: 0.1rem 0;
            font-size: 0.16rem;
            // line-height: 0.3rem;
        }
        .pop-close{
            position: absolute;
            right: 0.05rem;
            top: 0.05rem;
            color: red;
        }
        .pop-num {
            display: inline-block;
            font-size: 0.16rem;
            margin:  0 0.2rem;
            line-height: 0.36rem;
            vertical-align: bottom;
        }
        .pop-price {
            color: red;
            margin: 0 0.2rem;
            display: inline-block;
            font-size: 0.18rem;
            line-height: 0.36rem;
            vertical-align: bottom;
        }

        .go-cart{
            width: 100%;
            height: 0.2rem;
            border-radius: 0.05rem;
        }
    }
}

:root {
    --van-nav-bar-background-color: green;
    --van-nav-bar-height: 200px;
    background: skyblue;
}

.goodsSwipe{
    img {
        width: 100vw;
        height: 100vw;
    }

}
.holder{
    width: 100%;
    height: 0.5rem;
}
.goods-navbar{
    position: fixed;
    width: 100%;
    height: 0.48rem;
    top: 0.2rem;
    left: 0;
    background: transparent;
    transition: all 0.3s ease-in-out;
    &::after {
        border:none;
    }

    .navbar-nav {
        box-sizing: border-box;
        padding-left: 0.7rem;
        width: 70vw;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            padding: 0.1rem
        }
    }

}


.goods-navbar-active {
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
}


.goods-card{
    background: #fff;
    margin: 0.1rem 0;
    box-shadow: 0 0 5px 10px rgba(170, 187, 204, 0.09);
    height: 1.6rem;
    div {
        max-height: 0.5rem !important;
    }
    .card-title {
        font-weight: 700;
        font-size: 0.18rem;
        line-height: 1.5;
        max-height: 0.5rem;
    }
    .card-desc {
        font-size: 0.14rem;
        line-height: 2;
        color: #aaa;
    }
    .card-tag {
        margin: 0.1rem 0 ;
        span {
            display: inline-block;
            font-size: 0.12rem;
            margin-right: 0.1rem;
            margin-bottom: 0.05rem;
        }
    }
}

.vtab-row {
    img {

        width: 100%;
        height: 3.75rem;
    }
}
</style>
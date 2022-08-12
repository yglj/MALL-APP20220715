
<template >
    <div class="pay-bd">
        <van-overlay :show="leaveShow" @click="leaveShow = false" style="z-index:101">
            <div class="wrapper" @click.stop>
                <div class="over-block" v-if="!paySuccess">
                    <h3>还未提交，确认要离开？</h3>
                    <p>请尽快完成支付，否则将被取消</p>
                    <van-button plain type="primary" round @click="addOrder(1, true)">稍后支付</van-button>
                    <van-button type="primary" round @click="addOrder(7, true)">取消订单</van-button>
                </div>
                <div class="over-block" v-else>
                    <h3>
                        <van-icon name="success" size="0.6rem" />
                    </h3>
                    <p>支付成功，等待配送</p>
                </div>
            </div>
        </van-overlay>
        <van-row class="head-back">
            <van-icon name="arrow-left" size="24" color="white" class="back-arrow" @click="leaveOrder"></van-icon>
            <van-col offset="6" span="8">确认订单</van-col>
        </van-row>
        <van-row justify="space-between" class="head-addr" align="top">
            <van-col span="20">
                <van-row class="addr-title"> 收货地址 </van-row>
                <van-row class="addr-text"> {{ addrRef.area_name + addrRef.desc }} </van-row>
                <van-row class="addr-msg">
                    <span> {{ addrRef.name }} </span>
                    <!-- <span> 先生 </span> -->
                    <span> {{ addrRef.phone}} </span>
                </van-row>
            </van-col>
            <van-col span="4" align="center">
                <van-icon name="arrow" size="24" color="#999"
                    @click="$router.push({name: 'addr', params: {from: 'pay' }})" />
            </van-col>
        </van-row>

        <van-list class="list">
            <van-cell-group inset v-for="item in goodsRef" :key="item.id">
                <van-cell>
                    <van-row justify="space-between">
                        <h3>{{ item.name }}</h3>
                        <img :src="item.s_goods_photos[0].path" alt="">
                        <img :src="item.s_goods_photos[1].path" alt="">
                    </van-row>
                </van-cell>
                <van-cell :value="item.desc" />
                <van-cell title="原价" :value="item.price" />
                <van-cell title="折扣价" :value="item.sale_price" />
                <van-cell title="数量" :value=" 'x' + item.num " />
            </van-cell-group>
        </van-list>

        <van-submit-bar :price="orderTotalPrice" button-text="提交订单" @submit="addOrder(2)" />
    </div>

</template>

<script setup>
import { ref, reactive , computed, onBeforeMount } from 'vue'
import { Toast } from 'vant'
import { useStore } from 'vuex'
import { HttpReq } from '@/tool/request'
import { useRoute, useRouter } from 'vue-router'

let store = useStore()
let router = useRouter()
let route = useRoute()

let leaveShow = ref(false)
let paySuccess = ref(false)

let orderRef = ref(null)
let goodsRef = ref(null)
let addrRef = reactive({
    area: ref(null),
    id: ref(null),
    desc: ref(null),
    name: ref(null),
    phone: ref(null),
    area_name: ref(null)
})
// 立即下单
let prepareOrder = store.state.order.prepareOrder
let shoppingCartIds = []
const orderTotalPrice = computed(() => goodsRef.value && goodsRef.value.reduce( (pre, cur) => pre + cur.sale_price * cur.num * 100, 0 ) )

onBeforeMount( async ()=> {
    let { addr_id } = route.query
    let defaultAddress
    if (addr_id){
        await store.dispatch({ type: 'addr/getAddress' })
        defaultAddress = store.getters['addr/selectAddrById'](addr_id)
    } else {
        await store.dispatch({type: 'addr/getDefaultAddress'})
        defaultAddress = store.state.addr.defaultAddress
    }
    addrRef.area = defaultAddress.area
    addrRef.id = defaultAddress.id
    addrRef.desc = defaultAddress.desc
    addrRef.name = defaultAddress.name
    addrRef.phone = defaultAddress.phone
    addrRef.area_name = defaultAddress.area_name

    // 立即下单
    let orderAllGoods = []
    prepareOrder.forEach( v =>{
        shoppingCartIds.push( v.id)
        orderAllGoods.push( HttpReq(`/goods/${v.id}`, null, 1) )
    })

    orderAllGoods = await Promise.all(orderAllGoods)
    goodsRef.value = orderAllGoods.map( (v,k) => {
        let { id, name, desc, price, sale_price, num,  s_goods_photos } = v.result
        // if  not cart ,num from prepareOrder
        num = num || prepareOrder[k].num
        return { id, name, desc, price, sale_price, num, s_goods_photos }
    })

})

const leaveOrder = (yes) => {
    leaveShow.value = true
    paySuccess.value = !yes
}

const updatedOrder = (id, addr_id, status) => {
    status = String(status)
    store.dispatch('order/updatedOrder', {
         id, addr_id, status
    })
}

const addOrder = (status, leave=false) => {
    store.dispatch({
        type: 'order/addOrder',
        addr_id: addrRef.id,
        goods_info: prepareOrder,
        shoppingCartIds
    }).then(res => {
        if (res.msg == "添加成功") {
            orderRef.value = res.result
            //  toggle upPop
            leaveOrder(leave)
            //  remove sesssion order_goods_info , clear cart
            let cartIdList = prepareOrder.map( async (v) => {
                v.cart_id && await store.dispatch('cart/delCartItem', { cart_id: v.cart_id })
            })
            Promise.all(cartIdList).then((res) => {
                    store.commit('order/DEL_PREPARE_ORDER')
                }
            )
            //  change status
            updatedOrder(orderRef.value.id, addrRef.id, status)
            // await after router back
            setTimeout(()=>{
                router.back()
            }, leave ? 100 : 2000)
            history.state.back == '/pay' && history.back()
        }
    })
}



const onAdd = () => Toast('新增地址');
const onEdit = (item, index) => Toast('编辑地址:' + index)



</script>

<style lang="scss" scoped>


.pay-bd {
    background: #f5f5f5;
    min-height: 90vh;
}

.head-back {
    width: 100%;
    height: 1.6rem;
    margin-bottom: 0.4rem;
    line-height: 0.8rem;
    font-size: 0.22rem;
    background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, #0091FF 50%);
    position: relative;
    // z-index: -1;
    color: white;
    text-align: center;
    .back-arrow {
        margin-left: 0.2rem;
        line-height: 0.8rem;
    }
}

.head-addr {
    width: 3.4rem;
    margin: 0 auto;
    height: 1.11rem;
    position: absolute;
    top: 0.9rem;
    left: 0.18rem;
    color: #333;
    background: #fff;
    padding: 0.14rem 0.16rem;
    box-sizing: border-box;
    border-radius: 0.08rem;

    .addr-title{
        line-height: 0.2rem;
        font-size: 0.18rem;
        font-weight: bold;
    }

    .addr-text {
        margin: 0.16rem 0 0 0;
        font-size: 0.16rem;
        // line-height: 0.24rem;
    }

    .addr-msg {
        margin-top: 0.1rem;
        font-size: 0.14rem;
        color: #aaa;

        span {
            display: inline-block;
            margin-right:  0.1rem;
        }
    }

    i {
        line-height: 0.8rem;
    }
}

.list {
    padding: 0.2rem 0 0.6rem;
    &>div {
        margin-bottom: 0.2rem;
    }

    img {
        width: 0.6rem;
        height: 0.6rem;
    }

    h3 {
        font-weight: bold;
        vertical-align: bottom;
        line-height: 0.6rem;
    }
}

.over-block {
    width: 3rem;
    height: 1.6rem;
    background: #fff;
    border-radius: 0.16rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    h3 {
        font-weight: bold;
        font-size: 0.16rem;
        margin: 0.24rem 0 0 0;
        line-height: 0.24rem;
        color: #333;
    }
    p {
        font-size: 0.14rem;
        line-height: 0.2rem;
        margin: 0.08rem 0 0.24rem;
        color: #666;
    }
    button {
        margin: 0 0.2rem
    }
}
</style>
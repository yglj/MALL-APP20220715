<template>
    <div class="order-wrap">
        <div class="head-zone">
            我的订单
        </div>

        <div class="order-ct">

            <div class="order-item" v-for="(item, idx) in orderList" :key="idx" @click="toOrderDetail(item.id)">
                        <div class="order-item-l">
                            <h3>{{ orderUUID(item.id) }}</h3>
                            <p>{{ orderTime(item.id) }}</p>
                            <div class="goods-imgs">
                                <img :src="path" alt="" v-for="(path, idx) in getOrderImgs(item.id)" :key="idx">
                            </div>
                        </div>
                        <div class="order-item-r">
                            <div class="order-state">
                                {{ getOrderStatus(item.status)  }}
                            </div>
                            <div class="order-price">
                                ${{ item.total_price }}
                            </div>
                            <div class="goods-num">
                                共{{ getOrderItemNum(item.id) }}件
                            </div>
                            <van-button square type="danger"  size="small" text="删除"  @click="delOrder(item.id)"/>
                        </div>

            </div>
        </div>

        <Docker></Docker>
    </div>
</template>

<script setup>
import Docker from '@/components/Docker.vue';
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import { HttpReq } from '@/tool/request'
import { useRouter } from 'vue-router'
import { Dialog, Notify  } from 'vant'

let store = useStore()
let orderList = computed( () => store.state.order.orderList )
let getOrderStatus = computed((n) => store.getters['order/orderStatus'] )


let orderUUID = computed( () => id => {
    let v = orderList.value.find( v => v.id == id )
    return `${v.id}-${v.order_id}-${v.shops_id}-${v.user_id}-${v.addr_id}`
})

let orderGoodsInfo = computed(() => id => {
    let v = orderList.value.find(v => v.id == id)
    let goodsList = JSON.parse(v.goods_info)
    return goodsList
})

let orderTime = computed(() => id => {
    let v = orderList.value.find(v => v.id == id)
    let dtime = new Date( Number( v.order_time ) )
    return dtime.toLocaleString()
})

let getOrderItemNum = computed(() => id => {
    return orderGoodsInfo.value(id).reduce( (pre, cur) => pre + cur.num, 0)
})

let getOrderImgs = computed(() => id => {
    return orderGoodsInfo.value(id).map( v => v.s_goods_photos[0].path ).slice(0, 4)
})

onBeforeMount(async ()=>{
    await store.dispatch({type: 'order/getOrderList'})
})

let router = useRouter()
const toOrderDetail = (id) => {
    // router.push( {"name":'pay', "params": {"order_id": id} })
}

const delOrder = (id) => {
    Dialog.confirm({
        message: 'del this order yes or no',
    }).then( async  () => {
        // on close
        let res = await store.dispatch({ type: 'order/deleteOrder' , order_id: id})
        await store.dispatch({ type: 'order/getOrderList' })
        Notify({ type: 'success', message: res.msg });
    }).catch(() => {});
}


// 1;
(async function(){
    // let res = await HttpReq('/address',
    //     addr
    // , 0)
    let url = '/order/3303'
    let data = {
        "status": "7",
        "addr_id": 2230
    }
    let res = await HttpReq( url,data
    ,2)
    // let res = await HttpReq('/address', null
    // ,1)
    console.log(res);
})()



</script>

<style lang="scss" scoped>
.order-wrap {
    height: calc(100vh - 0.2rem);
    overflow: hidden;
}

.head-zone {
    height: 0.44rem;
    line-height: 0.44rem;
    font-size: 0.18rem;
    text-align: center;
}

.order-ct {
    background: #f3f3f3;
    height: 100vh;
    overflow-y: scroll;
    padding: 0.1rem 0 0.7rem 0;
    .order-item{
        box-sizing: border-box;
        margin: 0.16rem 0.18rem 0 0.18rem;
        padding: 0.16rem;
        width: 3.4rem;
        height: 1.5rem;
        background: #fff;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;



        .order-item-l {
            h3 {
                font-size: 0.14rem;
                line-height: 0.22rem;
                margin-bottom: 0.1rem ;
            }
            .goods-imgs{
                margin-top: 0.16rem;
                img{
                    width: 0.6rem;
                    height: 0.6rem;
                    margin-right: 0.12rem;
                    background-color: yellow;
                }
            }
        }

        .order-item-r {
            text-align: right;
            .order-state {
                font-size: 0.14rem;
                height: 0.2rem;
                line-height: 0.26rem;
                color: #999;
            }
            .order-price{
                font-size: 0.14rem;
                line-height: 0.2rem;
                margin: 0.16rem 0 0.04rem;
                color: red;
            }
            .goods-num {
                font-size: 0.12rem;
            }

            button {
                margin-top: 0.1rem;
            }
        }

        &:last-child {
            margin-bottom: 1.6rem;
        }
    }
}
</style>
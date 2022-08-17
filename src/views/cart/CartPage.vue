<template>
    <div class="cart-body">
        <div class="head-zone">
            我的购物车（{{ cartList.length }}）
        </div>

        <div class="cart-ct">

            <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
                <div class="cart-item" v-for="(item, idx) in cartList" :key="idx">
                    <div class="cart-item-u">
                        <!-- <h3>{{ `${item.pid}-${item.cid}-${item.goods_id}  ` }}</h3> -->
                        <!-- <h3>{{ `${item.title}  ` }}</h3> -->
                    </div>
                    <div class="cart-item-bd">
                        <van-swipe-cell class="cart-item-swipe">
                            <van-checkbox v-model="checkedCart[item.uuid]"  size="21"
                                class="cart-item-bd-l"
                                checked-color=""
                                >
                            </van-checkbox>
                            <van-card  tag="hot" :price="item.sale_price + '.0' " :desc="item.desc" centered
                                :title="item.name" class="cart-item-bd-r" :thumb="item.imgOne"
                                :origin-price="item.price"
                                :thumb-link=" `/#/goods/${item.goods_id}` "
                                >
                                <template #tags>
                                    <router-link class="to-goods" :to=" `/goods/${item.goods_id}`">
                                    </router-link>
                                </template>
                                <template #footer>
                                    <div class="num-btns">
                                    <van-button square size="normal" type="primary" plain
                                    @click="changeCartNum( item.goods_id , 1)"
                                     class="num-btn"
                                    >+
                                    </van-button>
                                    <div class="num">
                                        <van-icon name="cross" />
                                        {{ item.num }}
                                    </div>
                                    <van-button square size="normal" type="danger" plain
                                        @click="changeCartNum( item.goods_id , -1)"
                                        class="num-btn"
                                        >-
                                    </van-button>
                                    </div>
                                </template>
                            </van-card>
                            <template #right>
                                <van-button square text="删除" type="danger" class="delete-button"
                                    @click="delCartItem(item.cid)" />
                            </template>
                        </van-swipe-cell>
                    </div>

                </div>
                <div v-if="cartList.length == 0" class="blank-cart"> 空空如也...  </div>
            </van-list>
        </div>

        <van-submit-bar :price="totalPrice" button-text="即刻下单" @submit="toPay" class="submit-bar"
        button-color="#0389ff"
        >
            <van-checkbox v-model="checkedAll">全选</van-checkbox>
            <template #tip v-if="checkedAll" class="checked-tip">
                <van-button square  plain hairline type="primary" @click="delCartAll" size="mini">全部删除
                </van-button>
            </template>
        </van-submit-bar>
        <Docker></Docker>
    </div>
</template>

<script setup>
import Docker from '@/components/Docker.vue';
import GoodList from '../home/shop/GoodList.vue';
import { ref, computed, onBeforeMount, onMounted , watchEffect } from 'vue'
import { useStore, mapState } from 'vuex'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { Dialog , Notify } from 'vant'

const store = useStore()
const router = useRouter()
// all checked
let checkedCart = ref({})
let checkedAll = computed({
    get(){
        if(!Object.values(checkedCart.value).length) return false
        return Object.values(checkedCart.value).every( v => v )
    },
    set(state){
        for (let key in checkedCart.value) {
            checkedCart.value[key] = state
        }
    }
})

// cart page data list
let cartList = computed( ()=>{
    let list = store.state.cart.cartList
    // 无数据
    if(list.length == 0) return []
    list = list.map( val => {
        let { id, goods_id, num, s_good, project_id } = val
        let { name, desc, price, sale_price, s_goods_photos } = s_good
        let  uuid = `${project_id}-${id}-${goods_id}`
        //  set checked status
        if( !checkedCart.value[uuid] ) checkedCart.value[uuid] = false
        return {
            pid: project_id, cid: id, goods_id, num, name, desc, price, sale_price, uuid,
            imgOne: s_goods_photos[0].path
        }
    })
    return list
})

// all checked totalprice
let totalPrice = computed(() => cartList.value && cartList.value.reduce( (pre, cur) => {
    // console.log(checkedCart[cur.uuid], checkedCart);
    return  checkedCart.value[cur.uuid] ? pre + cur.sale_price * cur.num : pre
}, 0 ) * 100 )

// ordered
const toPay = () => {
    let orderedList = []
    if(! Object.values(checkedCart.value).length) {
        Toast('please checked goods');
        return
    }
    Object.keys(checkedCart.value).forEach(val => {
        let item = cartList.value.find( v => v.uuid == val)
        orderedList.push({
            id: item.goods_id,
            num: item.num,
            cart_id: item.cid
        })
    })
    store.commit({
        type: "order/PREPARE_ORDER",
        goods_info: orderedList
    })
    router.push('/pay')
}


const changeCartNum = async (goods_id, add) => {
    await store.dispatch('cart/changeCartItem', {goods_id, add})
    store.dispatch('cart/getCartData')
}
const delCartItem = async (cart_id) => {
    Dialog.confirm({
        message: '确认删除？',
    }).then( async  () => {
        // on close
        let res = await store.dispatch('cart/delCartItem', {cart_id})
        store.dispatch('cart/getCartData')
        Notify({ message: res.msg , background:"#1c79c0"});
    }).catch(() => {});

}

const delCartAll = () => {
    Dialog.confirm({
        message: '确认删除？',
    }).then( async  () => {
        // on close
        let allRes = cartList.value.map(async (v) => {
            let res = await store.dispatch('cart/delCartItem', { cart_id: v.cid })
            console.log(res);
        })
        Promise.all(allRes).then((res)=>{
                Toast.success('已成功全部删除')
                store.dispatch('cart/getCartData')
                checkedCart.value = []
            }
        )
        Notify({ message: res.msg , background:"#1c79c0"});
    }).catch(() => {});


}

let loading = ref(null)
let finished = ref(false)


onBeforeMount(() => {
    store.dispatch('cart/getCartData')
})


const onClickLink = () => Toast('修改地址');

const onLoad = ()=>{
    // store.dispatch('cart/getCartData')
    finished.value = true
}


</script>

<style lang="scss" scoped>


.blank-cart {
    text-align: center;
    font-size: 0.2rem;

}

.cart-body {
    height: calc(100vh - 0.2rem);
    overflow: hidden;
}

.submit-bar {
    bottom: 0.5rem;


    &::after {
        content: '';
        display: block;
        width: 200%;
        border-bottom: 1px solid red;
        transform: scaleY(0.5);
    }
}


.head-zone {
    height: 0.44rem;
    line-height: 0.44rem;
    font-size: 0.18rem;
    text-align: center;
    background: #fff;
}



.cart-ct {
    background: #f3f3f3;
    height: 70vh;
    overflow: scroll;
    padding: 0.2rem 0 1rem;

    .cart-item {
        box-sizing: border-box;
        margin: 0 auto;
        margin-bottom: 0.2rem;
        padding: 0.16rem;
        width: 3.4rem;
        background: #fff;
        border-radius: 4px;


        .cart-item-u {
            h3 {
                font-size: 0.16rem;
                line-height: 0.22rem;
            }
        }

        .cart-item-bd {
            width: 100%;
            // margin-top: 0.1rem;
            position: relative;
            .cart-item-bd-l {
                display: inline-block;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                z-index:1;
            }
            .cart-item-bd-r {
                padding: 0;
                padding-left: 0.36rem;
                margin-bottom: 0.2rem;
                width: 100%;
                align-items: center;

                background: #fff;
            }

            .num-btns {
                display: flex;
                justify-content: flex-end;
                position: absolute;
                bottom: -0.2rem;
                right: 0.1rem;
                .num-btn {
                    height: 0.2rem;
                    max-width: 0.2rem;
                }
                .num {
                    margin: 0 0.08rem
                }
            }

            .cart-item-swipe{
                width: 100%;
                border: none;
                .delete-button {
                    box-sizing: content-box;
                    padding-bottom: 0.1rem;
                    padding-top: 0.1rem;
                    border: none;
                    // background: blue;
                    align-items: center;
                }
            }
        }

        .delete-button{
            height: 100%;
        }

        .to-goods {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255,0)
        }
        // .allshow-btn {
        //     width: 3.06rem;
        //     height: 0.28rem;
        //     line-height: 0.28rem;
        //     background: #F5F5F5;
        //     text-align: center;
        //     border-radius: 4px;
        // }
    }
}

</style>
<template>
    <div class="order-wrap">
        <div class="head-zone">
            我的订单
        </div>

        <div class="order-ct">
            <div class="order-item" v-for="(item, idx) in orderList" :key="idx">
                <div class="order-item-l">
                    <h3>wow</h3>
                    <div class="goods-imgs">
                        <img src="" alt="" v-for="(item, idx) in orderList" :key="idx">
                    </div>
                </div>
                <div class="order-item-r">
                    <div class="order-state">
                        已取消
                    </div>
                    <div class="order-price">
                        $2839
                    </div>
                    <div class="goods-num">
                        共22件
                    </div>
                </div>
            </div>
        </div>

        <Docker></Docker>
    </div>
</template>

<script setup>
import Docker from '@/components/Docker.vue';
let orderList = [
    { "id": 111 },
    { "id": 111 },
    { "id": 111 },
    { "id": 111 },
]
</script>

<style lang="scss" scoped>

.head-zone {
    height: 0.44rem;
    line-height: 0.44rem;
    font-size: 0.18rem;
    text-align: center;
}

.order-ct {
    background: #f3f3f3;
    height: 5.54rem;
    overflow: hidden;
    .order-item{
        box-sizing: border-box;
        margin: 0.16rem 0.18rem 0 0.18rem;
        padding: 0.16rem;
        width: 3.4rem;
        height: 1.1rem;
        background: #fff;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;

        .order-item-l {
            h3 {
                font-size: 0.16rem;
                line-height: 0.22rem;
            }
            .goods-imgs{
                margin-top: 0.16rem;
                img{
                    width: 0.4rem;
                    height: 0.4rem;
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
        }
    }
}
</style>
<template>
    <div class="pop-ct">
        <transition>
            <div class="pop-list" v-show="popShow">
                <div class="pop-list-head">
                    <label for="">
                        <input type="checkbox">
                        全选
                    </label>
                    <div class="clean-btn">清空购物车</div>
                </div>
                <GoodList class="goods"></GoodList>
            </div>
        </transition>
        <div class="pop-sum">
            <img src="" alt="" class="cart-pic" @click="popShow = !popShow">
            <div class="total">总计：<u>111</u> </div>
            <div class="pay-btn">去结算</div>
        </div>
    </div>
</template>

<script>
import GoodList from './GoodList.vue'
import { ref } from 'vue'
export default {
    setup() {

        let popShow = ref(false)
        // const popGoodsList = () => {

        // }
        return { popShow };
    },
    components: { GoodList }
}
</script>

<style lang="scss" scoped>
.v-enter, v-leave{
    opacity: 0;
    transform: translate(0, 140px);
    transition: all 2s ease;
}
.v-enter-active, .v-leave-active {
    opacity: 1;
    transform: translate(0, 0);
}


.pop-list {
    background-color: #fff;
    .pop-list-head {
        margin: 0 0.18rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.51rem;
        border-bottom: 1px solid #f1f1f1;
        font-size: 0.16rem;
    }
    .goods {
        width: 100%;
        height: 1.6rem;
    }
}

.pop-ct{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
}
.pop-sum {
    height: 0.49rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cart-pic {
    width: 0.26rem;
    height: 0.24rem;
    margin: 0 0.32rem 0 0.24rem;
}
.total {
    font-size: 0.14rem;
    line-height: 0.2rem;
    u {
        font-size: 0.18rem;
        color: #E93B3B;
    }
}

.pay-btn {
    width: 0.98rem;
    line-height: 0.49rem;
    text-align: center;
    color: #fff;
    background: #4FB0F9;
}
</style>
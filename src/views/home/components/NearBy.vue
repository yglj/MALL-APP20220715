<template>
    <div class="shops">
        <!-- 附近商铺组件区域 -->
        <h2 class="nearby_text">附近商铺</h2>
        <div class="nearby_shop" v-for="item in  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="item">
            <!-- {{ item }} -->
            <div class="shop-picture">
                <img src="@/assets/wrm.png" alt="">
            </div>
            <div class="shop-info">
                <h3>沃尔玛</h3>
                <p class="shop-text"> <span>月售1万+</span> <span>起送￥100</span> <span>基础运费￥5</span> </p>
                <p class="shop-discount">VIP尊享满89元减4元运费券（每月3张）</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>




.shops {
    margin-top: 0.1rem;
    background-color: #fff;
}
.nearby_text {
    padding-top: 0.16rem;
    margin:  0 0 0 0.18rem;
    font-size: 0.18rem;
    line-height: 0.25rem;
}
.nearby_shop {
    width: 100%;
    height: 0.86rem;
    padding-top: 0.14rem;
    .shop-picture  {
        display: inline-block;
        margin-left: 0.18rem;
        width: 0.56rem;
        height: 100%;
        img {
            height: 0.56rem;
            vertical-align: top;
        }
    }
    .shop-info  {
        vertical-align: top;
        display: inline-block;
        margin: 0 0 0 0.16rem;
        width: 2.67rem;
        height: 100%;
        border-bottom: 1px solid #f1f1f1;
        h3 {
            margin: 0;
            font-size: 0.16rem;
        }
        .shop-text {
            font-size: 0.13rem;
            margin: 0.08rem 0;
            span {
                margin-right: 0.16rem;
            }
        }
        .shop-discount {
            font-size: 0.13rem;
            color: red;
        }
    }
}
</style>
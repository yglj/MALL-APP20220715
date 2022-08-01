<template>
    <div class="wrap-ct">
        <div class="shops-ct" v-for="(item, index) in [1,2,3]" :key="index">
            <img src="" alt="" class="logo-l">
            <div class="shop-ct">
                <h3>沃尔玛</h3>
                <p class="sell-info">
                    <span>月售1万+</span>
                    <span>起送￥0</span>
                    <span>基础运费￥5</span>
                </p>
                <p class="lightline-text">
                    VIP至尊专享满999减66元消费券（限时2张）
                </p>
                <div class="goods-ct">
                    <div class="good-item" v-for="(item, index) in [1,2,3]" :key="index">
                        <img src="" alt="">
                        <span>番茄250g/份</span>
                        <div>
                            <i class="dprice">￥33.6</i>
                            <i class="nprice">￥48.9</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>


.wrap-ct{
    margin-top: 0.12rem;
    font-size: 0;
}

.shops-ct{
    margin: 0.12rem 0.18rem 0;
}

.logo-l{
    display: inline-block;
    width: 0.56rem;
    height: 0.56rem;
    background-color: purple;
}

.shop-ct{
    width: 2.67rem;
    height: 2.13rem;
    margin: 0 0 0 0.16rem;
    border-bottom: 1px solid #f1f1f1;
    font-size:0.16rem;
    color: #333;
    display: inline-block;
    vertical-align: top;

    h3 {
        line-height: 0.22rem;
    }

    .sell-info{
        margin: 0.08rem 0;

        span {
            margin-right: 0.16rem;
            color: #666;
            font-size: 0.13rem;
            // font-weight: bold;
            line-height: 0.18rem;
        }
    }

    .lightline-text{
        line-height: 0.18rem;
        font-size: 0.13rem;
        color: #e93b3b;
    }

    .goods-ct{
        margin-top: 0.08rem;
        display: flex;
        justify-content: flex-start;

        .good-item {
            margin-right: 0.16rem;
            img {
                display: block;
                width: 0.76rem;
                height: 0.76rem;
                background-color: blue;
            }

            span {
                font-size: 0.12rem;
                line-height: 0.18rem;
            }

            .dprice {
                font-weight: bold;
                font-size: 0.14rem;
                line-height: 0.2rem;
                color: #E93B3B;
            }
            .nprice {
                text-decoration: line-through;
                font-size: 0.1rem;
                color: #ccc;
            }

        }

    }

}


</style>

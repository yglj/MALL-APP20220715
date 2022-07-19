<template>
    <div class="docker">
        <!-- 容器区域 -->
        <div class="tab-item">
            <img src="@/assets/tab-home.png" alt="">
            <span>首页</span>
        </div>
        <div class="tab-item">
            <img src="@/assets/tab-home.png" alt="">
            <span>购物车</span>
        </div>
        <div class="tab-item">
            <img src="@/assets/tab-home.png" alt="">
            <span>订单</span>
        </div>
        <div class="tab-item">
            <img src="@/assets/tab-home.png" alt="">
            <span>我的</span>
        </div>
    </div>
</template>

<script>


</script>

<style lang="scss" scoped>
    .docker {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: .49rem;
        // background-color: red;
        border-top: 1px solid #f1f1f1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        .tab-item {
            width: 0.36rem;
            height: 0.5rem;
            line-height: 0.2rem;
            font-size: 0.1rem;
            img {
                display: block;
                margin: 0.07rem auto 0;
                width: 0.2rem;
                height: 0.2rem;
            }
        }
    }
</style>
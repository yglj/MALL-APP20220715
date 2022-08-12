<template>
    <div class="wrap-ct">
        <div class="search-count">共搜索到{{ searchCount }}条结果</div>
        <router-link class="shops-ct" v-for="(item, index) in searchList" :key="index" :to=" '/goods/' + item.id ">
            <img :src="item.s_goods_photos[0].path" alt="" class="logo-l">
            <div class="shop-ct">
                <h3> {{ item.name }} </h3>
                <p class="sell-info">
                    <!-- <span>月售1万+</span> -->
                    <!-- <span>起送￥0</span>
                    <span>基础运费￥5</span> -->
                    <span> 月售：{{item.sold_num }} </span>
                    <span> 库存：{{item.stock_num }} </span>
                </p>
                <p class="lightline-text">
                    <!-- VIP至尊专享满999减66元消费券（限时2张） -->
                    {{ item.desc }}
                </p>
                <div>
                    <i class="dprice">￥{{item.sale_price}}</i>
                    <i class="nprice">￥{{item.price}}</i>
                </div>
                <div class="goods-ct">
                    <div class="good-item" v-for="(img, index) in item.s_goods_photos.slice(0, 3)" :key="index">
                        <img :src="img.path" alt="">
                        <!-- <span>番茄250g/份</span> -->
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script setup>
const props = defineProps(
    { "searchList": [Array] , "searchCount": Number}
)


</script>

<style lang="scss" scoped>


.search-count {
    height: 0.2rem;
    line-height: 0.2rem;
    width: 100%;
    background: rgba(237, 237, 32, 0.484);
    text-align: center;
    color: #444;
    margin-bottom: 0.1rem;
    font-size: 0.12rem;
}


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
    padding-bottom: 0.1rem;
    // height: 2.13rem;
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
        margin: 0.1rem 0;
        line-height: 0.16rem;
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



        }

    }

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

</style>

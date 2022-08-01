<template>
    <div class="goodlist-ct">
        <div v-for="(item, index) in goods" :key="index" class="goods-ct">
            <img src="" alt="" class="goods-pic">
            <div class="goods-info">
                <h3>番茄250g/件</h3>
                <p class="sell-num">月售111件</p>
                <div>
                    <strong class="off-price">$34.9</strong>
                    <span class="price">$220.1</span>
                    <div class="amount">
                        <i class="reduce">-</i>
                        <span>
                        {{ item.buyNum }}
                        </span>
                        <i class="add">+</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

let goods = [
    {"buyNum": 1},
    {"buyNum": 12},
    {"buyNum": 123},
    {"buyNum": 1234},
    {"buyNum": 1234},
    {"buyNum": 1234},
    {"buyNum": 1234},
    {"buyNum": 1234},
    ]

</script>

<style lang="scss" scoped>

.goodlist-ct{
    overflow: scroll;
    display: inline-block;
    // width: 2rem;
    height: 4.41rem;
    overflow-x: hidden;
}
.goods-ct {
    margin: 0 0.18rem 0.12rem;
    height: 0.8rem;
    border-bottom: 1px solid #eee;
    display: flex;
    position: relative;

    .goods-pic {
        width: 0.68rem;
        height: 0.68rem;
        margin-right: 0.16rem;
        background-color: pink;
    }
    .goods-info {
        font-size: 0.14rem;
        h3 {
            height: 0.2rem;
            line-height: 0.2rem;
        }

        .sell-num {
            font-size: 0.12rem;
            line-height: 0.18rem;
            margin: 0.06rem 0;
        }
        .off-price {
            font-size: 0.13rem;
            color: #E93B3B;
            margin-right: 0.04rem;
        }
        .price {
            font-size: 0.1rem;
            color: #ccc;
            text-decoration: line-through;
        }

        .amount {
            position: absolute;
            right: 0;
            bottom: 0.12rem;
            // width: 0.8rem;
            height: 0.2rem;
            line-height: 0.2rem;
            text-align: center;
            span {
                display: inline-block;
                font-size: 0.14rem;
                width: 0.4rem;
            }
            .add  {
                display: inline-block;
                box-sizing: border-box;
                width: 0.2rem;
                height: 0.2rem;
                border-radius: 0.1rem;
                background-color: #0091FF;
                border: 1px solid #fff;
                color: #fff;
                font-size: 0.16rem;
                line-height: 0.18rem;
            }
            .reduce {
                display: inline-block;
                box-sizing: border-box;
                width: 0.2rem;
                height: 0.2rem;
                border-radius: 0.1rem;
                border: 1px solid #666;
                color: #666;
                font-size: 0.16rem;
                font-weight: bold;
                line-height: 0.18rem;
            }
        }

    }
}

</style>
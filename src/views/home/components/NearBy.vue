<template>
    <div class="shops">
        <slot></slot>

        <!-- 附近店铺区域 -->
        <!-- <router-link class="nearby_shop"
        v-for="(item,index) in shopList" :key="index"
        :to=" '/shop/' + ( shopId ? shopId : index ) ">
            <div class="shop-picture">
                <img src="@/assets/wrm.png" alt="">
            </div>
            <div class="shop-info">
                <h3>沃尔玛</h3>
                <p class="shop-text"> <span>月售1万+</span> <span>起送￥100</span> <span>基础运费￥5</span> </p>
                <p class="shop-discount">VIP尊享满89元减4元运费券（每月3张）</p>
            </div>
        </router-link> -->

        <!-- 瀑布流原生 -->
        <!-- <ul>
            <li v-for="(v, k) in waterfullList" :key="v.id" :ref="el => getLiRef(el, item)">
                <router-link :to=" '/shop/' + ( shopId ? shopId : v.id ) " class="shop-info">
                    <img :src="v.imgUrl" alt="" v-lazy="v.imgUrl" ref="imgs" class="shop-picture">
                    <h3> {{ v.title }}</h3>
                    <p class="shop-text"> <span>月售1万+</span> <span>起送￥100</span> </p>
                    <p class="shop-discount">VIP尊享满89元减4元运费券</p>
                </router-link>
            </li>
        </ul> -->

        <!-- <van-loading type="spinner" color="#1989fa" size="0.2rem" text-color="#1989fa" v-show="loadShow"
            class="loading"> 稍稍等一下哦...
        </van-loading> -->

        <div class="shop" ref="shopEl">
            <!-- <div class="title">
                <h2>热门商品</h2>
            </div> -->
            <div class="demo" style="margin: 0 auto" v-masonry gutter="15" percent-position="true" fit-width="true"
                ref="waterfullEl">
                <div v-masonry-tile class="card" v-for="item in waterfullList" :key="item.id">
                    <router-link :to="'/goods/' + (shopId ? shopId : item.id ) " class="shop-info">
                        <div>
                            <img :src="item.imgUrl" alt="" />
                            <div class="goodsMsg">
                                <div class="goodsName">
                                    <p>{{ item.title }}</p>
                                </div>
                                <!-- <div class="goodsDesc">{{ item.desc }}</div> -->
                                <div class="price">
                                    <p>
                                        <strong>￥</strong> {{ item.price }}
                                        <!-- <span>库存:{{ item.stock_num }}</span> -->
                                    </p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUpdated, nextTick } from 'vue'
import { useStore } from 'vuex';
import { throttleFunc } from '@/tool/ty'


const store = useStore()
const props = defineProps(
    {
        shopId: String,
        waterfullList: Array
    }
)
const emits = defineEmits(['loadData'])

// 触底加载
document.addEventListener("scroll",
    throttleFunc( (
    (e) =>{
        let preSltop = document.documentElement.scrollTop
        return () => {
            let { scrollHeight: sh, scrollTop: st, clientHeight: ch } = document.documentElement
            if (sh - st - ch < 20 && preSltop < st) {
                emits("loadData")
            }
            preSltop = st
        }
    })(), 600)
)
let waterfullEl = ref(null)
let shopEl = ref(null)

onUpdated(() => {
    // 確定渲染后得到高度
    nextTick( () => {
        setTimeout(()=>{
            // console.log(shopEl.value.style.height);
            shopEl.value.style.height = Number( waterfullEl.value.style.height.slice(0, -2) ) + 50 + "px"
            // console.log(shopEl.value.style.height);
        }, 500)
    } )

})

onMounted(() => {
})

// -----商店列表及id
let lis2 = ref([])
let { shopId } = props
let shopList = computed(() =>
    store.getters.shops(shopId)
)
const getLiRef = (el, item)=>{
    lis2.value.push({
        el, item
    })
}
// ----------------


</script>

<style lang="scss" scoped>




.loading{
    text-align: center;
}

// water 瀑布流练习
ul {
    position: relative;
    background: #fff;
    // color: #1989fa;
}
li {
    visibility: hidden;
    position: absolute;
    box-sizing: border-box;
    width: 48%;
    height: auto;
    padding: 0.1rem;
    line-height: 2;
    box-shadow: 0 0.06rem 0.06rem rgba(208, 63, 167, 0.14);

    img {
        width: 100%;
        display: block;
        height: auto;
    }

}

//
.shops {
    margin-top: 0.1rem;
    background-color: #fff;
}

.nearby_shop {
    display: block;
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
            line-height: 0.22rem;
        }
        .shop-text {
            font-size: 0.13rem;
            margin: 0.08rem 0;
            // line-height: 0.08rem;
            span {
                margin-right: 0.16rem;
            }
        }
        .shop-discount {
            font-size: 0.14rem;
            color: red;
        }
    }
}

.shop {
  .title {
    margin: 0.14rem 0 0.14rem 0.18rem;
    h2 {
      font-size: 0.18rem;
      color: #333;
    }
  }
  .card {
    width: 43vw;
    background-color: #fff;
    padding: 0.04rem;
    box-shadow: 0 0.06rem 0.06rem rgba(208, 63, 167, 0.14);
    border-radius: 0.08rem;
    margin-bottom: 0.1rem;
    img {
      width: 100%;
      display: block;
      height: auto;
    }
    .goodsMsg {
      .goodsName {
        margin: 0.1rem 0;
        p {
          font-size: 0.14rem;
          color: #333;
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .goodsDesc {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-bottom: 0.04rem;
        color: #666;
        font-size: 0.14rem;
      }
      .price {
        p {
          font-size: 0.16rem;
          color: #ff4142;
          margin: 0.03rem 0;
          span {
            font-size: 0.06rem;
            color: #999;
            margin-left: 0.3rem;
            display: inline-block;
          }
          strong {
            font-size: 0.14rem;
            margin-left: 0.04rem;
          }
        }
      }
    }
  }
}
</style>

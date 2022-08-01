<template>
    <div class="sidebar-nav">
        <div :class="['nav-item']" v-for="(item,index) in sideBarList" :key="index">
            {{item.title}}
        </div>
    </div>
</template>

<script setup>
let sideBarList = [
    {"title": "全部商品"},
    {"title": "秒杀"},
    {"title": "新鲜水果"},
    {"title": "休闲食品"},
    {"title": "时令蔬菜"},
    {"title": "肉蛋禽兽"},
]
</script>

<style lang="scss" scoped>

.sidebar-nav {
    height: 4.41rem;
    background: #f5f5f5;

    .nav-item {
        font-size: 0.16rem;
        text-align: center;
        height: 0.4rem;
        width: 100%;
        line-height: 0.4rem;
        color: #333;
    }

    .nav-item:hover {
        background-color: #fff;
    }
}
</style>
<template>
    <div>
        <div class="wrapper">
            <!-- this is index
            静态组件
            分类组件
            商铺组件
            容器组件（其他组件，非home私有） -->
            <StaticPart></StaticPart>
            <NearBy />
        </div>
        <Docker />
    </div>
</template>

<script setup>
import StaticPart from './components/StaticPart.vue';
import NearBy from './components/NearBy.vue';
import Docker from '../../components/Docker.vue';


</script>

<style lang="scss" scoped>
    .wrapper {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0.5rem;
        background-color: #f1f1f1;
        overflow-y: scroll;
    }
</style>
<template>
    <div class="phoneStatus">
      <div class="time"> {{ cur_time }} </div>
    </div>
    <SliderRouterView :routerType="$store.getters.routerType" mainComponentName="home"  class="slider-body"/>
</template>

<script setup>

import SliderRouterView from '@/components/SliderRouterView.vue'
import { ref, computed } from 'vue'
let cur_time = ref(null)
let time = ()=>{
  setInterval( ()=>{
    cur_time.value = new Date(Date.now()).toLocaleTimeString()
  }, 999)
}
time()

</script>

<style lang="scss" >
    @import url('./style/reset.css');
    @import url('./style/base.scss');
    .slider-body {
        position: relative;
        width: 100%;
        height: calc(100vh - 0.2rem);
        overflow: hidden;
    }

    .phoneStatus {
      width: 100%;
      height: 0.2rem;
      background: url("@/assets/phone-State.png");
      background-size: cover;
      background-repeat: no-repeat;
      text-align: center;
      .time {
        height: 100%;
        line-height: 0.2rem;
        width: 0.6rem;
        margin: 0 auto;
        background: #fff;
      }
    }

</style>

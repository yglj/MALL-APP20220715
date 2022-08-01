<template>
  <div class="phoneStatus"></div>
  <SliderRouterView :routerType="$store.getters.routerType"  mainComponentName="home" />
</template>

<script setup>

import SliderRouterView from '@/components/SliderRouterView.vue'

</script>

<style lang="scss" scoped>
    .phoneStatus {
      // position: fixed;
      // z-index: 999;
      width: 100%;
      height: 0.2rem;
      background: url("@/assets/phone-State.png");
      background-size: cover;
    }
</style>

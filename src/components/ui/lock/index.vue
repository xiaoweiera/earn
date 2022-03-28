<script setup lang="ts">
/**
 * @file 锁
 * @auth svon.me@gmail.com
 */
</script>

<template>
  <div class="relative">
    <div class="virtual-shadow h-20 absolute left-0 right-0 bottom-full"></div>
    <div class="text-center">
      <p>好空投一起撸，分享好友查看完整教程</p>
      <p>通过以下方式分享有效</p>
      <div>
        <i>1</i>
        <i class="ml-4">2</i>
        <i class="ml-4">3</i>
        <span class="ml-4">我已分享</span>
      </div>
      <div>
        <span>获得</span>
        <span>3</span>
        <span>名好友助力，即可解锁完整内容</span>
      </div>
      <div>
        <i>1</i>
        <i class="ml-4">2</i>
        <i class="ml-4">3</i>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.virtual-shadow {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.0716618) 0%, rgba(255, 255, 255, 0) 12.78%, #ffffff 100%);
}
</style>

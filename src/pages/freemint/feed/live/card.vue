<script setup lang="ts">
import Item from "./item.vue";
</script>
<template>
  <div>
    <div class="state h-7.75">
      <!--    分组-->
      <div class="yuan-blue"></div>
      <div class="state">
        <div class="flex-1 mr-1.5 text-kd14px18px text-global-primary">#149381933</div>
        <div class="text-kd12px16px text-global-text-grey">15分钟前</div>
      </div>
    </div>
    <!--    列表card-->
    <template v-for="(item, i) in 3" :key="item">
      <Item :class="i === 0 ? 'mt-1.5' : 'mt-4.5'" />
    </template>
  </div>
</template>
<style scoped lang="scss">
.yuan-blue {
  background: rgba(0, 111, 247, 0.12);
  border: 2px solid rgba(0, 111, 247, 1);
  @apply w-3 h-3 mr-1.5 ml-1.4 rounded-full relative flex justify-center items-center;
}
.yuan-blue:after {
  content: "";
  position: absolute;
  border-left: 1px solid rgba(3, 54, 102, 0.1);
  height: 100% !important;
  @apply top-3.5;
}
</style>

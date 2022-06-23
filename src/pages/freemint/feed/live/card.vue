<script setup lang="ts">
import Item from "./item.vue";
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div v-if="data">
    <div class="state h-7.75">
      <!--    分组-->
      <div class="yuan-blue"></div>
      <div class="state">
        <div class="flex-1 mr-1.5 text-kd14px18px text-global-primary font-kdFang">#{{ data.length > 0 ? data[0].blockNumber : "--" }}</div>
      </div>
    </div>
    <!--    列表card-->
    <template v-for="(item, i) in data" :key="item">
      <Item :class="i === 0 ? 'mt-1.5' : 'mt-4.5'" :data="item" />
    </template>
  </div>
</template>
<style scoped lang="scss">
.yuan-blue {
  background: rgba(0, 111, 247, 0.12);
  border: 2px solid rgba(0, 111, 247, 1);
  @apply w-3 h-3 mr-1.5 md:ml-1.4 rounded-full relative flex justify-center items-center;
}
.yuan-blue:after {
  content: "";
  position: absolute;
  border-left: 1px solid rgba(3, 54, 102, 0.1);
  height: 100% !important;
  @apply top-3.5;
}
</style>

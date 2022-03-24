<script setup lang="ts">
import { computed } from "vue";
import { transformNftList } from "src/logic/dapp";
import DAppNftList from "./list.vue";
const props = defineProps({
  list: {
    type: Object,
    required: true,
  },
});

const newList = computed(() => {
  // @ts-ignore
  return transformNftList(props.list);
});
</script>
<template>
  <div>
    <div v-for="data in newList" :key="data.date">
      <h3 class="py-4 text-kd18px24px text-global-bgBlack font-kdFang">{{ data.title }}</h3>
      <div class="coming-item showX">
        <div v-for="(item, index) in data.list" :key="item.id">
          <DAppNftList :key="item.id" :data="item" class="md:ml-0" :class="{ 'ml-6': index > 0 }" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.ui-tab {
  box-shadow: 0 1px 0 rgba(3, 54, 102, 0.06);
}
.coming-item {
  @apply flex items-center flex-nowrap;
}
@screen md {
  .coming-item {
    @apply grid grid-cols-3 gap-6;
  }
}
@screen lg {
  .coming-item {
    @apply grid grid-cols-4 gap-6;
  }
}
@screen xl {
  .coming-item {
    @apply grid grid-cols-5 gap-6;
  }
}
</style>

<script setup lang="ts">
import * as console from "src/plugins/log/";
defineProps({
  headerData: {
    type: Object,
    required: true,
  },
  param: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["onSort"]);
const onSort = () => {
  console.log("--");
  emit("onSort");
};
</script>
<template>
  <div>
    <div class="w-full px-3 flex items-center header h-10.5 bg-global-white rounded-kd6px">
      <template v-for="(item, i) in headerData" :key="i">
        <div :class="i === 0 ? item.width + item.class : item.width + item.class" class="flex whitespace-nowrap sort h-full text-kd14px18px text-opacity-65 text-global-highTitle">
          <div :class="item.key === param.sort_field ? 'tagBottom' : 'tagBottomNo'" class="h-full flex items-center">
            <UiSort :sort="item.sort" class="font-kdBarlow" :sort-data="param" :key-name="item.key" :name="item.name" @change="onSort" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped lang="scss">
.header {
  @apply flex items-center;
}
</style>

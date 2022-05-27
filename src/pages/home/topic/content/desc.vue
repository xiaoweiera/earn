<script setup lang="ts">
import I18n from "src/utils/i18n";
const i18n = I18n();

defineProps({
  field: {
    required: true,
    type: String,
  },
  data: {
    required: true,
    type: Object,
  },
  width: {
    type: Number,
    default: () => 150,
  },
});
</script>
<template>
  <div v-if="data[field]">
    <ui-hover :offset="5" rounded class="flex-popover overflow-hidden">
      <template #label>
        <div :style="{ width: width ? width + 'px' : 'auto' }" class="numberDefault short">
          <div class="text-kd14px18px text-global-primary">{{ data[field] }}</div>
        </div>
      </template>
      <template #content>
        <div class="">
          <div class="flex items-center">
            <ui-image oss class="w-10 h-10 mr-1.5" src="/common/testLogo.jpg" />
            <div class="text-kd16px22px text-global-highTitle font-medium">{{ i18n.common.reviews }}</div>
          </div>
          <div class="mt-1.5 text-kd14px20px text-global-highTitle">
            {{ data[field] }}
          </div>
        </div>
      </template>
    </ui-hover>
  </div>
  <span v-else class="numberDefault">-</span>
</template>
<style scoped lang="scss">
.numberDefault {
  @apply text-kd12px16px md:text-kd14px16px text-global-highTitle;
}
</style>

<script setup lang="ts">
/**
 * tag切换
 */
import { ref, onMounted } from "vue";
const props = defineProps({
  data: {
    type: Array(Object),
    default: () => [
      { name: "ETH", value: "eth" },
      // { name: "USD", value: "usd" },
    ],
  },
});
const emit = defineEmits(["change"]);
const tag = ref("");
const init = () => {
  if (props.data.length > 0) {
    tag.value = props.data[0].value;
  }
};
const selectTag = (value: string) => {
  tag.value = value;
  emit("change", value);
};
onMounted(() => {
  init();
});
</script>
<template>
  <div class="tag-container max-w-max">
    <template v-for="item in data" :key="item.value">
      <div class="tag" :class="item.value === tag ? 'tag-ok' : 'tag-no'" @click="selectTag(item.value)">{{ item.name }}</div>
    </template>
  </div>
</template>
<style scoped lang="scss">
.tag-container {
  background: #fafbfc;
  border: 1px solid rgba(3, 54, 102, 0.04);
  @apply h-7 h-7 flex items-center justify-center rounded-kd6px;
}
.tag {
  @apply px-2 h-6  flex justify-center items-center cursor-pointer rounded-kd4px;
}
.tag-ok {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.06);
  @apply text-kd12px16px font-medium text-global-black-title bg-global-white;
}
.tag-no {
  @apply text-kd12px16px font-medium text-global-text-grey;
}
</style>

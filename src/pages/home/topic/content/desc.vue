<script setup lang="ts">
defineProps({
  field: {
    required: true,
    type: String,
  },
  data: {
    required: true,
    type: Object,
  },
});
</script>

<template>
  <span class="numberDefault" v-text="data[field] || '-'"></span>
</template>
<style scoped lang="scss">
.numberDefault {
  @apply text-kd12px16px md:text-kd14px16px text-global-highTitle;
}
</style>

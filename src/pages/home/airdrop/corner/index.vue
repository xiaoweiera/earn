<script lang="ts" setup>
defineProps({
  size: {
    type: Number,
    default: () => 40,
  },
  type: {
    type: String,
    default: () => "",
  },
});
</script>

<template>
  <div>
    <IconFont :type="type" :size="size" />
  </div>
</template>

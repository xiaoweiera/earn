<script setup lang="ts">

defineProps ({
  title: {
    type: String,
    default: () => "",
  },
  tips: {
    type: String,
    default: () => "",
  },
});
</script>
<template>
  <div>
    <p class="text-kd30px28px md:text-kd40px40px text-global-highTitle font-semibold font-kdBarlow">{{ title }}</p>
    <p class="mt-3 text-kd13px18px md:text-kd14px18px text-global-highTitle text-opacity-45 font-kdInter">{{ tips }}</p>
  </div>
</template>

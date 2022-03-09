<script lang="ts" setup>
/**
 * @file 用于控制部分逻辑只在客服端执行
 * @author svon.me@gmail.com
 */
import { onMounted, ref } from "vue";

const load = ref<boolean>(false);
onMounted(() => {
  load.value = true;
});
</script>

<template>
  <div>
    <slot v-if="load" />
    <slot v-else name="note" />
  </div>
</template>

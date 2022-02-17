<script setup lang="ts">
/**
 * @file 用于控制部分逻辑只在客服端执行
 * @author svon.me@gmail.com
 */
import { ref, onMounted } from "vue";

const load = ref<boolean>(false);

onMounted(function () {
  load.value = true;
});
</script>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ClientOnly"
});
</script>

<template>
  <div>
    <slot v-if="load"></slot>
    <slot v-else name="note"></slot>
  </div>
</template>



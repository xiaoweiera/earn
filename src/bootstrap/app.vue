<script lang="ts" setup>
import Cookie from "src/plugins/browser/cookie";
import { onMounted, ref } from "vue";

const device = ref<string>("");

const init = async function () {
  const cookie = new Cookie();
  device.value = await cookie.getDeviceValue();
};

onMounted(init);
</script>
<template>
  <div :class="device" class="device">
    <router-view />
  </div>
</template>

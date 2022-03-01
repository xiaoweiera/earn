<script setup lang="ts">
import {onMounted, ref} from "vue";
import Cookie from "src/plugins/browser/cookie";

const device = ref<string>("");

const init = async function () {
  const cookie = new Cookie();
  device.value = await cookie.getDeviceValue();
};

onMounted(init);

</script>
<template>
  <div class="device" :class="device">
    <router-view></router-view>
  </div>
</template>

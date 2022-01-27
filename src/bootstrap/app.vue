<script setup lang="ts">
import {getEnv} from "src/config";
import {Device} from "src/config/process";
import Language from "src/types/language";
import {onMounted, ref} from "vue";

const lang = ref<Language>();
const device = ref<Device>();

onMounted(function () {
  const env = getEnv();
  lang.value = env.lang;
  device.value = Device.web;
});

</script>
<template>
  <div class="device" :class="[device, lang]">
    <router-view></router-view>
  </div>
</template>

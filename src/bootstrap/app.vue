<script setup lang="ts">
import {Device} from "src/config/process";
import {onMounted, ref} from "vue";

const device = ref<Device>();

onMounted(function () {
  device.value = Device.web;
});

</script>
<template>
  <div class="device" :class="device">
    <router-view></router-view>
  </div>
</template>

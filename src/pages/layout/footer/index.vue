<script setup lang="ts">
import Column from "./column.vue";
import { footers } from "src/config/footer";
</script>

<template>
  <div class="w-full wrap-footer-box is-web">
    <div class="wrap-footer">
      <div class="text-global-highTitle text-opacity-65">
        <ul class="lg:flex lg:justify-between">
          <li class="mb-4" v-for="(data, index) in footers" :key="index">
            <Column :data="data" :index="index"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap-footer-box {
  background-color: #F6F9FC;
  @apply pt-4 pb-8;
  @screen xl {
    @apply py-16;
  }
}
.wrap-footer {
  @apply max-w-300 px-4;
  @screen lg {
    @apply min-w-lg mx-auto;
  }
  @screen xl {
    @apply px-0;
  }
}
</style>


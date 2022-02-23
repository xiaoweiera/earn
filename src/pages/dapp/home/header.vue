<script setup lang="ts">
import VRouter from "~/components/v/router.vue";
import { getUrl } from "~/logic/dapp";

const props = defineProps({
  title: {
    type: String,
    default: () => '',
  },
  tips: {
    type: String,
    default: () => ''
  },
  status: {
    type: String,
    default: () => ''
  },
  type: {
    type: Boolean,
    default: () => true,
  }
})

</script>
<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center">
      <p class="text-kd32px32px text-global-highTitle font-kdSemiBold">{{title}}</p>
      <p class="text-kd14px18px text-global-highTitle text-opacity-45 font-kdFang ml-4">{{tips}}</p>
    </div>
    <div class="bg-global-darkblue bg-opacity-6 rounded-md px-3 py-2 flex items-center">
      <v-router :href="getUrl(status, type)" target="_blank">
        <span class="text-kd14px18px text-global-darkblue font-kdFang">View More</span>
      </v-router>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>
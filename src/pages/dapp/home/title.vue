<script lang="ts" setup>
import {getUrl} from "src/logic/dapp";

defineProps({
  title: {
    type: String,
    default: () => '',
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
  <div class="flex justify-between">
    <p class="text-24px28px text-global-highTitle font-semibold font-Barlow">{{ title }}</p>
    <div class="flex items-center">
      <v-router :href="getUrl(status, type)" target="_blank">
        <span class="text-14px18px text-global-darkblue font-kdFang">More</span>
        <IconFont class="text-global-darkblue ml-0.5" size="12" type="icon-rightNo"/>
      </v-router>
    </div>
  </div>
</template>

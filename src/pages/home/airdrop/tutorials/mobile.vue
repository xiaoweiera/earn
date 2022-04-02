<script lang="ts" setup>
import { PropType } from "vue";
import { tutorialData } from "src/types/home";
import { dateDiff } from "src/utils/time";
import { makeDetailLink } from "src/logic/blog";

defineProps({
  data: {
    type: Object as PropType<tutorialData>,
    default: () => {
      return {};
    },
  },
});
</script>

<template>
  <div v-if="data">
    <v-router class="block w-full h-full" :href="makeDetailLink(data.id)" target="_blank">
      <div class="w-full min-h-42 h-42">
        <p class="w-full h-full rounded-md overflow-hidden">
          <ui-image class="w-full h-full" fit="cover" :src="data.cover" :lazy="true"></ui-image>
        </p>
      </div>
      <div class="mt-3">
        <p class="text-kd18px24px text-global-highTitle font-medium blog-font">{{ data.name }}</p>
      </div>
      <div class="mt-2">
        <p class="text-kd14px18px text-global-highTitle text-opacity-85 blog-font">
          <span>{{ data.author }}</span>
          <span class="m-x-1">·</span>
          <span>{{ dateDiff(data.release_date) }}</span>
        </p>
      </div>
    </v-router>
  </div>
</template>

<style lang="scss" scoped>
.blog-font {
  font-family: "PingFang SC" !important;
}
</style>

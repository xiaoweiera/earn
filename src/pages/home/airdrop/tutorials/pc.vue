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
    <v-router class="block w-full h-39.75" :href="makeDetailLink(data.id)" target="_blank">
      <div class="flex xl:justify-between h-full">
        <div class="min-w-83 w-83 h-full">
          <p class="w-full h-full rounded-md overflow-hidden">
            <ui-image class="w-full h-full" fit="cover" :src="data.cover" :lazy="true"></ui-image>
          </p>
        </div>
        <div class="ml-4 flex flex-col justify-between">
          <div class="min-w-67.5 w-full xl:w-67.5 h-full">
            <p class="text-kd18px24px text-global-highTitle font-medium blog-font line-clamp-3">{{ data.name }}</p>
            <p v-if="data.desc" class="mt-2 text-kd14px18px text-global-highTitle text-opacity-65 font-normal line-clamp-3 blog-font" v-text="data.desc"></p>
          </div>
          <div class="w-full">
            <p class="text-kd14px18px text-global-highTitle text-opacity-85 blog-font">
              <span>{{ data.author }}</span>
              <span class="m-x-1">·</span>
              <span>{{ dateDiff(data.release_date) }}</span>
            </p>
          </div>
        </div>
      </div>
    </v-router>
  </div>
</template>

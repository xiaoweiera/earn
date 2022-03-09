<script setup lang="ts">
import type { PropType } from "vue";
import type { BlogData } from "src/types/blog/";
import { dateDiff } from "src/utils/time/";
import { makeDetailLink } from "src/logic/blog";

defineProps({
  data: {
    required: true,
    type: Object as PropType<BlogData>,
  },
  absolute: {
    type: Boolean,
    default: () => false,
  },
});
</script>

<template>
  <div>
    <v-router class="block" :href="makeDetailLink(data.id)" target="_blank">
      <div class="row-item flex w-full h-17 md:h-36.5">
        <div class="left-item h-full overflow-hidden">
          <ui-image class="w-full h-full" fit="cover" :src="data.cover" :lazy="true" />
        </div>
        <div class="flex-1 w-1 ml-4 py-0.5 md:py-2 flex flex-col justify-between md:flex-auto">
          <div class="new-top w-full overflow-hidden">
            <div class="text-14-20 font-medium text-global-highTitle w-full line-clamp-2" v-text="data.name" />
            <div v-if="data.desc" class="mt-2 text-14-22 text-global-highTitle text-opacity-65 line-clamp-3" v-text="data.desc" />
          </div>
          <div>
            <div class="md:text-14 text-12 text-global-highTitle text-opacity-65">
              <span>{{ data.author }}</span>
              <span class="m-x-1">·</span>
              <span>{{ dateDiff(data.release_date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </v-router>
  </div>
</template>
<style lang="scss" scoped>
/** 列表动画组 */
.row-item {
  .left-item, .ui-image {
    transition: all 0.2s;
  }
  .left-item {
    @apply w-32.5 md:min-w-73;
  }
  @screen md {
    &:hover {
      .left-item {
        @apply w-71.5;
      }
      .ui-image {
        transform: scale(1.15);
      }
    }
  }
}
</style>

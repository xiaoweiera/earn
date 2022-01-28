<script setup lang="ts">
import { PropType } from "vue";
import * as blog from "src/logic/blog";
import { BlogData } from "src/types/blog/";

const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<BlogData>
  },
  absolute: {
    type: Boolean,
    default: () => false
  }
});
</script>

<template>
  <v-router :href="blog.makeDetailLink(data.id)" target="_blank" class="block blog-item h-32.75" :class="{'relative': absolute}">
    <div class="w-full h-full">
      <div class="equal-content w-full h-full">
        <ui-image class="w-full h-full" fit="fill" :src="data.cover"/>
      </div>
    </div>
    <div :class="{'blog-detail': absolute}">
      <h3 class="title text-12-16 md:text-16-24 text-global-highTitle font-m max-w-full truncate">
        <span>{{ data.name }}</span>
      </h3>
    </div>
  </v-router>
</template>



<style scoped lang="scss">
.blog-item {
  @apply w-full;
  .title, .describe {
    @apply mt-1.5;
  }
  .blog-detail {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
    @apply min-h-15 flex items-end px-3 pb-3;
    @apply absolute left-0 right-0 bottom-0;
    .title {
      @apply h-auto mt-0 text-white;
    }
    .describe {
      @apply text-white;
    }
  }
}

</style>

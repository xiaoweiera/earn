<script setup lang="ts">
import { onMounted } from "vue";
import { Model } from "src/logic/blog";
import type { AdData, BlogData } from "src/types/blog/";
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import Item from "./item.vue";

// 置顶数据
const topList = createRef<BlogData[]>("API.blog.getTopList", []);
const adList = createRef<AdData[]>("API.blog.ads", []);

onMounted(() => {
  const api = new Model();
  onLoadRef(topList, api.getTopList);
  onLoadRef(adList, "API.blog.ads");
});
</script>

<template>
  <div class="blog-header" :class="{'hots': topList.length > 0}">
    <div class="banner-wrap">
      <div class="banner-content">
        <ui-banner class="w-full h-full" :list="adList">
          <template #item="scope">
            <v-router class="block h-full" :href="scope.data.url" target="_blank">
              <ui-image class="h-full" :src="scope.data.image" fit="cover" />
            </v-router>
          </template>
        </ui-banner>
      </div>
    </div>

    <div class="hot-wrap">
      <!-- 置顶数据 -->
      <template v-for="(value, index) in topList" :key="index">
        <Item v-if="index < 2" class="hot-content" :data="value" :absolute="true" />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
%banner {
  .banner-content {
    @apply w-full h-full;
  }
}

.blog-header {
  @apply h-71.5;
  .hot-wrap {
    @apply hidden;
  }
  .banner-content {
    ::v-deep(.swiper-pagination-bullet) {
      &:only-child {
        @apply hidden;
      }
    }
  }
  &.hots {
    .hot-wrap {
      @apply flex px-0 mt-4;
      .hot-content {
        @apply ml-2.5 w-1/2 h-21.25;
        &:first-child {
          @apply ml-0 mt-0;
        }
      }
      @screen md {
        .hot-content {
          @apply ml-2.5 w-full h-32.75;
        }
      }
    }
    .banner-wrap {
      @apply h-43.5;
      @screen md {
        @apply h-71.5 px-0 mt-0;
      }
    }
    @screen md {
      @apply flex;
      .hot-wrap {
        @apply block px-0 mt-0 ml-5.5 min-h-71.5;
        .hot-content {
          @apply mt-6 ml-0 w-66;
        }
      }
      .banner-wrap {
        flex: 1;
        height: initial;
        @extend %banner;
      }
    }
  }
  &:not(.hots) {
    @screen lg {
      .banner-content {
        @apply h-71.5;
      }
    }
  }
}
</style>

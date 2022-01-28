<script setup lang="ts">
import { PropType } from "vue";
import * as blog from "src/logic/blog";
import { BlogData } from "src/types/blog/";
import { dateDiff } from "src/utils/time/";

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
<div>
  <v-router :href="blog.makeDetailLink(data.id)" target="_blank">
    <div class="rowItem flex w-full h-17 md:h-36.5">
      <div class="leftItem w-32.5 h-full md:min-w-73">
        <ui-image class="hoverImg w-full h-full" fit="cover" :src="data.cover" :lazy="true"/>
      </div>
      <div class="rightItem flex-1 ml-4 py-0.5 md:py-2 flex flex-col justify-between md:flex-auto">
        <div class="new-top w-full overflow-hidden">
          <div class="text-kd14px20px md:text-kd18px24px lg:texg font-medium text-global-highTitle w-full small">
            {{data.name}}
          </div>
          <div class="hidden md:block mt-2 text-kd14px22px text-global-highTitle text-opacity-65 omit">
            {{data.desc}}
          </div>
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
// 列表动画组
.rowItem {
  &:hover {
    .leftItem {
      .hoverImg{
        width: 97%;
        ::v-deep(.el-image__inner){
          transform:scale(1.1,1.1);
        }
      }
    }
    .rightItem{
      -webkit-transform:translateX(-13px);
      transform:translateX(-13px);
    }
  }
  .leftItem {
    .hoverImg{
      transition: all 0.2s;
      ::v-deep(.el-image__inner) {
        transition: all 0.2s;
      }
    }
  }
  .rightItem {
    transition: all 0.2s;
  }
}
.rightItem {
  .small {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  @screen md{
    .small{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
    .omit {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }
}
</style>

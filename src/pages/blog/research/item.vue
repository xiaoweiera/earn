<script setup lang="ts">
import {PropType} from "vue";
import { BlogData } from "src/types/blog";
import { dateDiff } from "src/utils/time/";
import { makeDetailLink } from "src/logic/blog";

defineProps({
  list: {
    type: Array as PropType<BlogData[]>,
    default: () => {
      return [];
    },
  },
});
</script>

<template>
  <div class="blog-font" v-if="list.length > 0">
    <!-- pc端 -->
    <div class="hidden lg:block">
      <div class="w-full h-87.5 flex justify-between">
        <!-- 左侧内容 -->
        <v-router :href="makeDetailLink(list[0].id)" target="_blank">
          <div class="flex-1 max-w-125 w-125 h-full flex flex-col justify-between">
            <div class="w-full">
              <p class="w-full h-60">
                <ui-image class="w-full h-full rounded-md" fit="cover" :src="list[0].cover" :lazy="true"></ui-image>
              </p>
              <p class="w-full h-6 mt-4 text-kd18px24px text-global-highTitle font-medium blog-font line-clamp-1">{{ list[0].name}}</p>
              <p v-if="list[0].desc" class="w-full h-9 mt-2 text-kd14px18px text-global-highTitle text-opacity-65 font-normal line-clamp-2 blog-font" v-text="list[0].desc"></p>
            </div>
            <div class="w-full h-4.5 mt-2 text-kd14px18px text-global-highTitle text-opacity-85 blog-font">
              <span>{{ list[0].author }}</span>
              <span class="m-x-1">·</span>
              <span>{{ dateDiff(list[0].release_date) }}</span>
            </div>
          </div>
        </v-router>
        <div class="w-0.25 h-full bg-global-highTitle bg-opacity-6 mx-4"></div>
        <!--右侧内容-->
        <div class="max-w-178 w-178 h-full">
          <v-router class="w-full h-full" :href="makeDetailLink(list[1].id)" target="_blank">
            <div class="flex justify-between h-39.75">
              <div class="mr-4 flex flex-col justify-between">
                <div class="max-w-91 w-91 h-full">
                  <p class="text-kd18px24px text-global-highTitle font-medium blog-font">{{ list[1].name}}</p>
                  <p v-if="list[1].desc" class="mt-2 text-kd14px18px text-global-highTitle text-opacity-65 font-normal line-clamp-2 blog-font" v-text="list[1].desc"></p>
                </div>
                <div class="w-full">
                  <p class="text-kd14px18px text-global-highTitle text-opacity-85 blog-font">
                    <span>{{ list[1].author }}</span>
                    <span class="m-x-1">·</span>
                    <span>{{ dateDiff(list[1].release_date) }}</span>
                  </p>
                </div>
              </div>
              <div class="w-83 h-full">
                <p class="w-full h-full">
                  <ui-image class="w-full h-full rounded-md" fit="cover" :src="list[1].cover" :lazy="true"></ui-image>
                </p>
              </div>
            </div>
          </v-router>
          <div class="w-full h-0.25 bg-global-highTitle bg-opacity-6 my-4"></div>
          <v-router class="w-full h-full" :href="makeDetailLink(list[2].id)" target="_blank">
            <div class="flex justify-between h-39.75">
              <div class="mr-4 flex flex-col justify-between">
                <div class="max-w-91 w-91 h-full">
                  <p class="text-kd18px24px text-global-highTitle font-medium blog-font">{{ list[2].name}}</p>
                  <p v-if="list[2].desc" class="mt-2 text-kd14px18px text-global-highTitle text-opacity-65 font-normal line-clamp-2 blog-font" v-text="list[2].desc"></p>
                </div>
                <div class="w-full">
                  <p class="text-kd14px18px text-global-highTitle text-opacity-85 blog-font">
                    <span>{{ list[2].author }}</span>
                    <span class="m-x-1">·</span>
                    <span>{{ dateDiff(list[2].release_date) }}</span>
                  </p>
                </div>
              </div>
              <div class="w-83 h-full">
                <p class="w-full h-full">
                  <ui-image class="w-full h-full rounded-md" fit="cover" :src="list[2].cover" :lazy="true"></ui-image>
                </p>
              </div>
            </div>
          </v-router>
        </div>
      </div>
    </div>
    <!-- 手机端 -->
    <div class="block lg:hidden">
      <div v-for="(item, index) in list" :key="index">
        <v-router class="block mb-2.5" :href="makeDetailLink(item.id)" target="_blank">
          <div class="row-item flex w-full h-17.5">
            <div class="w-32.5 h-full overflow-hidden">
              <ui-image class="w-full h-full rounded-md" fit="cover" :src="item.cover" :lazy="true" />
            </div>
            <div class="flex-1 w-1 ml-4 py-0.5 flex flex-col justify-between">
              <div class="new-top w-full overflow-hidden">
                <div class="text-kd14px18px font-medium text-global-highTitle w-full line-clamp-2 blog-font" v-text="item.name" />
              </div>
              <div>
                <div class="text-kd12px16px text-global-highTitle text-opacity-85 blog-font">
                  <span>{{ item.author }}</span>
                  <span class="m-x-1">·</span>
                  <span>{{ dateDiff(item.release_date) }}</span>
                </div>
              </div>
            </div>
          </div>
        </v-router>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-font {
  font-family: "PingFang SC" !important;
}
</style>
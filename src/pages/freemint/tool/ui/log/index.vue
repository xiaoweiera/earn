<script setup lang="ts">
/**
 * Mint日志
 */
import Tip from "./tip.vue";
import Info from "./info.vue";
import { PropType, ref, watch } from "vue";
import { toolMode } from "src/types/freemint";
const props = defineProps({
  toolModel: {
    type: Object as PropType<toolMode>,
    required: true,
  },
});
const tagIndex = ref("all");
const isBegin = ref(false); //是否存在log日志
watch(
  () => props.toolModel.start_running,
  () => (isBegin.value = true),
);
const tagList = [
  { name: "All", value: "all" },
  { name: "屏蔽", value: "noShow" },
  { name: "筛选", value: "select" },
  { name: "成功", value: "success" },
  { name: "失败", value: "fail" },
];
const selectTag = (value: string) => (tagIndex.value = value);
</script>
<template>
  <div class="border-css">
    <div>
      <div class="flex items-center">
        <ui-image class="mr-2 w-5 h-5" oss src="/mint/data.png" />
        <div class="title" @click="init">Mint 日志</div>
      </div>
      <div class="tips mt-1.5">tips：开始 Auto Mint 后，请不要关闭/刷新页面。关闭/刷新 页面会导致 Auto Mint 程序终止</div>
    </div>
    <div class="flex items-center mt-4 tagList">
      <template v-for="item in tagList" :key="item.value">
        <div class="tag" :class="tagIndex === item.value ? 'tag-ok' : 'tag-no'" @click="selectTag(item.value)">{{ item.name }}</div>
      </template>
    </div>
    <!--    Mint 程序日志  暂时无日志-->
    <div v-if="!isBegin" class="log-content no-log">Mint 程序未启动，暂无 Mint 日志</div>
    <div v-else class="log-content ok-log">
      <!--记录列表-->
      <div class="recordList">
        <template v-for="info in toolModel.logs" :key="info">
          <div v-show="info['state'] === tagIndex || tagIndex === 'all'" class="record">
            <Tip v-if="info['state']" :type="info['state']" class="mr-3" />
            <div :style="{ color: `${info['color']}` }" class="text">{{ info["msg"] }}</div>
          </div>
        </template>
      </div>
      <!--运行提示-->
      <Info v-if="toolModel.start_running" type="going" class="mt-4" />
      <!--      <Info type="waring" class="mt-4" />-->
    </div>
  </div>
</template>
<style scoped lang="scss">
.record {
  @apply mt-2.5 flex items-center;
}
.text {
  @apply text-kd13px18px;
}
.tagList {
  border-bottom: 1px solid rgba(3, 54, 102, 0.04);
}
.tag {
  @apply text-kd14px18px font-medium relative cursor-pointer h-6;
}
.tag-ok {
  @apply text-global-primary;
}
.tag-ok::after {
  content: "";
  border-bottom: 2px solid #006ff7;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.tag-no {
  @apply text-global-text-grey;
}
.tag:not(:last-child) {
  @apply mr-6;
}
.tips {
  color: #989898;
  @apply text-kd12px16px;
}
.log-content {
  @apply min-h-16.5;
}
.no-log {
  @apply text-kd13px18px flex items-center justify-center text-global-text-grey;
}
.ok-log-des {
  @apply text-kd12px16px text-global-black-desc;
}
</style>

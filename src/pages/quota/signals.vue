<script lang="ts" setup>
/**
 * @file 指标推荐
 * @auth svon.me@gmail.com
 */
import Tips from "./tips.vue";
import List from "./list/index.vue";
</script>

<template>
  <div class="px-4 lg:px-0 bg-global-topBg">
    <div class="md:max-w-235 mx-auto pb-15">
      <ui-box class="pt-4">
        <!--左侧列表-->
        <div class="lg:pr-4">
          <Tips />
          <List />
        </div>
        <!--右侧 App 下载-->
        <template #right>
          <ui-app-download />
        </template>
      </ui-box>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-box {
  --ui-box-right: 184px;
}
</style>

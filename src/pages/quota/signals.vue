<script lang="ts" setup>
/**
 * @file 指标推荐
 * @auth svon.me@gmail.com
 */
import List from "./list/index.vue";
</script>

<template>
  <div class="px-4 md:px-0">
    <div class="md:max-w-235 mx-auto pb-15">
      <ui-box class="pt-4">
        <!--左侧列表-->
        <div class="md:pr-4">
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

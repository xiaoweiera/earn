<script setup lang="ts">
/**
 * @file 二级菜单
 * @author svon.me@gmail.com
 */

import { toInteger } from "src/utils";
import {PropType} from "vue";
import { MenuItem } from "src/types/menu/";

defineProps({
  list: {
    default: () => [],
    type: Array as PropType<MenuItem[]>,
  },
  sub: {
    type: String,
  }
});
</script>

<template>
  <div class="bg-white ui-header-sub">
    <div class="h-full px-20 flex items-center justify-between text-kdFang">
      <div class="sub-content text-global-highTitle text-opacity-65">
        <div class="flex h-full">
          <template v-for="(data, index) in list" :key="index">
            <template v-if="data.header">
              <v-router class="sub-menu-item text-14-18 whitespace-nowrap" :class="{'active': data.active}" :href="data.href" :target="data.target ? '_blank': '_self'">
                <span>{{ data.name }}</span>
                <i :class="{'hidden': toInteger(data.message) === 0}">{{ toInteger(data.message) }}</i>
              </v-router>
            </template>
          </template>
        </div>
      </div>
      <div class="extend ml-5 h-full">
        <div class='hidden md:block h-full' v-if="sub">
          <client-only>
            <component :is="sub"></component>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-header-sub {
  border-bottom: 1px solid rgba(#033666, 0.06);
  box-shadow: 0 1px 0 rgba(#fff, 0.08);
}
.sub-content {
  @apply h-full;
  .sub-menu-item {
    @apply h-full flex items-center px-2 ml-8 font-normal;
    &:first-child {
      @apply ml-0;
    }
    &.active, &[href]:hover {
      @apply text-global-primary text-opacity-100;
      box-shadow: inset 0px -2px 0px #2B8DFE;
    }

    @apply relative;
    i {
      height: 18px;
      min-width: 18px;
      background-color: #E9592D;
      border-radius: 18px;
      line-height: 18px;
      font-size: 12px;
      padding-left: 5px;
      padding-right: 5px;
      transform: translate(0, 6px);
      @apply text-white not-italic text-center;
      @apply absolute right-0 top-0;
    }
  }
}
</style>

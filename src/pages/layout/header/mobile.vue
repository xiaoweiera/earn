<script setup lang="ts">
import type { PropType } from "vue";
import I18n from "src/utils/i18n";
import { getEnv } from "src/config/";
import type { MenuItem } from "src/types/menu/";
import { ElContainer, ElFooter, ElMain } from "element-plus";
import MobileList from "./mlist.vue";

defineProps({
  menus: {
    default: () => [],
    type: Array as PropType<MenuItem[]>,
  },
});

const i18n = I18n();
const env = getEnv();

</script>

<template>
  <div class="ui-mobile-menu">
    <div class="flex items-center">
      <label class="icon-btn flex cursor-pointer select-none" for="ui-header-mobile">
        <IconFont class="icon-btn-on" type="icon-gengduo1" size="24" />
        <IconFont class="icon-btn-off text-white" type="icon-xClose" size="24" />
      </label>
    </div>
    <div class="wrap-mobile-content top-header fixed left-0 right-0 bottom-0 bg-global-blueGg">
      <el-container direction="vertical" class="h-full w-full">
        <el-main class="p-0">
          <MobileList :list="menus" />
        </el-main>
        <el-footer height="initial" class="p-0">
          <div class="px-4 pb-4 text-kdFang text-white">
            <v-router class="flex items-center justify-center h-16 bg-global-darkblue rounded-xl" :href="env.appDownload">
              <IconFont class="flex" type="icon-shouji" size="24" />
              <span class="text-base ml-2 text-base ">{{ i18n.common.nav.download }}</span>
            </v-router>
          </div>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap-mobile-content {
  @apply z-1020 hidden;
}
.ui-mobile-menu {
  .icon-btn-off {
    @apply hidden;
  }
  @at-root .layout #ui-header-mobile:checked ~ .header-wrap & {
    .icon-btn {
      .icon-btn-on {
        @apply hidden;
      }
      .icon-btn-off {
        @apply inline-flex;
      }
    }
    .wrap-mobile-content {
      @apply block;
    }
  }
}
</style>

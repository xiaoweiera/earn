<script setup lang="ts">
import type { PropType } from "vue";
import I18n from "src/utils/i18n";
import { getEnv } from "src/config/";
import type { MenuItem } from "src/types/menu/";
import { ElContainer, ElMain } from "element-plus";
import List from "./list.vue";

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
    <div class="wrap-mobile-content top-header fixed left-0 right-0 bottom-0 bg-global-navBody">
      <el-container direction="vertical" class="h-full w-full">
        <el-main class="mobile-contanier">
          <div class="yin w-full h-full overflow-auto">
            <List :list="menus" />
            <div class="text-kdFang text-white mt-4">
              <v-router class="flex items-center justify-center h-11 bg-global-darkblue rounded-kd6px" :href="env.appDownload">
                <IconFont class="flex" type="icon-shouji" size="16" />
                <span class="text-kd16px22px font-medium font-kdFang ml-2">{{ i18n.common.nav.download }}</span>
              </v-router>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mobile-contanier {
  //#FAFBFC
  background: #fafbfc !important;
  padding: 0 !important;
}
.yin {
  @apply px-4 pb-4;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.1);
  @apply bg-global-white rounded-md;
}
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

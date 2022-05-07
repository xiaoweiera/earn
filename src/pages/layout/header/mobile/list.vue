<script lang="ts" setup>
import type { PropType } from "vue";
import type { MenuItem } from "src/types/menu/";
import safeGet from "@fengqiaogang/safe-get";
import VRouter from "src/components/v/router.vue";
import I18n from "src/utils/i18n";

const i18n = I18n();
defineProps({
  list: {
    type: Array as PropType<MenuItem[]>,
    default() {
      return [];
    },
  },
});
</script>

<template>
  <div class="">
    <div class="flex flex-wrap h-full">
      <template v-for="data in list.slice(0, 4)" :key="data.id">
        <div class="w-1/2 mb-2">
          <span class="title">{{ data.name }}</span>
          <template v-for="item in data.children" :key="item.name">
            <v-router :href="item.href" class="flex items-center py-2 min-h-10">
              <IconFont size="24" class="mr-2" :type="item.icon" />
              <span class="item-name">{{ item.name }}</span>
            </v-router>
          </template>
        </div>
      </template>
    </div>
    <div>
      <span class="title">{{ i18n.common.more }}</span>
      <template v-for="data in list.slice(4)" :key="data.id">
        <div class="w-full">
          <div v-if="safeGet(data, 'children.length') > 0">
            <template v-for="item in data.children" :key="item.name">
              <v-router :href="item.href" class="flex items-center py-2 min-h-10">
                <IconFont size="24" class="mr-2" :type="item.icon" />
                <span class="item-name">{{ item.name }}</span>
              </v-router>
            </template>
          </div>
          <div v-else>
            <v-router :href="data.href" class="flex items-center py-2 min-h-10">
              <IconFont size="24" class="mr-2" :type="data.icon" />
              <span class="item-name">{{ data.name }}</span>
            </v-router>
          </div>
        </div>
      </template>
    </div>
  </div>

  <!--    <MSub v-if="data.children" :list="data.children" />-->
</template>
<style scoped lang="scss">
.title {
  @apply text-kd13px18px text-global-highTitle text-opacity-45 font-kdFang;
}
.item-name {
  @apply text-kd14px18px text-global-highTitle font-medium font-kdFang;
}
</style>

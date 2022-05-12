<script setup lang="ts">
import { config } from "src/router/config";
import safeGet from "@fengqiaogang/safe-get";
import I18n from "src/utils/i18n";
import window from "src/plugins/browser/window";
import { createHref } from "src/plugins/router/pack";
import HomeTableHeader from "./header.vue";
import HomeTableTd from "./td.vue";
const i18n = I18n();
defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const toProject = (url: string) => {
  if (url) {
    window.open(createHref(url));
  }
};
</script>
<template>
  <div class="table-box relative">
    <div class="showX">
      <table class="table-my">
        <thead>
          <tr class="border-tb px-10">
            <td class="w-5">
              <div class="text-left flex items-center min-h-10 pl-3 mr-2">#</div>
            </td>
            <template v-for="(item, index) in safeGet(data, 'table.header')" :key="index">
              <td v-if="item.key !== 'id'" class="text-left">
                <HomeTableHeader class="min-h-10" :class="index === safeGet(data, 'table.header.length') - 1 ? 'pr-3' : ''" page="home" :short-icon="true" :sort="false" height="h-5" name="Dapp Name" :item="item" />
              </td>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in safeGet(data, 'table.items').slice(0, 5)" :key="index">
            <tr class="model-tbody-tr hand" @click="toProject(item.url)">
              <td class="number text-left h-12">
                <v-router :href="item.url" target="_blank" class="text-left pl-3 mr-2" @click.prevent>{{ index + 1 }}</v-router>
              </td>
              <template v-for="(itemTwo, index) in safeGet(data, 'table.header')" :key="index">
                <td v-if="itemTwo.key !== 'id'">
                  <HomeTableTd :class="index === safeGet(data, 'table.header.length') - 1 ? 'pr-3' : ''" :type-name="itemTwo.key" :data="item" />
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center">
      <v-router :href="`${config.homeDetail}/${data.id}`" target="_blank" class="btn-more">
        <span class="more cursor-pointer">{{ i18n.common.button.more }}</span>
      </v-router>
    </div>
  </div>
</template>
<style scoped lang="scss">
.border-tb {
  @apply border-t-1 border-b-1 border-global-highTitle border-opacity-6;
}
.btn-more {
  @apply bg-global-primary bg-opacity-6 w-max px-8 rounded-kd4px;
  @apply flex h-8 items-center hand mt-1.5;
}
.model-tbody-tr {
  @apply h-10 md:h-10.7;
}
.title {
  @apply text-kd16px22px md:text-kd18px24px font-medium font-kdFang text-global-highTitle;
}
.more {
  @apply text-kd12px16px text-global-primary;
}
.gang {
  border: 1px solid rgba(3, 54, 102, 0.06);
  @apply my-3 md:my-3;
}
thead td,
.number {
  @apply whitespace-nowrap md:whitespace-wrap text-kd12px16px text-global-highTitle text-opacity-45 text-left;
}
tbody td {
  @apply text-center text-kd14px18px text-global-highTitle;
}
.table-box {
  @apply w-full h-full  rounded-kd16px;
}

.table-my {
  @apply min-w-140 md:w-full bg-opacity-0 rounded-kd6px;
}
</style>

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
  <div class="table-box bg-global-white relative">
    <div class="flex items-center justify-between flex-wrap">
      <span class="title">{{ data.name }}</span>
      <v-router :href="`${config.homeDetail}?id=${data.id}`" target="_blank" class="flex items-center hand">
        <span class="more cursor-pointer">{{ i18n.home.more }}</span>
        <IconFont class="text-global-primary ml-0.5" size="12" type="icon-rightNo" />
      </v-router>
    </div>
    <div class="gang" />
    <div class="showX">
      <table class="table-my">
        <thead>
          <tr class="min-h-5">
            <td>
              <div class="text-left w-3.5">#</div>
            </td>
            <template v-for="(item, index) in safeGet(data, 'table.header')" :key="index">
              <td v-if="item.key !== 'id'" class="text-left">
                <HomeTableHeader page="home" :short-icon="true" :sort="false" height="h-5" name="Dapp Name" :item="item" />
              </td>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in safeGet(data, 'table.items')" :key="index">
            <tr class="model-tbody-tr hand" @click="toProject(item.url)">
              <td class="number text-left">
                <v-router :href="item.url" target="_blank" class="text-left w-3.5" @click.prevent>{{ index + 1 }}</v-router>
              </td>
              <template v-for="(itemTwo, index) in safeGet(data, 'table.header')" :key="index">
                <td v-if="itemTwo.key !== 'id'">
                  <HomeTableTd :type-name="itemTwo.key" :data="item" />
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped lang="scss">
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
  @apply p-3 pb-2 md:p-4 md:pb-4 w-full h-full bg-global-white rounded-kd16px;
}

.table-my {
  //border-collapse:separate;  border-spacing:0px 0px;
  @apply min-w-140 md:w-full bg-opacity-0 rounded-kd6px;
}
</style>

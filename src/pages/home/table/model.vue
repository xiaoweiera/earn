<script setup lang="ts">
import HomeTableTd from './td.vue'
import HomeTableHeader from './header.vue'
import {config} from "~/router/config";
import I18n from "~/utils/i18n";
const i18n = I18n();
const props = defineProps({
  data: Object,
})
</script>
<template>
  <div class="table-box bg-global-white relative" >
    <div class="flex items-center justify-between flex-wrap ">
      <span class="title">{{ data.name }}</span>
      <v-router :href="`${config.homeDetail}?id=${data.id}`" target="_blank" class="flex items-center hand">
        <span class="more cursor-pointer">{{i18n.home.more}}</span>
        <IconFont class="text-global-primary ml-0.5" size="12" type="icon-rightNo"/>
      </v-router>
    </div>
    <div class="gang"></div>
    <div class="showX">
      <table class="table-my">
        <thead>
        <tr class="h-5">
          <td>
            <div class="text-left w-3.5">#</div>
          </td>
          <template v-for="(item,index) in data.table.header" :key="index">
            <td class="text-left" v-if="item.key!=='id'">
              <HomeTableHeader :item="item"/>
            </td>
          </template>
        </tr>
        </thead>
        <tbody>
        <template v-for="(item,index) in data.table.items" :key="index">
          <tr class="h-10 md:h-11.5">
            <td class="number">
              <div class=" text-left w-3.5">{{ index + 1 }}</div>
            </td>
            <template v-for="(itemTwo,index) in data.table.header" :key="index">
              <td v-if="itemTwo.key!=='id'">
                <HomeTableTd :typeName="itemTwo.key" :data="item"/>
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
.title {
  @apply text-kd16px22px md:text-kd18px24px font-medium font-kdFang text-global-highTitle;
}
.more {
  @apply text-kd12px16px text-global-primary;
}
.gang {
  border: 1px solid rgba(3, 54, 102, 0.06);
  @apply my-3 md:my-5;
}
thead td, .number {
  @apply whitespace-nowrap md:whitespace-wrap text-kd12px16px text-global-highTitle text-opacity-45 text-center;
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

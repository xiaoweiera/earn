<script lang="ts" setup>
import { formatRulesNumber, getNumberColor } from "src/lib/tool";
import { computed } from "vue";
import safeGet from "@fengqiaogang/safe-get";
import { ElPopover } from "element-plus";
import { config as routerConfig } from "src/router/config";

const props = defineProps({
  headerData: {
    type: Object,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
  i: {
    type: Number,
    default: () => 0,
  },
  sortName: {
    type: String,
    default: () => "",
  },
  isCompare: {
    type: Boolean,
    default: () => false,
  },
  zIndex: {
    type: Number,
    default: () => 0,
  },
});
//@ts-ignore wei
const bgWidth = computed(() => (props.isCompare ? (props.item[props.sortName] / props.item.max_stat[props.sortName]) * 100 + "%" : ""));

const detailUrl = function (data: object) {
  const id = safeGet<number>(data, "dapp_id");
  if (id) {
    return `${routerConfig.rankNft}/${id}`;
  }
  return safeGet<string>(data, "external_url");
};
</script>
<template>
  <v-router v-if="headerData" :href="detailUrl(item)" target="_blank" class="px-3 py-1.5 item relative hand relative bg-global-white mt-1.5 flex items-center rounded-kd6px" :style="`--wv:${bgWidth};z-index:${zIndex + 100}`">
    <div class="relative z-2 flex items-center w-full">
      <!--      排名-->
      <div :class="headerData[0].width" class="text-kd14px20px text-global-highTitle text-opacity-85 lg:order-0 whitespace-nowrap pl-3">
        {{ i + 1 }}
      </div>
      <!--     名称-->
      <div :class="headerData[1].width" class="flex items-center justify-left">
        <ui-image :src="item.logo" class="w-6 h-6 rounded-full text-kd10px12px font-kdInter" :title="item.name" />
        <div class="text-kd14px18px text-global-highTitle ml-1.5 fang w-fit">{{ item.name }}</div>
      </div>
      <!--      类别-->
      <div :class="headerData[2].width" class="flex items-center order-10 lg:order-2 whitespace-nowrap justify-center">
        <div v-if="item.categories && item.categories.length > 0" class="flex items-center whitespace-nowrap justify-center">
          <span class="text-kd14px18px text-global-highTitle fang i8n-font-inter ml-1">{{ item.categories[0] }}</span>
          <client-only>
            <el-popover v-if="item.categories.length > 1" popper-class="chain-popper" placement="bottom" trigger="hover" :append-to-body="false">
              <div class="flex items-center px-2 py-1.5 border-1">
                <template v-for="(typeName, i) in item.categories.slice(1)" :key="i">
                  <span :class="i === 0 ? '' : 'ml-1.5'" class="text-kd14px18px border-1 text-global-highTitle fang i8n-font-inter">{{ typeName }}</span>
                </template>
              </div>
              <template #reference>
                <div class="ml-1.5 relative bottom-1 text-global-highTitle text-opacity-45">...</div>
              </template>
            </el-popover>
          </client-only>
        </div>
        <div v-else class="text-global-highTitle">-</div>
      </div>
      <!--      Volume-->
      <div :class="headerData[3].width" class="content order-2 lg:order-3">
        <IconFont type="icon-ETH" size="12" />
        <div class="num">{{ formatRulesNumber(item.volume) }}</div>
      </div>
      <!--      24H-->
      <div :class="headerData[4].width" class="content order-3 lg:order-4">
        <div class="flex items-center text-kd14px20px exp">
          <!--          <span>{{item.h24_volume_change_percent>=0?'+':'-'}}</span>-->
          <div v-if="item.h24_volume_change_percent" :class="getNumberColor(item.h24_volume_change_percent)">{{ formatRulesNumber(item.h24_volume_change_percent) }}%</div>
          <div v-else>-</div>
        </div>
      </div>
      <!--      7D-->
      <div :class="headerData[5].width" class="content order-4 lg:order-5">
        <div class="flex items-center text-kd14px20px exp">
          <div v-if="item.d7_volume_change_percent" :class="getNumberColor(item.d7_volume_change_percent)">{{ formatRulesNumber(item.d7_volume_change_percent) }}%</div>
          <div v-else>-</div>
        </div>
      </div>
      <!--      Owners-->
      <div :class="headerData[6].width" class="content order-5 lg:order-6">
        <div class="num">{{ formatRulesNumber(item.owners) }}</div>
      </div>
      <!--      Assets-->
      <div :class="headerData[7].width" class="content order-6 lg:order-7">
        <div class="num">{{ formatRulesNumber(item.assets) }}</div>
      </div>
      <!--     Floor Price-->
      <div :class="headerData[8].width" class="content order-7 lg:order-8">
        <IconFont type="icon-ETH" size="12" />
        <div class="num">{{ formatRulesNumber(item.floor_price) }}</div>
      </div>
      <div :class="headerData[9].width" class="content order-8 lg:order-10">
        <IconFont type="icon-ETH" size="12" />
        <div class="num">{{ formatRulesNumber(item.mcap) }}</div>
      </div>
    </div>
  </v-router>
</template>
<style scoped lang="scss">
::v-deep(.el-popover.el-popper) {
  min-width: fit-content !important;
  width: fit-content !important;
  padding: 0px 0px 0px 0px !important;
  border-radius: 100px;
  transform: translate(100%, 100%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.item:hover {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.1);
}

.num {
  @apply text-kd14px20px  text-global-highTitle  font-kdExp;
}

.content {
  @apply flex items-center pr-0.5   lg:text-right whitespace-nowrap  justify-end;
}

.item::before {
  content: "";
  background: rgba(9, 217, 142, 0.32);
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--wv);
  @apply rounded-kd6px;
}
</style>

<script setup lang="ts">
import { ElPopover } from "element-plus";
import { defineProps, computed } from "vue";
import { formatRulesNumber, getNumberColor } from "src/lib/tool";
import safeGet from "@fengqiaogang/safe-get";

const props = defineProps({
  category: {
    type: String,
    default: () => "",
  },
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
  const category = props.category ? `category=${props.category}` : undefined;
  const id = safeGet<number>(data, "dapp_id");
  if (id) {
    return `/dapp/rank/${id}?${category}`;
  }
  return safeGet<string>(data, "website");
};
</script>
<template>
  <v-router v-if="headerData" :href="detailUrl(item)" target="_blank" class="item relative hand relative px-3 py-1.5 bg-global-white mt-1.5 flex items-center rounded-kd6px" :style="`--wv:${bgWidth}; z-index:${zIndex + 10}`">
    <div class="relative z-2 flex items-center w-full">
      <!--      排名-->
      <div :class="headerData[0].width" class="text-kd14px20px text-global-highTitle text-opacity-85 lg:order-0 whitespace-nowrap pl-3">
        {{ i + 1 }}
      </div>
      <!--     名称-->
      <div :class="headerData[1].width" class="flex w-full items-center justify-left lg:order-1">
        <ui-image :src="item.logo" class="w-6 h-6 rounded-full" />
        <div class="text-kd14px18px text-global-highTitle ml-1.5 fang w-fit i8n-font-inter">{{ item.name }}</div>
      </div>
      <!--      类别-->
      <div :class="headerData[2].width" class="flex items-center whitespace-nowrap order-8 lg:order-2 justify-center">
        <div v-if="item.categories && item.categories.length > 0" class="flex items-center whitespace-nowrap justify-center">
          <span class="text-kd14px18px text-global-highTitle fang i8n-font-inter">{{ item.categories[0] }}</span>
          <client-only>
            <el-popover v-if="item.categories.length > 1" popper-class="chain-popper" placement="bottom" trigger="hover" :append-to-body="false">
              <div class="flex items-center px-2 py-1.5">
                <template v-for="(typeName, i) in item.categories.slice(1)" :key="i">
                  <span :class="i === 0 ? '' : 'ml-1.5'" class="text-kd14px18px text-global-highTitle fang i8n-font-inter">{{ typeName }}</span>
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
      <!--  公链-->
      <div :class="headerData[3].width" class="flex relative items-center order-9 lg:order-3 justify-center">
        <div v-if="item.chains && item.chains.length > 0" class="flex items-center justify-center">
          <template v-for="(t, i) in item.chains" :key="i">
            <ui-image v-if="i <= 2" class="w-3 h-3" :class="i === 0 ? '' : 'ml-1.5'" :src="t.logo" />
          </template>
          <client-only>
            <el-popover v-if="item.chains.length > 3" popper-class="chain-popper" placement="bottom" trigger="hover" :append-to-body="false">
              <div class="flex items-center p-2">
                <template v-for="(t, i) in item.chains.slice(3)" :key="i">
                  <ui-image :class="i === 0 ? '' : 'ml-1.5'" :src="t.logo" class="w-3 h-3" />
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
      <!--      用户-->
      <div :class="headerData[4].width" class="flex flex-col lg:text-right whitespace-nowrap text-center order-2 lg:order-4 justify-center">
        <div class="num text-center">{{ formatRulesNumber(item.users) }}</div>
      </div>
      <!--      变化率-->
      <div :class="headerData[5].width" class="flex flex-col lg:text-right whitespace-nowrap text-center order-2 lg:order-4 justify-center">
        <div class="text-kd12px12px exp">
          <span v-if="item.user_change_percent" :class="getNumberColor(item.user_change_percent)">{{ formatRulesNumber(item.user_change_percent) }}%</span>
          <span v-else>-</span>
        </div>
      </div>
      <!--      balance-->
      <div :class="headerData[6].width" class="flex flex-col lg:text-right whitespace-nowrap text-center order-3 lg:order-5 justify-center">
        <div v-if="item.balance" class="num">${{ formatRulesNumber(item.balance) }}</div>
      </div>
      <!--      volume-->
      <div :class="headerData[7].width" class="flex flex-col lg:text-right whitespace-nowrap text-center order-4 lg:order-6 justify-center">
        <div class="num">${{ formatRulesNumber(item.volume) }}</div>
      </div>
      <div :class="headerData[8].width" class="flex flex-col lg:text-right whitespace-nowrap text-center order-5 lg:order-8 justify-center">
        <div class="num">${{ formatRulesNumber(item.tvl) }}</div>
        <div class="text-kd12px12px exp mt-1">
          <span v-if="item.tvl_change_percent" :class="getNumberColor(item.tvl_change_percent)">{{ formatRulesNumber(item.tvl_change_percent) }}%</span>
          <span v-else>-</span>
        </div>
      </div>
      <!--      MCap/TVL-->
      <div :class="headerData[9].width" class="flex flex-col lg:text-right whitespace-nowrap text-center order-6 lg:order-9 justify-center">
        <div class="num">{{ formatRulesNumber(item.mcap_tvl) }}</div>
      </div>
      <!--      marketcap-->
      <div :class="headerData[7].width" class="flex flex-col lg:text-right whitespace-nowrap text-center order-7 lg:order-7 justify-center">
        <div class="num">${{ formatRulesNumber(item.marketcap) }}</div>
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
  @apply text-kd14px16px text-global-highTitle font-kdExp;
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

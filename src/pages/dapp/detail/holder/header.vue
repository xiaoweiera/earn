<script lang="ts" setup>
import { onMounted } from "vue";
import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";
import { HolderInfo } from "src/types/dapp/holder";
import { useRoute } from "vue-router";
import safeGet from "@fengqiaogang/safe-get";
import API from "src/api";
import { formatCash, valueFormat, toFixed } from "src/utils";
import I18n from "src/utils/i18n/";

defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const i18n = I18n();
const holderInfo = createReactive<HolderInfo>(alias.dApp.DAppDetail.holder, {} as HolderInfo);

const route = useRoute();
const id: string | number = safeGet(route, "params.id");
onMounted(() => {
  onLoadReactive<HolderInfo>(holderInfo, () => {
    const api = new API();
    let params = {
      project_id: id,
    };
    return api.dApp.getHolderInfo(params);
  });
});
</script>

<template>
  <div>
    <div v-if="holderInfo" class="w-full h-full md:h-31.75 flex flex-col md:flex-row justify-between">
      <!-- 左侧部分 -->
      <div class="whale">
        <!-- 标题  -->
        <div class="h-8 flex justify-between items-center">
          <div class="text-kd18px24px text-global-highTitle font-kdFang font-medium">{{ i18n.dapp.detail.holder.whale }}</div>
          <div class="rank">
            <span class="rank-tips"># 192</span>
          </div>
          <!--          <ui-hover class="rank-hover cursor-pointer flex rounded-kd6px" placement="top" :append-to-body="false">-->
          <!--            <template #label>-->
          <!--              <div class="rank">-->
          <!--                <span class="rank-tips"># 192</span>-->
          <!--              </div>-->
          <!--            </template>-->
          <!--            <template #content>-->
          <!--              <div class="max-w-59.5 bg-global-bgBlack rounded-kd6px p-2 text-kd12px16px text-global-white font-medium font-kdInter">{{ i18n.dapp.detail.holder.holderTips }}</div>-->
          <!--            </template>-->
          <!--          </ui-hover>-->
        </div>
        <!-- 数据  -->
        <div class="w-full mt-1.5 flex">
          <div class="w-1/2 h-full">
            <div class="text-kd14px18px text-global-highTitle text-opacity-65 font-kdInter font-medium flex items-center">
              <div>{{ i18n.dapp.detail.holder.holder }}</div>
              <ui-hover class="rank-hover cursor-pointer flex" placement="top" :append-to-body="false">
                <template #label>
                  <IconFont class="text-global-highTitle flex items-center text-opacity-25 ml-1.5" type="icon-info" size="14" />
                </template>
                <template #content>
                  <div class="max-w-59.5 bg-global-bgBlack rounded-kd6px p-2 text-kd12px16px text-global-white font-medium font-kdInter">
                    {{ i18n.dapp.detail.holder.holderTips }}
                  </div>
                </template>
              </ui-hover>
            </div>
            <div class="mt-1 flex items-center">
              <span class="text-kd20px24px text-global-highTitle font-kdInter font-semibold">{{ holderInfo.whales_num }}</span>
              <span class="h-5 ml-1.5 bg-global-darkblue bg-opacity-6 rounded-kd4px px-1 py-0.5 text-kd12px16px font-medium text-global-darkblue font-kdFang">{{ valueFormat(toFixed(holderInfo.whales_ratio, 2), "%") }}</span>
            </div>
            <div class="mt-1 text-kd12px16px text-global-numGreen font-medium font-kdFang">+12</div>
          </div>
          <div class="w-1/2 h-full pl-4 border-l-1 border-global-highTitle border-opacity-6">
            <div class="text-kd14px18px text-global-highTitle text-opacity-65 font-kdInter font-medium flex items-center">
              <div>{{ i18n.dapp.detail.holder.holdNft }}</div>
              <ui-hover class="rank-hover cursor-pointer flex rounded-kd6px" placement="top" :append-to-body="false">
                <template #label>
                  <IconFont class="text-global-highTitle flex items-center text-opacity-25 ml-1.5" type="icon-info" size="14" />
                </template>
                <template #content>
                  <div class="max-w-59.5 bg-global-bgBlack rounded-kd6px p-2 text-kd12px16px text-global-white font-medium font-kdInter">
                    {{ i18n.dapp.detail.holder.holdingTips }}
                  </div>
                </template>
              </ui-hover>
            </div>
            <div class="mt-1 flex items-center">
              <span class="text-kd20px24px text-global-highTitle font-kdInter font-semibold">{{ formatCash(holderInfo.whales_holding) }}</span>
              <span class="h-5 ml-1.5 bg-global-darkblue bg-opacity-6 rounded-kd4px px-1 py-0.5 text-kd12px16px font-medium text-global-darkblue font-kdFang">{{ valueFormat(toFixed(holderInfo.whale_holding_ratio, 2), "%") }}</span>
            </div>
            <div class="mt-1 text-kd12px16px text-global-numGreen font-medium font-kdFang">+421</div>
          </div>
        </div>
      </div>
      <!-- 右侧部分 -->
      <div class="whale ml-0 md:ml-6 mt-6 md:mt-0">
        <!-- 标题  -->
        <div class="h-8 flex justify-between items-center">
          <div class="text-kd18px24px text-global-highTitle font-kdFang font-medium">{{ i18n.dapp.detail.holder.blueChip }}</div>
          <div class="rank">
            <span class="rank-tips"># 192</span>
          </div>
          <!--          <ui-hover class="rank-hover cursor-pointer flex rounded-kd6px" placement="top" :append-to-body="false">-->
          <!--            <template #label>-->
          <!--              <div class="rank">-->
          <!--                <span class="rank-tips"># 192</span>-->
          <!--              </div>-->
          <!--            </template>-->
          <!--            <template #content>-->
          <!--              <div class="max-w-59.5 bg-global-bgBlack rounded-kd6px p-2 text-kd12px16px text-global-white font-medium font-kdInter"></div>-->
          <!--            </template>-->
          <!--          </ui-hover>-->
        </div>
        <!-- 数据  -->
        <div class="w-full mt-1.5 flex">
          <div class="w-1/2 h-full">
            <div class="text-kd14px18px text-global-highTitle text-opacity-65 font-kdInter font-medium flex items-center">
              <div>{{ i18n.dapp.detail.holder.holder }}</div>
              <ui-hover class="rank-hover cursor-pointer flex rounded-kd6px" placement="top" :append-to-body="false">
                <template #label>
                  <IconFont class="text-global-highTitle flex items-center text-opacity-25 ml-1.5" type="icon-info" size="14" />
                </template>
                <template #content>
                  <div class="max-w-59.5 bg-global-bgBlack rounded-kd6px p-2 text-kd12px16px text-global-white font-medium font-kdInter">
                    {{ i18n.dapp.detail.holder.blueChipTips }}
                  </div>
                </template>
              </ui-hover>
            </div>
            <div class="mt-1 flex items-center">
              <span class="text-kd20px24px text-global-highTitle font-kdInter font-semibold">{{ holderInfo.bule_chip_holders }}</span>
              <span class="h-5 ml-1.5 bg-global-darkblue bg-opacity-6 rounded-kd4px px-1 py-0.5 text-kd12px16px font-medium text-global-darkblue font-kdFang">{{ valueFormat(toFixed(holderInfo.blue_chip_holders_ratio, 2), "%") }}</span>
            </div>
            <div class="mt-1 text-kd12px16px text-global-numGreen font-medium font-kdFang">+12</div>
          </div>
          <div class="w-1/2 h-full pl-4 border-l-1 border-global-highTitle border-opacity-6">
            <div class="text-kd14px18px text-global-highTitle text-opacity-65 font-kdInter font-medium flex items-center">
              <div>{{ i18n.dapp.detail.holder.holdNft }}</div>
              <ui-hover class="rank-hover cursor-pointer flex rounded-kd6px" placement="top" :append-to-body="false">
                <template #label>
                  <IconFont class="text-global-highTitle flex items-center text-opacity-25 ml-1.5" type="icon-info" size="14" />
                </template>
                <template #content>
                  <div class="max-w-59.5 bg-global-bgBlack rounded-kd6px p-2 text-kd12px16px text-global-white font-medium font-kdInter">
                    {{ i18n.dapp.detail.holder.blueHoldingTips }}
                  </div>
                </template>
              </ui-hover>
            </div>
            <div class="mt-1 flex items-center">
              <span class="text-kd20px24px text-global-highTitle font-kdInter font-semibold">{{ formatCash(holderInfo.blue_chip_holding) }}</span>
              <span class="h-5 ml-1.5 bg-global-darkblue bg-opacity-6 rounded-kd4px px-1 py-0.5 text-kd12px16px font-medium text-global-darkblue font-kdFang">{{ valueFormat(toFixed(holderInfo.blue_chip_holding_ratio, 2), "%") }}</span>
            </div>
            <div class="mt-1 text-kd12px16px text-global-numGreen font-medium font-kdFang">+193</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.whale {
  @apply w-full md:w-1/2 h-full px-3 py-3 rounded-md border-1 border-global-highTitle border-opacity-6;
  background: linear-gradient(180deg, rgba(0, 111, 247, 0.05) 0%, rgba(0, 111, 247, 0) 100%);
}
.rank {
  @apply h-full px-3 py-1.75 bg-global-darkblue bg-opacity-6 rounded-md flex items-center cursor-pointer;
  .rank-tips {
    @apply text-kd14px18px text-global-darkblue font-kdFang font-medium;
  }
  &:hover {
    @apply bg-global-darkblue;
    .rank-tips {
      @apply text-global-white;
    }
  }
}
.rank-hover {
  ::v-deep(.el-popper) {
    z-index: 2031 !important;
  }
}
</style>

<script setup lang="ts">
import type { PropType } from "vue";
import { onMounted, ref } from "vue";
import { toNumberCashFormat } from "src/utils/convert/to";
import { getData, getDom } from "src/logic/home";
import { dataToTimestamp, getSaveNumber, getUpDownColor } from "src/lib/tool";
import type { detail } from "src/types/home";
import * as alias from "src/utils/root/alias";
import { getValue } from "src/utils/root/data";
import type { SiteConfig } from "src/types/common/chain";
import { getDateMDY } from "src/utils";
import safeGet from "@fengqiaogang/safe-get";
import { ElPopover } from "element-plus";
import _ from "lodash";

const showChainCount = 3;
// 公链配置
const config = getValue<SiteConfig>(alias.common.chain.site, {} as SiteConfig);
const props = defineProps({
  info: {
    type: Object as PropType<detail>,
    default: () => {
      return {};
    },
  },
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
  typeName: {
    type: String,
    default: () => "",
  },
  type: {
    type: String,
    default: () => "data",
  },
});
const typeDom = ref(""); // dom类型
const domData = ref(); // dom数据
const txtCss = props.info.id ? "text-number" : "text-number";
const getNumColor = (value: any) => {
  const numValue: any = _.isArray(value) ? value[1] : value;
  return `${getUpDownColor(numValue)} ${txtCss}`;
};
onMounted(() => {
  typeDom.value = getDom(props.typeName);
  domData.value = getData(props.typeName, props.data);
});
</script>
<template>
  <div v-if="data">
    <!--Name-->
    <!--    <div v-if="(typeName === 'name' && !info.id) || (typeName === 'name' && safeGet(info, 'show_type') === 'data')" class="flex-center max-w-20 whitespace-nowrap">-->
    <!--      <ui-image class="min-w-8 min-h-8 w-8 h-8 rounded-full text-kd10px12px text-number" :src="safeGet(data, 'logo')" :title="data.name"/>-->
    <!--      <div class="ml-1.5">-->
    <!--        <div class="numberDefault line-height-no smallTxt max-w-20 text-left whitespace-nowrap" :class="txtCss">-->
    <!--          {{ data["name"] }}-->
    <!--        </div>-->
    <!--        <div class="nameTag text-left line-height-no" :class="txtCss">{{ data["symbol"] }}</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    &lt;!&ndash;NameDes&ndash;&gt;-->
    <!--    <div v-else-if="typeName === 'name' && info.id && safeGet(info, 'show_type') === 'desc'" class="flex-center short min-w-140">-->
    <!--      <ui-image class="w-8 h-8 md:w-12 md:h-12 rounded-kd6px" :src="data.logo"/>-->
    <!--      <div class="ml-3 short">-->
    <!--        <div class="nameNameDes line-height-no flex-center" :class="txtCss">-->
    <!--          <span>{{ data["name"] }}</span>-->
    <!--          <IconFont v-if="data.chain" size="16" :type="safeGet(config, `chain.${data.chain}.logo`)"/>-->
    <!--        </div>-->
    <!--        <div class="nameDes md:mt-1.5 line-height-no w-130 short text-left" :class="txtCss">{{ data["description"] }}-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    &lt;!&ndash;chainIcon&ndash;&gt;-->
    <!--    <div v-else-if="typeDom === 'chainIcon'">-->
    <!--      <div v-if="safeGet(data, 'chains') && safeGet(data, 'chains').length > 0" class="flex items-center justify-center">-->
    <!--        <template v-for="(chain, i) in safeGet(data, 'chains').slice(0, showChainCount)" :key="i">-->
    <!--          <IconFont :class="i === 0 ? '' : 'ml-1.5'" size="16" :type="safeGet(config, `chain.${chain}.logo`)"/>-->
    <!--        </template>-->
    <!--        <el-popover v-if="safeGet(data, 'chains').length > showChainCount" popper-class="chain-popper" placement="bottom" trigger="hover" :append-to-body="false">-->
    <!--          <div class="flex items-center px-2 py-1.5">-->
    <!--            <template v-for="(chain, i) in safeGet(data, 'chains').slice(showChainCount)" :key="i">-->
    <!--              <IconFont :class="i === 0 ? '' : 'ml-1.5'" size="16" :type="safeGet(config, `chain.${chain}.logo`)"/>-->
    <!--            </template>-->
    <!--          </div>-->
    <!--          <template #reference>-->
    <!--            <div class="ml-1.5 relative bottom-1 text-global-highTitle text-opacity-45">...</div>-->
    <!--          </template>-->
    <!--        </el-popover>-->
    <!--      </div>-->
    <!--      <div v-else class="numberDefault text-center" :class="txtCss">N/A</div>-->
    <!--    </div>-->
    <!--    &lt;!&ndash;    iconHref  tge_platform&ndash;&gt;-->
    <!--    <div v-else-if="typeDom === 'iconHref'" class="flex-center justify-right justify-center">-->
    <!--      <div v-if="domData && safeGet(config, `tge_platform.${domData}`)" class="w-full flex items-center justify-center">-->
    <!--        <IconFont v-if="config" size="16" :type="safeGet(config, `tge_platform.${domData}.logo`)"/>-->
    <!--        <div class="link" :class="txtCss">{{ domData }}</div>-->
    <!--      </div>-->
    <!--      <div v-else class="numberDefault text-center" :class="txtCss">Not Set</div>-->
    <!--    </div>-->
    <!--    &lt;!&ndash;starNumber overall_score&ndash;&gt;-->
    <!--    <div v-else-if="typeDom === 'starNumber'" class="flex-center justify-center">-->
    <!--      <div v-if="domData || domData === 0" class="w-full flex items-center justify-center">-->
    <!--        <IconFont size="12" type="icon-star"/>-->
    <!--        <span class="star-txt" :class="txtCss">{{ domData ? getSaveNumber(domData, 1) : 0 }}</span>-->
    <!--      </div>-->
    <!--      <div v-else class="numberDefault text-center" :class="txtCss">Not Set</div>-->
    <!--    </div>-->
    <!--    &lt;!&ndash;txt categories&ndash;&gt;-->
    <!--    <div v-else-if="typeDom === 'txt'" class="numberDefault text-center" :class="txtCss">-->
    <!--      {{ domData ? domData : "N/A" }}-->
    <!--    </div>-->
    <!--    &lt;!&ndash;numberPrice&ndash;&gt;-->
    <!--    <div v-else-if="typeDom === 'numberPrice'" class="numberDefault text-center" :class="txtCss">-->
    <!--      {{ toNumberCashFormat(domData, "$", "", typeName === "ido_price" ? "TBA" : "&#45;&#45;") }}-->
    <!--    </div>-->
    <!--    <div v-else-if="typeDom === 'dappNftMix'">-->
    <!--      <div v-if="data.is_nft" class="flex-center justify-center border-1">-->
    <!--        <IconFont size="16" :type="safeGet(config, `chain.${data.chain}.logo`)"/>-->
    <!--        <span class="numberDefault ml-1" :class="txtCss">{{ toNumberCashFormat(domData) }}</span>-->
    <!--      </div>-->
    <!--      <div v-else :class="txtCss" class="text-center numberDefault">{{ toNumberCashFormat(domData, "$") }}</div>-->
    <!--    </div>-->
    <!--    &lt;!&ndash;chainNumber&ndash;&gt;-->
    <!--    <div v-else-if="typeDom === 'chainNumber'" class="flex-center justify-center">-->
    <!--      <IconFont size="16" :type="safeGet(config, `chain.${data.chain}.logo`)"/>-->
    <!--      <span class="numberDefault ml-1" :class="txtCss">{{ toNumberCashFormat(domData) }}</span>-->
    <!--    </div>-->
    <!--    &lt;!&ndash;numberUnit&ndash;&gt;-->
    <!--    <div v-else-if="typeDom === 'numberUnit'" class="flex-center justify-center">-->
    <!--      <span class="numberDefault" :class="txtCss">{{ toNumberCashFormat(domData[0]) }}</span>-->
    <!--      <span class="unit">{{ domData[1] }}</span>-->
    <!--    </div>-->
    <!--    &lt;!&ndash;numbers&ndash;&gt;-->
    <!--    <div v-else-if="typeDom === 'numbers'" class="numberDefault text-center" :class="txtCss">-->
    <!--      {{ toNumberCashFormat(domData) }}-->
    <!--    </div>-->
    <!--    &lt;!&ndash;numberChange&ndash;&gt;-->
    <!--    <div v-else-if="typeDom === 'numberChange'">-->
    <!--      <div class="numberDefault text-center" :class="txtCss">{{ toNumberCashFormat(domData[0]) }}</div>-->
    <!--      <div v-if="domData[1] !== 0" class="flex-center justify-center">-->
    <!--        <IconFont size="8" :type="domData[1] > 0 ? 'icon-zheng' : 'icon-fu'"/>-->
    <!--        <span :class="getNumColor(domData[1])" class="numberChange ml-1 text-number">{{ toNumberCashFormat(domData[1], "%", "", "N/A")-->
    <!--          }}</span>-->
    <!--      </div>-->
    <!--      <div v-else class="numberDefault" :class="txtCss">0</div>-->
    <!--    </div>-->
    <!--    &lt;!&ndash;lever&ndash;&gt;-->
    <!--    <div v-else-if="typeDom === 'lever'" class="text-kd12px16px md:text-kd14px16px text-number justify-right" :class="getNumColor(domData)">-->
    <!--      {{ toNumberCashFormat(domData, "x", "", "N/A") }}-->
    <!--    </div>-->
    <!--    &lt;!&ndash;timeType&ndash;&gt;-->
    <!--    <div v-else-if="typeDom === 'timeType'" class="numberDefault text-number text-center">-->
    <!--      {{ domData ? getDateMDY(dataToTimestamp(domData)) : "TBA" }}-->
    <!--    </div>-->
    <!--    &lt;!&ndash;    longNumberChange&ndash;&gt;-->
    <!--    <div v-else-if="typeDom === 'longNumberChange'">-->
    <!--      <div class="numberDefault text-center" :class="txtCss">{{ toNumberCashFormat(domData[0], "%") }}</div>-->
    <!--      <div v-if="domData[1] !== 0" class="flex-center justify-center">-->
    <!--        <IconFont size="8" :type="domData[1] > 0 ? 'icon-zheng' : 'icon-fu'"/>-->
    <!--        <span :class="getNumColor(domData[1])" class="numberChange ml-1 text-number">{{ toNumberCashFormat(domData[1], "%", "", "N/A")-->
    <!--          }}</span>-->
    <!--      </div>-->
    <!--      <div v-else class="numberDefault" :class="txtCss">0</div>-->
    <!--    </div>-->
    <!--    <div v-else-if="typeDom === 'changePercent'" :class="getNumColor(domData)" class="text-kd12px16px md:text-kd14px16px text-number text-center">-->
    <!--      {{ toNumberCashFormat(domData, "%") }}-->
    <!--    </div>-->
    <!--    &lt;!&ndash;    chartDom&ndash;&gt;-->
    <!--    <div></div>-->
    <!--    &lt;!&ndash;    moneyNumber&ndash;&gt;-->
    <!--    <div v-else-if="typeDom === 'moneyNumber'" class="numberDefault text-center">-->
    <!--      {{ toNumberCashFormat(domData, "$") }}-->
    <!--    </div>-->
    <!--    &lt;!&ndash;    comment&ndash;&gt;-->
    <!--    <div v-else-if="typeDom === 'comment'" class="numberDefault text-center">-->
    <!--      推荐理由-->
    <!--    </div>-->
    <!--    &lt;!&ndash;    stage_name&ndash;&gt;-->
    <!--    <div v-else-if="typeDom === 'stage_name'">-->
    <!--      投资阶段-->
    <!--    </div>-->
    <!--    &lt;!&ndash;    barPercent&ndash;&gt;-->
    <!--    <div v-else-if="typeDom==='barPercent'">百分比条</div>-->
    <!--    <div v-else>-</div>-->
  </div>
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

.line-height-no {
  line-height: 0px;
}

.flex-center {
  @apply flex items-center;
}

.link {
  @apply ml-1 text-global-primary text-kd14px16px;
}

.star-txt {
  @apply ml-1  text-kd12px16px md:text-kd14px16px text-global-highTitle;
}

.numberDefault {
  @apply text-kd12px16px md:text-kd14px16px text-global-highTitle;
}

.unit {
  @apply ml-1 font-kdFang font-medium text-kd12px16px text-global-highTitle text-opacity-65;
}

.numberChange {
  @apply text-kd12px18px;
}

.nameTag {
  @apply text-kd12px16px text-global-highTitle text-opacity-45;
}

.nameNameDes {
  @apply text-kd14px18px md:text-kd16px18px text-global-highTitle;
}

.nameDes {
  @apply text-kd12px16px md:text-kd14px16px text-global-highTitle text-opacity-45;
}

.smallTxt {
  overflow: hidden;
  text-overflow: ellipsis;
  //display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>

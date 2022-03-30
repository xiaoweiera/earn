<script setup lang="ts">
import type { PropType } from "vue";
import { onMounted, ref } from "vue";
import { toNumberCashFormat } from "src/utils/convert/to";
import { getData } from "src/logic/home";
import { dataToTimestamp, getSaveNumber, getUpDownColor } from "src/lib/tool";
import type { detail } from "src/types/home";
import * as alias from "src/utils/root/alias";
import { getValue } from "src/utils/root/data";
import type { SiteConfig } from "src/types/common/chain";
import { getDateMDY } from "src/utils";
import safeGet from "@fengqiaogang/safe-get";
import { ElPopover } from "element-plus";
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
const chainIcon = ["chains"]; // icon类
const iconHref = ["tge_platform"]; // icon + href
const starNumber = ["overall_score"]; // 星星 + number
const txt = ["categories"]; // txt
const numberPrice = [
  "current_price",
  "ido_price",
  "balance_24h",
  "balance_7d",
  "ido_fundraising_goal", // Total Raised
]; // $number
//dapp $+数字 ｜ nft icon+数字
const dappNftMix = [
  "volume_24h",
  "volume_7d",
  "mcap", // MarketCap-
];
const chainNumber = [
  "floor_price", // Floor price
  "mint_price", // Mint price
]; // chain + number
const numberUnit = ["ido_sale_amount"]; // number + 单位 --- Tokens for Sale    ido_symbol
const numbers = ["owners", "assets", "mcap_tvl"]; // -- Owners Assets MCap/TVL
const numberChange = ["users_24h", "users_7d", "tvl"]; // User/Change   TVL/Change
const lever = ["ath_since_ido", "current_roi_usd"]; // number + x  ATH Since IDO   Current ROI USD
const timeType = ["ido_end_at", "mint_start_at"]; // time

const typeDom = ref(""); // dom类型
const domData = ref(); // dom数据
const getDom = () => {
  const name: string = props.typeName;
  if (chainIcon.includes(name)) {
    return "chainIcon";
  } else if (iconHref.includes(name)) {
    return "iconHref";
  } else if (starNumber.includes(name)) {
    return "starNumber";
  } else if (txt.includes(name)) {
    return "txt";
  } else if (numberPrice.includes(name)) {
    return "numberPrice";
  } else if (dappNftMix.includes(name)) {
    return "dappNftMix";
  } else if (chainNumber.includes(name)) {
    return "chainNumber";
  } else if (numberUnit.includes(name)) {
    return "numberUnit";
  } else if (numbers.includes(name)) {
    return "numbers";
  } else if (numberChange.includes(name)) {
    return "numberChange";
  } else if (lever.includes(name)) {
    return "lever";
  } else if (timeType.includes(name)) {
    return "timeType";
  } else {
    return "";
  }
};
onMounted(() => {
  typeDom.value = getDom();
  domData.value = getData(props.typeName, props.data);
});
</script>
<template>
  <div v-if="data">
    <!--Name-->
    <div v-if="(typeName === 'name' && !info.id) || (typeName === 'name' && safeGet(info, 'show_type') === 'data')" class="flex-center max-w-28 whitespace-nowrap">
      <ui-image :class="info.id ? 'min-w-8 min-h-8 w-8 h-8' : 'min-w-6 min-h-6 w-6 h-6'" class="rounded-full" :src="safeGet(data, 'logo')" />
      <div class="ml-1.5">
        <div class="numberDefault text-number line-height-no smallTxt max-w-28 whitespace-nowrap">
          {{ data["name"] }}
        </div>
        <div class="nameTag text-number text-left line-height-no">{{ data["symbol"] }}</div>
      </div>
    </div>
    <!--NameDes-->
    <div v-else-if="typeName === 'name' && info.id && safeGet(info, 'show_type') === 'desc'" class="flex-center short min-w-140">
      <ui-image class="w-8 h-8 md:w-12 md:h-12 rounded-kd6px" :src="data.logo" />
      <div class="ml-3 short">
        <div class="nameNameDes text-number line-height-no flex-center">
          <span>{{ data["name"] }}</span>
          <IconFont v-if="data.chain" size="16" :type="safeGet(config, `chain.${data.chain}.logo`)" />
        </div>
        <div class="nameDes md:mt-1.5 text-number line-height-no w-130 short text-left">{{ data["description"] }}</div>
      </div>
    </div>
    <!--chainIcon-->
    <div v-else-if="typeDom === 'chainIcon'">
      <div v-if="safeGet(data, 'chains') && safeGet(data, 'chains').length > 0" class="flex items-center justify-center">
        <template v-for="(chain, i) in safeGet(data, 'chains').slice(0, showChainCount)" :key="i">
          <IconFont :class="i === 0 ? '' : 'ml-1.5'" size="16" :type="safeGet(config, `chain.${chain}.logo`)" />
        </template>
        <el-popover v-if="safeGet(data, 'chains').length > showChainCount" popper-class="chain-popper" placement="bottom" trigger="hover" :append-to-body="false">
          <div class="flex items-center px-2 py-1.5">
            <template v-for="(chain, i) in safeGet(data, 'chains').slice(showChainCount)" :key="i">
              <IconFont :class="i === 0 ? '' : 'ml-1.5'" size="16" :type="safeGet(config, `chain.${chain}.logo`)" />
            </template>
          </div>
          <template #reference>
            <div class="ml-1.5 relative bottom-1 text-global-highTitle text-opacity-45">...</div>
          </template>
        </el-popover>
      </div>
      <div v-else class="numberDefault text-number text-center">N/A</div>
    </div>
    <!--    iconHref  tge_platform-->
    <div v-else-if="typeDom === 'iconHref'" class="flex-center justify-right justify-center">
      <div v-if="domData && safeGet(config, `tge_platform.${domData}`)" class="w-full flex items-center justify-center">
        <IconFont v-if="config" size="16" :type="safeGet(config, `tge_platform.${domData}.logo`)" />
        <div class="link text-number">{{ domData }}</div>
      </div>
      <div v-else class="numberDefault text-number text-center">Not Set</div>
    </div>
    <!--starNumber overall_score-->
    <div v-else-if="typeDom === 'starNumber'" class="flex-center justify-center">
      <div v-if="domData || domData === 0" class="w-full flex items-center justify-center">
        <IconFont size="12" type="icon-star" />
        <span class="star-txt text-number">{{ domData ? getSaveNumber(domData, 1) : 0 }}</span>
      </div>
      <div v-else class="numberDefault text-number text-center">Not Set</div>
    </div>
    <!--txt categories-->
    <div v-else-if="typeDom === 'txt'" class="numberDefault text-number text-center">
      {{ domData ? domData : "N/A" }}
    </div>
    <!--numberPrice-->
    <div v-else-if="typeDom === 'numberPrice'" class="numberDefault text-number text-center">
      {{ toNumberCashFormat(domData, "$", "", typeName === "ido_price" ? "TBA" : "--") }}
    </div>
    <div v-else-if="typeDom === 'dappNftMix'">
      <div v-if="data.is_nft" class="flex-center justify-center">
        <IconFont size="16" :type="safeGet(config, `chain.${data.chain}.logo`)" />
        <span class="numberDefault text-number ml-1">{{ toNumberCashFormat(domData) }}</span>
      </div>
      <div v-else>{{ toNumberCashFormat(domData, "$") }}</div>
    </div>
    <!--chainNumber-->
    <div v-else-if="typeDom === 'chainNumber'" class="flex-center justify-center">
      <IconFont size="16" :type="safeGet(config, `chain.${data.chain}.logo`)" />
      <span class="numberDefault text-number ml-1">{{ toNumberCashFormat(domData) }}</span>
    </div>
    <!--numberUnit-->
    <div v-else-if="typeDom === 'numberUnit'" class="flex-center justify-center">
      <span class="numberDefault text-number">{{ toNumberCashFormat(domData[0]) }}</span>
      <span class="unit">{{ domData[1] }}</span>
    </div>
    <!--numbers-->
    <div v-else-if="typeDom === 'numbers'" class="numberDefault text-number text-center">
      {{ toNumberCashFormat(domData) }}
    </div>
    <!--numberChange-->
    <div v-else-if="typeDom === 'numberChange'">
      <div class="numberDefault text-number text-center">{{ toNumberCashFormat(domData[0]) }}</div>
      <div v-if="domData[1] !== 0" class="flex-center justify-center">
        <IconFont size="8" :type="domData[1] > 0 ? 'icon-zheng' : 'icon-fu'" />
        <span :class="getUpDownColor(domData[1])" class="numberChange text-number ml-1">{{ toNumberCashFormat(domData[1], "%", "", "N/A") }}</span>
      </div>
      <div v-else class="numberDefault text-number">0</div>
    </div>
    <!--lever-->
    <div v-else-if="typeDom === 'lever'" class="text-kd12px16px md:text-kd14px16px text-number justify-right" :class="getUpDownColor(domData)">
      {{ toNumberCashFormat(domData, "x", "", "N/A") }}
    </div>
    <!--timeType-->
    <div v-else-if="typeDom === 'timeType'" class="numberDefault text-number text-center">
      {{ domData ? getDateMDY(dataToTimestamp(domData)) : "TBA" }}
    </div>
    <div v-else>-</div>
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

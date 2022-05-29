<!--<script setup lang="ts">-->
<!--import type {PropType} from "vue";-->
<!--import {onMounted, ref} from "vue";-->
<!--import {toNumberCashFormat} from "src/utils/convert/to";-->
<!--import {getData, getDom} from "src/logic/home";-->
<!--import {dataToTimestamp, getSaveNumber, getUpDownColor} from "src/lib/tool";-->
<!--import type {detail} from "src/types/home";-->
<!--import * as alias from "src/utils/root/alias";-->
<!--import {getValue} from "src/utils/root/data";-->
<!--import type {SiteConfig} from "src/types/common/chain";-->
<!--import {getDateMDY} from "src/utils";-->
<!--import safeGet from "@fengqiaogang/safe-get";-->
<!--import {ElPopover} from "element-plus";-->
<!--import _ from "lodash";-->

<!--const showChainCount = 3;-->
<!--// 公链配置-->
<!--const config = getValue<SiteConfig>(alias.common.chain.site, {} as SiteConfig);-->
<!--const props = defineProps({-->
<!--  info: {-->
<!--    type: Object as PropType<detail>,-->
<!--    default: () => {-->
<!--      return {};-->
<!--    },-->
<!--  },-->
<!--  data: {-->
<!--    type: Object,-->
<!--    default: () => {-->
<!--      return {};-->
<!--    },-->
<!--  },-->
<!--  typeName: {-->
<!--    type: String,-->
<!--    default: () => "",-->
<!--  },-->
<!--  type: {-->
<!--    type: String,-->
<!--    default: () => "data",-->
<!--  },-->
<!--});-->
<!--const typeDom = ref(""); // dom类型-->
<!--const domData = ref(); // dom数据-->
<!--const txtCss = props.info.id ? "text-number" : "text-number";-->
<!--const getNumColor = (value: any) => {-->
<!--  const numValue: any = _.isArray(value) ? value[1] : value-->
<!--  return `${getUpDownColor(numValue)} ${txtCss}`-->
<!--}-->
<!--onMounted(() => {-->
<!--  typeDom.value = getDom(props.typeName);-->
<!--  domData.value = getData(props.typeName, props.data);-->
<!--});-->
<!--</script>-->
<!--<template>-->
<!--  <div v-if="data">-->
<!--    &lt;!&ndash;Name&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-if="(typeName === 'name' && !info.id) || (typeName === 'name' && safeGet(info, 'show_type') === 'data')" class="flex-center max-w-20 whitespace-nowrap">&ndash;&gt;-->
<!--&lt;!&ndash;      <ui-image class="min-w-8 min-h-8 w-8 h-8 rounded-full text-kd10px12px text-number" :src="safeGet(data, 'logo')" :title="data.name"/>&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="ml-1.5">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="numberDefault line-height-no smallTxt max-w-20 text-left whitespace-nowrap" :class="txtCss">&ndash;&gt;-->
<!--&lt;!&ndash;          {{ data["name"] }}&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="nameTag text-left line-height-no" :class="txtCss">{{ data["symbol"] }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;NameDes&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeName === 'name' && info.id && safeGet(info, 'show_type') === 'desc'" class="flex-center short min-w-140">&ndash;&gt;-->
<!--&lt;!&ndash;      <ui-image class="w-8 h-8 md:w-12 md:h-12 rounded-kd6px" :src="data.logo"/>&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="ml-3 short">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="nameNameDes line-height-no flex-center" :class="txtCss">&ndash;&gt;-->
<!--&lt;!&ndash;          <span>{{ data["name"] }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;          <IconFont v-if="data.chain" size="16" :type="safeGet(config, `chain.${data.chain}.logo`)"/>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="nameDes md:mt-1.5 line-height-no w-130 short text-left" :class="txtCss">{{ data["description"] }}&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;chainIcon&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'chainIcon'">&ndash;&gt;-->
<!--&lt;!&ndash;      <div v-if="safeGet(data, 'chains') && safeGet(data, 'chains').length > 0" class="flex items-center justify-center">&ndash;&gt;-->
<!--&lt;!&ndash;        <template v-for="(chain, i) in safeGet(data, 'chains').slice(0, showChainCount)" :key="i">&ndash;&gt;-->
<!--&lt;!&ndash;          <IconFont :class="i === 0 ? '' : 'ml-1.5'" size="16" :type="safeGet(config, `chain.${chain}.logo`)"/>&ndash;&gt;-->
<!--&lt;!&ndash;        </template>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-popover v-if="safeGet(data, 'chains').length > showChainCount" popper-class="chain-popper" placement="bottom" trigger="hover" :append-to-body="false">&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="flex items-center px-2 py-1.5">&ndash;&gt;-->
<!--&lt;!&ndash;            <template v-for="(chain, i) in safeGet(data, 'chains').slice(showChainCount)" :key="i">&ndash;&gt;-->
<!--&lt;!&ndash;              <IconFont :class="i === 0 ? '' : 'ml-1.5'" size="16" :type="safeGet(config, `chain.${chain}.logo`)"/>&ndash;&gt;-->
<!--&lt;!&ndash;            </template>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;          <template #reference>&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="ml-1.5 relative bottom-1 text-global-highTitle text-opacity-45">...</div>&ndash;&gt;-->
<!--&lt;!&ndash;          </template>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-popover>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div v-else class="numberDefault text-center" :class="txtCss">N/A</div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;    iconHref  tge_platform&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'iconHref'" class="flex-center justify-right justify-center">&ndash;&gt;-->
<!--&lt;!&ndash;      <div v-if="domData && safeGet(config, `tge_platform.${domData}`)" class="w-full flex items-center justify-center">&ndash;&gt;-->
<!--&lt;!&ndash;        <IconFont v-if="config" size="16" :type="safeGet(config, `tge_platform.${domData}.logo`)"/>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="link" :class="txtCss">{{ domData }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div v-else class="numberDefault text-center" :class="txtCss">Not Set</div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;starNumber overall_score&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'starNumber'" class="flex-center justify-center">&ndash;&gt;-->
<!--&lt;!&ndash;      <div v-if="domData || domData === 0" class="w-full flex items-center justify-center">&ndash;&gt;-->
<!--&lt;!&ndash;        <IconFont size="12" type="icon-star"/>&ndash;&gt;-->
<!--&lt;!&ndash;        <span class="star-txt" :class="txtCss">{{ domData ? getSaveNumber(domData, 1) : 0 }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div v-else class="numberDefault text-center" :class="txtCss">Not Set</div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;txt categories&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'txt'" class="numberDefault text-center" :class="txtCss">&ndash;&gt;-->
<!--&lt;!&ndash;      {{ domData ? domData : "N/A" }}&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;numberPrice&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'numberPrice'" class="numberDefault text-center" :class="txtCss">&ndash;&gt;-->
<!--&lt;!&ndash;      {{ toNumberCashFormat(domData, "$", "", typeName === "ido_price" ? "TBA" : "&#45;&#45;") }}&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'dappNftMix'">&ndash;&gt;-->
<!--&lt;!&ndash;      <div v-if="data.is_nft" class="flex-center justify-center border-1">&ndash;&gt;-->
<!--&lt;!&ndash;        <IconFont size="16" :type="safeGet(config, `chain.${data.chain}.logo`)"/>&ndash;&gt;-->
<!--&lt;!&ndash;        <span class="numberDefault ml-1" :class="txtCss">{{ toNumberCashFormat(domData) }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div v-else :class="txtCss" class="text-center numberDefault">{{ toNumberCashFormat(domData, "$") }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;chainNumber&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'chainNumber'" class="flex-center justify-center">&ndash;&gt;-->
<!--&lt;!&ndash;      <IconFont size="16" :type="safeGet(config, `chain.${data.chain}.logo`)"/>&ndash;&gt;-->
<!--&lt;!&ndash;      <span class="numberDefault ml-1" :class="txtCss">{{ toNumberCashFormat(domData) }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;numberUnit&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'numberUnit'" class="flex-center justify-center">&ndash;&gt;-->
<!--&lt;!&ndash;      <span class="numberDefault" :class="txtCss">{{ toNumberCashFormat(domData[0]) }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;      <span class="unit">{{ domData[1] }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;numbers&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'numbers'" class="numberDefault text-center" :class="txtCss">&ndash;&gt;-->
<!--&lt;!&ndash;      {{ toNumberCashFormat(domData) }}&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;numberChange&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'numberChange'">&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="numberDefault text-center" :class="txtCss">{{ toNumberCashFormat(domData[0]) }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div v-if="domData[1] !== 0" class="flex-center justify-center">&ndash;&gt;-->
<!--&lt;!&ndash;        <IconFont size="8" :type="domData[1] > 0 ? 'icon-zheng' : 'icon-fu'"/>&ndash;&gt;-->
<!--&lt;!&ndash;        <span :class="getNumColor(domData[1])" class="numberChange ml-1 text-number">{{ toNumberCashFormat(domData[1], "%", "", "N/A")&ndash;&gt;-->
<!--&lt;!&ndash;          }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div v-else class="numberDefault" :class="txtCss">0</div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;lever&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'lever'" class="text-kd12px16px md:text-kd14px16px text-number justify-right" :class="getNumColor(domData)">&ndash;&gt;-->
<!--&lt;!&ndash;      {{ toNumberCashFormat(domData, "x", "", "N/A") }}&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;timeType&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'timeType'" class="numberDefault text-number text-center">&ndash;&gt;-->
<!--&lt;!&ndash;      {{ domData ? getDateMDY(dataToTimestamp(domData)) : "TBA" }}&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;    longNumberChange&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'longNumberChange'">&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="numberDefault text-center" :class="txtCss">{{ toNumberCashFormat(domData[0], "%") }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div v-if="domData[1] !== 0" class="flex-center justify-center">&ndash;&gt;-->
<!--&lt;!&ndash;        <IconFont size="8" :type="domData[1] > 0 ? 'icon-zheng' : 'icon-fu'"/>&ndash;&gt;-->
<!--&lt;!&ndash;        <span :class="getNumColor(domData[1])" class="numberChange ml-1 text-number">{{ toNumberCashFormat(domData[1], "%", "", "N/A")&ndash;&gt;-->
<!--&lt;!&ndash;          }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div v-else class="numberDefault" :class="txtCss">0</div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'changePercent'" :class="getNumColor(domData)" class="text-kd12px16px md:text-kd14px16px text-number text-center">&ndash;&gt;-->
<!--&lt;!&ndash;      {{ toNumberCashFormat(domData, "%") }}&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;    chartDom&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div></div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;    moneyNumber&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'moneyNumber'" class="numberDefault text-center">&ndash;&gt;-->
<!--&lt;!&ndash;      {{ toNumberCashFormat(domData, "$") }}&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;    comment&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'comment'" class="numberDefault text-center">&ndash;&gt;-->
<!--&lt;!&ndash;      推荐理由&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;    stage_name&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom === 'stage_name'">&ndash;&gt;-->
<!--&lt;!&ndash;      投资阶段&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;    barPercent&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else-if="typeDom==='barPercent'">百分比条</div>&ndash;&gt;-->
<!--&lt;!&ndash;    <div v-else>-</div>&ndash;&gt;-->
<!--  </div>-->
<!--</template>-->
<!--<style scoped lang="scss">-->
<!--::v-deep(.el-popover.el-popper) {-->
<!--  min-width: fit-content !important;-->
<!--  width: fit-content !important;-->
<!--  padding: 0px 0px 0px 0px !important;-->
<!--  border-radius: 100px;-->
<!--  transform: translate(100%, 100%);-->
<!--  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);-->
<!--}-->

<!--.line-height-no {-->
<!--  line-height: 0px;-->
<!--}-->

<!--.flex-center {-->
<!--  @apply flex items-center;-->
<!--}-->

<!--.link {-->
<!--  @apply ml-1 text-global-primary text-kd14px16px;-->
<!--}-->

<!--.star-txt {-->
<!--  @apply ml-1  text-kd12px16px md:text-kd14px16px text-global-highTitle;-->
<!--}-->

<!--.numberDefault {-->
<!--  @apply text-kd12px16px md:text-kd14px16px text-global-highTitle;-->
<!--}-->

<!--.unit {-->
<!--  @apply ml-1 font-kdFang font-medium text-kd12px16px text-global-highTitle text-opacity-65;-->
<!--}-->

<!--.numberChange {-->
<!--  @apply text-kd12px18px;-->
<!--}-->

<!--.nameTag {-->
<!--  @apply text-kd12px16px text-global-highTitle text-opacity-45;-->
<!--}-->

<!--.nameNameDes {-->
<!--  @apply text-kd14px18px md:text-kd16px18px text-global-highTitle;-->
<!--}-->

<!--.nameDes {-->
<!--  @apply text-kd12px16px md:text-kd14px16px text-global-highTitle text-opacity-45;-->
<!--}-->

<!--.smallTxt {-->
<!--  overflow: hidden;-->
<!--  text-overflow: ellipsis;-->
<!--  //display: -webkit-box;-->
<!--  -webkit-box-orient: vertical;-->
<!--  -webkit-line-clamp: 1;-->
<!--}-->
<!--</style>-->

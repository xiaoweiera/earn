<script setup lang="ts">
import * as alias from "src/utils/root/alias";
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import { onMounted, ref, watch } from "vue";
import I18n from "src/utils/i18n";
import { Model } from "src/logic/home";
import { getValue } from "src/utils/root/data";
import { SiteConfig } from "src/types/common/chain";
import safeGet from "@fengqiaogang/safe-get";
import { getParam } from "src/utils/router";
import { useRoute } from "vue-router";
const route = useRoute();
// 公链配置
const config = getValue<SiteConfig>(alias.common.chain.site, {} as SiteConfig);
const i18n = I18n();
const props = defineProps({
  page: {
    type: String,
    required: true,
  },
});
const chain = ref(getParam<string>("chain") || "all");
const chainData: any = createRef<object[]>(alias.rank.chains, []);

watch(route, () => {
  chain.value = getParam<string>("chain") || "all";
});
onMounted(() => {
  // 得到数据汇总
  onLoadRef<object[]>(chainData, () => {
    const api = new Model();
    return api.rank.getChains(props.page);
  });
});
</script>
<template>
  <div class="flex xshidden font-kdFang flex-wrap">
    <template v-for="item in chainData" :key="item.id">
      <router-link :to="item.href" :class="chain === item.slug ? 'selectedTag ' : 'tag'" class="flex hand mb-3 rounded-kd20px max-h-9 flex items-center justify-center" style="flex-shrink: 0">
        <IconFont v-if="item.slug !== 'other'" :class="chain === 'all' ? 'text-global-white' : item.slug === 'all' ? 'text-global-primary' : ''" size="20" :type="item.slug === 'all' ? 'icon-quanbuno-copy' : safeGet(config, `chain.${item.slug}.logo`)" class="mr-1" />
        <div class="text-kd14px18px">{{ item.name === i18n.apyIndex.allChain ? i18n.apyIndex.all : item.name }}</div>
      </router-link>
    </template>
  </div>
  <!--  <div class='mdhidden  flex items-center relative w-full'>-->
  <!--    <IconFont v-if='chainItem' :class='chainItem.slug==="all"?"text-global-primary":""' size='20' class='absolute z-1 left-3 ' :type='chainItem?.logo' />-->
  <!--    <el-select class=' w-full' v-model='chain' placeholder='全部'>-->
  <!--      <el-option v-for='item in chainData' :label='item.name' :value='item.slug'>-->
  <!--        <router-link :to='getHref(item.slug)' class='flex items-center  h-full'>-->
  <!--          <IconFont size='20' :type='item.logo' />-->
  <!--          <div class='ml-1 text-kd14px18px text-global-highTitle txt85' >{{ item.name }}</div>-->
  <!--        </router-link>-->
  <!--      </el-option>-->
  <!--    </el-select>-->
  <!--  </div>-->
</template>
<style scoped lang="scss">
::v-deep(.el-input__inner) {
  border-radius: 20px;
  @apply h-9 pl-9.5;
}

.tag {
  border: 1px solid rgba(3, 54, 102, 0.1);
  @apply px-2 py-1 mr-3  text-kd16px24px text-global-highTitle text-opacity-85;
}

.selectedTag {
  border: 1px solid rgba(3, 54, 102, 0);
  @apply px-2 py-1 bg-global-primary   mr-3  text-kd16px24px text-global-white;
}
</style>

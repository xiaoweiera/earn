<script setup lang="ts">
import _ from "lodash";
import { PropType, ref, onMounted } from "vue";
import { ElInput } from "element-plus";
import {summaryItem} from "src/types/home";
import {useRouter} from "vue-router";
import {getParam} from "src/utils/router";
import window from "src/plugins/browser/window";
import { createHref } from "src/plugins/router/pack";
import DAppDiscoversContentType from '../discovers/content/type.vue';
import DAppDiscoversContentChain from '../discovers/content/chain.vue';

import { tabCage } from "src/logic/dapp/";
import { config } from "src/router/config";

// 引入 use state
import {stateAlias, setInject} from "src/utils/use/state";

interface Query {
  query: string;
  [key: string]: string;
}

defineProps({
  data: {
    required: true,
    type: Object as PropType<summaryItem>,
  }
});

const $router = useRouter();
import I18n from "src/utils/i18n";
import ClientOnly from "~/components/client/only.vue";
const i18n = I18n();


const onChangeParam = setInject(stateAlias.ui.tab);

const search = ref<string>();

const onSearch = _.debounce(async function () {
  const query = { ...getParam<object>(), query: search.value || "" };
  const url = createHref(window.location.pathname, query);
  await $router.push(url);
  if (onChangeParam) {
    onChangeParam(query);
  }
}, 300);

onMounted(function() {
  search.value = getParam<string>("query") || "";
});

</script>
<template>
  <div class="mt-5" v-if="data">
    <div>
      <!-- 项目类型、公链、搜索框 -->
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <!-- 项目类型 -->
          <DappDiscoversContentType v-if="data.category" :list="tabCage(data.category,'group', `${config.nft}/discover`)" :key="key" :split="3" :title="i18n.home.topList.category" name="group"/>
          <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
          <!-- 公链 -->
          <DAppDiscoversContentChain :title="i18n.home.idoIgoProject.chain" :chainData="data.chain" :href="config.nftList" name="chain"/>
        </div>
        <!-- 搜索框 -->
        <client-only class="w-50">
          <ElInput class="w-full" v-model="search" :placeholder="i18n.common.placeholder.search" @change="onSearch">
            <template #prefix>
              <IconFont type="icon-sousuo" size="16" @click="onSearch"/>
            </template>
          </ElInput>
        </client-only>
      </div>
    </div>
  </div>
</template>

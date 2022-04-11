<script lang="ts" setup>
/**
 * @file 项目详情数据
 * @auth svon.me@gmail.com
 */
import type { PropType } from "vue";
import { ProjectType } from "src/types/dapp/data";
import type { DAppProject, DAppData } from "src/types/dapp/data";
import { getChainLogo } from "src/utils/";

defineProps({
  project: {
    required: true,
    type: Object as PropType<DAppProject>,
  },
  data: {
    required: true,
    type: Object as PropType<DAppData>,
  },
});
</script>

<template>
  <div>
    <div class="flex items-center">
      <ui-image :alt="data.name" :src="data.logo" class="w-12 h-12 mr-3" rounded />
      <div class="flex-1">
        <h3 class="text-24-28 text-global-highTitle font-medium">{{ data.name }}</h3>
      </div>
    </div>
    <div class="mt-4 flex">
      <!--项目进度-->
      <ui-label v-if="project.type === ProjectType.airdrop && data.ido" :value="data.ido.ido_status" />
      <!--风险等级-->
      <ui-label :value="data.risk" />
      <!--公链-->
      <ui-label :value="data.chains" />
      <!--项目类型-->
      <ui-label :value="data.categories" />
      <!-- 合约 -->
      <ui-label :value="data.contracts" copy name-key="address" no-select>
        <template #prefix="scope">
          <span v-if="getChainLogo(scope.data.chain)" class="flex pr-1">
            <IconFont :type="getChainLogo(scope.data.chain)" size="16" />
          </span>
        </template>
      </ui-label>
    </div>

    <!--项目描述-->
    <ui-description :line="2" class="mt-5" dialog>
      <div class="text-14-20 text-global-highTitle text-opacity-65">
        <div v-for="i in 10" :key="i">
          <span v-if="project.rank">{{ data.ticker }}</span>
          <span v-else>{{ data.description }}</span>
        </div>
      </div>
    </ui-description>
  </div>
</template>

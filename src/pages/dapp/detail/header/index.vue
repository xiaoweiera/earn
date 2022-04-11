<script lang="ts" setup>
/**
 * @file 项目详情数据
 * @auth svon.me@gmail.com
 */
import type { PropType } from "vue";
import { ProjectType } from "src/types/dapp/data";
import type { DAppProject, DAppData } from "src/types/dapp/data";

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
      <ui-image :src="data.logo" :alt="data.name" class="w-12 h-12 mr-3" rounded />
      <div class="flex-1">
        <h3 class="text-24-28 text-global-highTitle font-medium">{{ data.name }}</h3>
      </div>
    </div>
    <div class="mt-4 flex">
      <template v-if="project.type === ProjectType.airdrop && data.ido">
        <!--项目进度-->
        <div>{{ data.ido.ido_status }}</div>
      </template>
      <div v-if="data.risk">
        <span>{{ data.risk }}</span>
      </div>
      <!--公链-->
      <div v-for="(item, index) in data.chains" :key="index" class="ml-2">
        <span v-if="index === 0">{{ item.name }}</span>
      </div>
      <!--项目类型-->
      <div v-for="(name, index) in data.categories" :key="index" class="ml-2">
        <span v-if="index === 0">{{ name }}</span>
      </div>
    </div>

    <!--项目描述-->
    <ui-description class="mt-5" :line="2" dialog>
      <div class="text-14-20 text-global-highTitle text-opacity-65">
        <div v-for="i in 10" :key="i">
          <span v-if="project.rank">{{ data.ticker }}</span>
          <span v-else>{{ data.description }}</span>
        </div>
      </div>
    </ui-description>
  </div>
</template>

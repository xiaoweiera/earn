<script lang="ts" setup>
/**
 * @file 项目详情数据
 * @auth svon.me@gmail.com
 */
import type { PropType } from "vue";
import * as console from "src/plugins/log/";
import { ProjectType } from "src/types/dapp/data";
import type { DAppProject, DAppData } from "src/types/dapp/data";

const props = defineProps({
  project: {
    required: true,
    type: Object as PropType<DAppProject>,
  },
  data: {
    required: true,
    type: Object as PropType<DAppData>,
  },
});

console.log(props.data);
</script>

<template>
  <div>
    <div class="flex items-center">
      <ui-image :src="data.logo" class="w-12 h-12 mr-3" rounded />
      <div class="flex-1">
        <h3 class="text-24-28 text-global-highTitle font-medium">{{ data.name }}</h3>
      </div>
    </div>
    <div class="mt-4 flex">
      <template v-if="project.type === ProjectType.airdrop">
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

    <ui-description class="description mt-5 text-14-20 text-global-highTitle text-opacity-65">
      <div>
        <span v-if="project.rank">{{ data.ticker }}</span>
        <span v-else>{{ data.description }}</span>
      </div>
    </ui-description>
  </div>
</template>

<style scoped lang="scss"></style>

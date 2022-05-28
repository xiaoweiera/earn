<script setup lang="ts">
import safeGet from "@fengqiaogang/safe-get";
import { AnyEquals } from "src/utils/";
import DAppDiscoversContentHeader from "./header.vue";
import DAppDiscoversContentTitle from "./title.vue";
import DAppDiscoversContentDec from "./dec.vue";
import DAppDiscoversContentPrice from "./price.vue";
import DAppDiscoversContentTime from "./time.vue";
import { routerConfig } from "src/router/config";

import { DAppType } from "src/types/dapp/dapp";
import type { PropType } from "vue";

const props = defineProps({
  name: {
    type: String as PropType<DAppType>,
    required: true,
  },
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
  status: {
    type: String,
    default: "",
  },
});

const getUrl = function (data: object) {
  const id = safeGet<string>(data, "id");
  if (AnyEquals(props.name, DAppType.igo)) {
    return routerConfig.dapp.igoDetail(id);
  }
  return routerConfig.dapp.idoDetail(id);
};
</script>

<template>
  <div>
    <v-router class="block" target="_blank" :href="getUrl(data)">
      <!-- 项目图片和tip角标 -->
      <div class="relative h-40">
        <DAppDiscoversContentHeader :data="data" />
      </div>

      <!-- 项目头像和项目名 -->
      <div class="w-full h-51.25 px-4 absolute top-35.75 left-0 bg-global-white rounded-md">
        <DAppDiscoversContentTitle :data="data" />
        <!-- 项目描述 -->
        <div>
          <DAppDiscoversContentDec :data="data" />
        </div>
        <!-- 项目价格 -->
        <div>
          <DAppDiscoversContentPrice :data="data" />
        </div>

        <!-- 项目时间 -->
        <div>
          <DAppDiscoversContentTime :status="status" :data="data" />
        </div>
      </div>
    </v-router>
  </div>
</template>

<script setup lang="ts">
import DAppDiscoversContentHeader from "./header.vue";
import DAppDiscoversContentTitle from "./title.vue";
import DAppDiscoversContentDec from "./dec.vue";
import DAppDiscoversContentPrice from "./price.vue";
import DAppDiscoversContentTime from "./time.vue";
import { getParam } from "src/utils/router";

defineProps({
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

const igo = getParam<boolean>("igo");

const getUrl = function (data: any) {
  if (igo) {
    return `${data.path}/igo?igo=${data.query.igo}`;
  } else {
    return `${data}/dapp`;
  }
};
</script>

<template>
  <div>
    <v-router target="_blank" :href="getUrl(data.url)">
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

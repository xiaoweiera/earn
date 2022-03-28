<script lang="ts" setup>
import { Language } from "src/types/language/";
import { oss } from "src/config";
import { getParam } from "src/utils/router";

const getHotIcon = function () {
  const lang = getParam<string>("lang");
  if (lang && lang === Language.cn) {
    return `${oss}/dapp/hot_cn.png`;
  } else {
    return `${oss}/dapp/hot_en.png`;
  }
};
</script>

<template>
  <div>
    <ui-image class="w-full h-full" :src="getHotIcon()" fit="cover" />
  </div>
</template>

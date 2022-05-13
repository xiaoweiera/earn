<script lang="ts" setup>
import NoData from "./nodata.vue";
import { isLogin } from "src/logic/user/login";
import Info from "./info.vue";
import { address } from "src/logic/common/wallet";
import { computed } from "vue";
const isLoginState = computed(() => isLogin());
</script>
<template>
  <div class="h-full">
    <client-only class="h-full">
      <Info v-if="address && isLoginState" />
      <NoData v-else class="w-full h-full" />
    </client-only>
  </div>
</template>

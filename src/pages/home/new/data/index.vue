<script lang="ts" setup>
import NoData from "./nodata.vue";
import { isLogin } from "src/logic/user/login";
import Info from "./info.vue";
import { address } from "src/logic/common/wallet";
isLogin;
</script>
<template>
  <div>
    <client-only>
      <Info v-if="address && isLogin" />
      <NoData v-else class="w-full" />
    </client-only>
  </div>
</template>

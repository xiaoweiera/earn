<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { toNumberCashFormat } from "src/utils/convert/to";
import { address } from "src/logic/common/wallet";
import { Model } from "src/logic/home";
const param = {
  address: address.value ? address.value : "0x6cf9aa65ebad7028536e353393630e2340ca6049",
  chain: "all",
};
const data: any = ref({});
const getData = async () => {
  const api = new Model();
  data.value = await api.getHistory(param);
};
onMounted(() => {
  getData();
});
</script>
<template>
  <div class="p-4 border-1 bg-global-white rounded-kd6px">
    <div>我的资产</div>
    <div>
      <span>≈</span>
      {{ toNumberCashFormat(data.fund) }}
    </div>
    <chart />
  </div>
</template>

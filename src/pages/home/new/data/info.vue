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
  <div class="p-4 border-1 bg-global-white rounded-kd6px font-kdFang">
    <div class="flex items-center justify-between">
      <div>
        <div class="text-kd14px18px font-medium text-global-highTitle text-opacity-85">我的资产</div>
        <div class="mt-2 flex items-center">
          <span class="mr-1 text-kd14px18px font-medium text-global-highTitle text-opacity-65">≈</span>
          <span class="text-kd26px26px text-global-highTitle text-opacity-85 text-number">{{ toNumberCashFormat(data.fund, "$") }}</span>
        </div>
      </div>
      <chart class="border-1" />
    </div>
  </div>
</template>

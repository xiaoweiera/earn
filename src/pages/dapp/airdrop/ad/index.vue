<script lang="ts" setup>
import * as logic from "src/types/dapp/airdrop";
import { PropType, ref } from "vue";
import HomeAd from "src/pages/home/ad.vue";
import { toLower } from "ramda";

const props = defineProps({
  active: {
    required: true,
    type: String as PropType<logic.TabTypes>,
    default: () => logic.TabTypes.all,
  },
});

const type = {
  [logic.TabTypes.all]: 8, // 全部
  [logic.TabTypes.upcoming]: 9, // 即将开始
  [logic.TabTypes.ongoing]: 10, // 进行中
  [logic.TabTypes.ended]: 11, // 已结束
  [logic.TabTypes.potential]: 12, // 已结束
  [logic.TabTypes.hot]: 8, // 已结束
};
const id = ref(8);
const getAirdropAd = function (): any {
  if (props.active) {
    id.value = type[toLower(props.active)];
  }
  return id;
};
</script>

<template>
  <HomeAd :position="getAirdropAd()" />
</template>
<style lang="scss" scoped></style>

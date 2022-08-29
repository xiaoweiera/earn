<script setup>
import _ from "lodash";

defineProps({
  cardType: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="type-default" :class="cardType">{{_.upperFirst(cardType)}}</div>
</template>
<style scoped lang="scss">
.type-default{
  @apply h-7 w-max rounded-kd4px px-1.5 items-center flex text-kd16px24px text-global-hui01 huawei-medium;
}
.buy{
  @apply bg-global-red05;
}
.sell{
  @apply bg-global-green06;
}
.mint{
  @apply bg-global-qing05;
}
</style>
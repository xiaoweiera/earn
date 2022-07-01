<script setup lang="ts">
/**
 * @file icon
 * @auth svon.me@gmail.com
 */
import { computed } from "vue";
import { getChainLogo } from "src/utils/";
import safeGet from "@fengqiaogang/safe-get";
import { ElPopover } from "element-plus";

const props = defineProps({
  field: {
    required: true,
    type: String,
  },
  data: {
    required: true,
    type: Object,
  },
});
const showChainCount = 3; //默认先是几个icon
const iconList = computed<string>(() => safeGet(props.data, props.field));
</script>
<template>
  <div v-if="iconList.length > 0" class="flex items-center justify-center">
    <template v-for="(key, i) in iconList.slice(0, showChainCount)" :key="i">
      <IconFont class="dom-icon" size="16" :type="getChainLogo(key)" />
    </template>
    <el-popover v-if="iconList.length > showChainCount" popper-class="chain-popper" placement="bottom" trigger="hover" :append-to-body="false">
      <div class="flex items-center px-2 py-1.5">
        <template v-for="(key, i) in iconList.slice(showChainCount)" :key="i">
          <IconFont class="popover-icon w-full h-full" size="16" :type="getChainLogo(key)" />
        </template>
      </div>
      <template #reference>
        <div class="ml-1.5 relative bottom-1 text-global-highTitle text-opacity-45">...</div>
      </template>
    </el-popover>
  </div>
  <div v-else class="numberDefault text-center text-number">N/A</div>
</template>
<style scoped lang="scss">
::v-deep(.el-popover.el-popper) {
  min-width: fit-content !important;
  width: fit-content !important;
  padding: 0px 0px 0px 0px !important;
  border-radius: 100px;
  transform: translate(100%, 100%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.popover-icon:not(:first-child) {
  @apply ml-1.5;
}

.dom-icon:not(:first-child) {
  @apply ml-1.5;
}

.numberDefault {
  @apply text-kd12px16px md:text-kd14px16px text-global-highTitle;
}
</style>

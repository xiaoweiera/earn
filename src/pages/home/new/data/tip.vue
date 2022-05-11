<script setup lang="ts">
import { getDateMDY } from "src/utils";
const i18n = I18n();
import { ElPopover } from "element-plus";
import I18n from "src/utils/i18n";
const props = defineProps({
  data: Object,
});
</script>
<template>
  <div class="line-h-0 hand w-max">
    <el-popover class="break-words" placement="top" width="auto" trigger="hover">
      <div class="md:w-max w-75 break-words">{{ i18n.template(i18n.address.money.valueTip, { time: getDateMDY(data.create_time) }) }}</div>
      <template #reference>
        <IconFont size="14" type="icon-info" @click.stop.prevent />
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElDialog } from "element-plus";
import document from "src/plugins/browser/document";
import I18n from "src/utils/i18n";
const i18n = I18n();

defineProps({
  state: {
    type: Object,
    required: true,
  },
});
const width = ref("");
width.value = document.body.clientWidth > 375 ? "344px" : "340px";
</script>
<template>
  <div class="text-kdFang">
    <ElDialog v-model="state.value" custom-class="starTip" :width="width">
      <div class="pt-4.5 pb-7 md:px-6.5 px-4">
        <div class="flex justify-between items-center">
          <span class="text-kd14px20px text-global-hei text-opacity-85">{{ i18n.dapp.star.title }}</span>
        </div>
        <div class="my-4 text-kd16px24px text-global-hei text-opacity-85 mt-8 flex flex-wrap justify-center items-center">{{ i18n.dapp.star.desc }}</div>
        <v-router href="/activity?lang=cn" class="go mt-8 hand" @click="state.value = false">{{ i18n.dapp.star.go }}</v-router>
      </div>
    </ElDialog>
  </div>
</template>

<style lang="scss">
.starTip {
  margin-top: 30vh !important;
  border-radius: 10px !important;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0px;
  }
  .go {
    border-radius: 34px;
    @apply bg-global-primary text-global-white w-34.5 h-8.5 flex items-center justify-center mx-auto;
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ElDialog } from "element-plus";
import I18n from "src/utils/i18n";
const i18n = I18n();

const emit = defineEmits(["submit", "close"]);
const props = defineProps({
  customClass: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  tip: {
    type: String,
    default: "",
  },
  cancelText: {
    type: String,
    default: "",
  },
  confirmText: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  buttonText: {
    type: String,
    default: "",
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const oepnDialog = ref(false);
const open = () => {
  oepnDialog.value = true;
};
const close = () => {
  oepnDialog.value = false;
  emit("close");
};
const submit = () => {
  oepnDialog.value = false;
  emit("submit");
};

const status = computed<boolean>(function () {
  if (oepnDialog.value) {
    return true;
  }
  return !!props.show;
});
const getTxt = (value: string, defaultValue: string) => (value ? value : defaultValue);
</script>
<template>
  <div class="confirmTipDialog relative">
    <div @click="open">
      <slot name="title"></slot>
    </div>
    <client-only>
      <el-dialog v-model="status" custom-class="dialogClass" popper-append-to-body="false" :width="customClass">
        <div class="p-4 bg-global-white relative rounded-kd6px" :style="`width: ${customClass}`">
          <div class="w-full flex items-center">
            <span class="text-16-24 font-medium text-global-highTitle">{{ getTxt(tip, i18n.common.dialogData.tip) }}</span>
            <IconFont size="20" class="text-global-highTitle absolute right-4 top-4.5 hand text-opacity-65" type="icon-xClose" @click="oepnDialog = false" />
          </div>
          <div class="txt-zheng mt-4 text-center text-global-highTitle text-opacity-85">{{ content }}</div>
          <div v-if="type === 'confirm'" class="flex items-center mt-4">
            <div class="cancel" @click="close()">{{ getTxt(cancelText, i18n.common.dialogData.close) }}</div>
            <div class="confirm" @click="submit()">{{ getTxt(confirmText, i18n.common.dialogData.ok) }}</div>
          </div>
          <div v-if="type === 'message'" class="flex items-center mt-4">
            <div class="confirm" @click="close()">{{ getTxt(buttonText, i18n.common.dialogData.ok) }}</div>
          </div>
        </div>
      </el-dialog>
    </client-only>
  </div>
</template>
<style lang="scss">
.txt-zheng {
  word-break: break-word;
}
.confirmTipDialog {
  .cancel {
    @apply flex-1 text-14-18 font-medium text-global-highTitle text-opacity-85 rounded-kd4px py-2 text-center border-1 border-global-highTitle border-opacity-10  mr-4 cursor-pointer;
  }

  .confirm {
    @apply flex-1 text-14-18 font-medium text-global-white bg-global-primary rounded-kd4px py-2 text-center cursor-pointer;
  }

  .el-dialog__header {
    display: none;
  }

  .el-overlay {
    display: flex;
    align-items: center;
  }

  .dialogClass {
    margin-top: 0 !important;
  }
  .el-dialog .el-dialog__body {
    padding: 0 0 0 0 !important;
    position: absolute;
    left: 0;
    right: 0;
    top: 30vh;
    margin: auto auto;
    display: flex;
    align-items: center;
  }
}
</style>

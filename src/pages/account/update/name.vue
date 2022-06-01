<script lang="ts" setup>
import { ref, PropType } from "vue";
import { ElInput, ElButton } from "element-plus";
import { messageError } from "src/lib/tool";
import API from "src/api/index";
import I18n from "src/utils/i18n";
import type { Callback } from "src/types/common";

const i18n = I18n();

//昵称
const nickName = ref<string>("");

defineProps({
  callback: {
    type: Function as PropType<Callback>,
    default: () => null,
  },
});

const submit = async () => {
  try {
    const api = new API();
    const data = {
      nickname: nickName.value,
    };
    // 提交数据
    const status = await api.user.updateName(data);
  } catch (e: any) {
    // 提升异常信息
    const { message } = e || {};
    if (message) {
      messageError(message);
    } else {
      messageError(i18n.apply.tips.error);
    }
  }
};
</script>

<template>
  <div>
    <div class="input-style">
      <el-input v-model="nickName" placeholder="请输入昵称" />
    </div>
    <div class="mt-5">
      <el-button class="w-full" type="primary" size="large" @click="submit">确认</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.input-style {
  ::v-deep(.el-input__inner) {
    @apply h-11 border-1 border-global-highTitle border-opacity-10 rounded-kd4px;
  }
}
</style>

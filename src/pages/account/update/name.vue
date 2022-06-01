<script lang="ts" setup>
import { ref, PropType, computed, toRaw } from "vue";
import { ElButton, ElForm, ElFormItem, ElInput } from "element-plus";
import { messageError } from "src/lib/tool";
import API from "src/api/index";
import I18n from "src/utils/i18n";
import type { Callback } from "src/types/common";
import * as User from "src/logic/account/name";

const props = defineProps({
  callback: {
    type: Function as PropType<Callback>,
    default: () => null,
  },
});

const i18n = I18n();
const domForm = ref<any>(null);
//昵称
const rules = computed(User.rules);
const formData = User.createFormData();

// 返回
const selfGoBack = function () {
  User.onUpdateEmailCallback(domForm);
};

const submit = async () => {
  try {
    // 校验是否输入名称
    await User.checkValidate(domForm);
  } catch (e) {
    return false;
  }
  try {
    const api = new API();
    // 获取表单数据
    const data: User.FormData = toRaw(formData);
    // 提交数据
    const status = await api.user.updateName(data);
    if (status) {
      selfGoBack();
      if (props.callback) {
        props.callback(data);
      } else {
        // 执行返回逻辑
        selfGoBack();
      }
    }
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
  <client-only>
    <el-form ref="domForm" :model="formData" :rules="rules" autocomplete="off" size="large" @submit.stop.prevent="submit">
      <el-form-item prop="nickname" class="input-style">
        <el-input v-model="formData.nickname" :placeholder="i18n.user.info.inputName" autocomplete="off" name="text" type="text" />
      </el-form-item>
      <!-- 确定按钮 -->
      <el-form-item style="margin-bottom: 0">
        <div class="w-full">
          <el-button class="w-full" native-type="submit" type="primary">
            <span class="text-16">{{ i18n.common.button.confirm }}</span>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </client-only>
</template>
<style lang="scss" scoped>
.input-style {
  ::v-deep(.el-input__inner) {
    @apply h-11 border-1 border-global-highTitle border-opacity-10 rounded-kd4px;
  }
}
</style>

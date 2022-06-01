<script lang="ts" setup>
import { ElUpload, ElLoading } from "element-plus";
import API from "src/api/index";
import * as User from "src/logic/account/name";
import { PropType, toRaw } from "vue";
import { messageError } from "src/lib/tool";
import { Callback } from "src/types/common";
import I18n from "src/utils/i18n";

const props = defineProps({
  callback: {
    type: Function as PropType<Callback>,
    default: () => null,
  },
});

const i18n = I18n();
let loading: any;

const getFileName = function (file: File): string {
  return file.name;
};
const selfGoBack = function () {
  User.onUpdateAvatarCallback();
};
const onBeforeUpload = async (file: File) => {
  loading = ElLoading.service({
    lock: true,
    text: "Loading",
  });
  try {
    const api = new API();
    const fileName = getFileName(file);
    const data = {
      avatar: fileName,
    };
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
const handleChange = () => {
  if (loading) {
    loading.close();
  }
  // todo
};
</script>

<template>
  <div>
    <el-upload class="upload-demo" action="https://kingdata.xyz/api/v2/users/my/update" method="post" :multiple="false" accept="image/*" :before-upload="onBeforeUpload" :on-change="handleChange" :show-file-list="false">
      <slot></slot>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
/**
 * @file 上传
 * @author svon.me@gmail.com
 */
import API from "src/api/";
import { reactive, ref } from "vue";
import I18n from "src/utils/i18n";
import { messageError } from "src/lib/tool";
import { ElUpload, ElLoading } from "element-plus";

const emitEvent = defineEmits(["change", "remove"]);

defineProps({
  // 是否支持删除，重新上传
  remove: {
    type: Boolean,
    default() {
      return true;
    },
  },
  // 预览模式
  preview: {
    type: Boolean,
    default() {
      return false;
    },
  },
  src: {
    type: String,
    default() {
      return "";
    },
  },
});

let loading: any;
const previewUrl = ref<string>("");
const policy = reactive<{ url: string; fields: object }>({
  url: "",
  fields: {},
});

const getFileName = function (file: File): string {
  return file.name;
};

const onBeforeUpload = async function (file: File): Promise<boolean> {
  loading = ElLoading.service({
    lock: true,
    text: "Loading",
  });
  const api = new API();
  const fileName = getFileName(file);
  const option: any = await api.upload.getPolicy(fileName);
  // 签名为空时
  if (!option.url) {
    loading.close();
    // 提示错误信息
    const i18n = I18n();
    messageError(i18n.common.api.wrong);
    return Promise.reject({
      message: i18n.common.api.wrong,
    });
  }
  // 预览图
  previewUrl.value = option.preview_url;
  // 从签名中获取上传地址
  policy.url = option.url;
  // 随文件一起的签名信息
  policy.fields = option.fields;
  return true;
};

// 上传结束
const onChange = function (): void {
  if (loading) {
    loading.close();
  }
  // 重置
  policy.url = "";
  policy.fields = {};
};

// 上传成功
const onSuccess = function (): void {
  emitEvent("change", previewUrl.value);
};

// 删除
const onRemove = function (): void {
  previewUrl.value = "";
  emitEvent("remove");
};
</script>

<template>
  <div class="upload-box rounded-md">
    <div v-if="preview && src" class="overflow-hidden h-full">
      <!--是否为预览-->
      <ui-image :src="src" :preview="[src]" />
    </div>
    <div v-else class="relative h-full">
      <!--删除 icon-->
      <div v-if="remove && src" class="delete cursor-pointer" @click="onRemove">
        <IconFont type="icon-remove" />
      </div>
      <div class="upload-main h-full">
        <el-upload class="w-full h-full bg-white avatar-uploader overflow-hidden rounded-md" :action="policy.url" :data="policy.fields" method="post" accept="image/*" :show-file-list="false" :multiple="false" name="file" :drag="true" :before-upload="onBeforeUpload" :on-change="onChange" :on-success="onSuccess" :auto-upload="true">
          <template v-if="src">
            <ui-image class="h-full w-full" :src="src" />
          </template>
          <span v-else class="w-full h-full block flex items-center justify-center">
            <IconFont class="icon-plus" type="icon-plus" size="30" />
          </span>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.upload-box {
  border-color: rgba(220, 223, 220, 1);
  @apply border border-solid;
  &:not([class~="w-"]),
  &:not([class*="w-"]) {
    @apply w-30;
  }

  &:not([class~="h-"]),
  &:not([class*="h-"]) {
    @apply h-30;
  }

  .delete {
    @apply z-2 absolute right-0 top-0;
    transform: translate(40%, -40%);
  }
}

.avatar-uploader {
  @apply flex items-center justify-center;
  ::v-deep(.el-upload) {
    @apply w-full h-full block;
  }

  ::v-deep(.el-upload-dragger) {
    @apply w-full h-full border-none;
  }

  .icon-plus {
    color: rgba(220, 223, 220, 1);
  }
}
</style>

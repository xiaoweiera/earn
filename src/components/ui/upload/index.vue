<script setup lang="ts">
import { uploadImage } from "src/logic/upload";
import { messageError } from "src/lib/tool";
import { ElLoading, ElUpload } from "element-plus";

defineProps({
  size: {
    type: String,
    default() {
      return "";
    },
  },
  src: {
    type: String,
    default() {
      return "";
    },
  },
  remove: {
    type: Boolean,
    default() {
      return true;
    },
  },
  preview: {
    type: Boolean,
    default() {
      return false;
    },
  },
});

const emitEvent = defineEmits(["change", "remove"]);

// @ts-ignore
const onUpload = async (file: any): Promise<boolean> => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
  });

  const data = file.raw;
  try {
    const value = await uploadImage(data);
    if (value) {
      emitEvent("change", value);
    }
  } catch (e: any) {
    if (e?.message) {
      messageError(e.message);
    }
  } finally {
    loading.close();
  }
  return false;
};

// @ts-ignore
const getStyle = function (value: string): string {
  return `background-image: url(${value});`;
};

// @ts-ignore
const onRemove = function () {
  emitEvent("remove");
};
</script>

<template>
  <client-only>
    <div v-if="preview" class="preview-wrap upload-box relative rounded-md overflow-hidden" :class="size">
      <v-router :href="src" class="avatar-uploader cursor-pointer" target="_blank">
        <span class="preview picture inline-block" :class="size" :style="getStyle(src)" />
      </v-router>
    </div>
    <div v-else class="upload-box relative rounded-md" :class="size">
      <template v-if="src">
        <div v-if="remove" class="delete cursor-pointer" @click="onRemove">
          <IconFont type="icon-remove" />
        </div>
      </template>
      <div class="upload-main w-full h-full">
        <el-upload class="avatar-uploader" action="" accept="image/*" name="image_url" :show-file-list="false" :multiple="false" :drag="true" :on-change="onUpload" :auto-upload="false" :headers="{ 'Content-Type': 'application/x-www-form-urlencoded' }">
          <template v-if="src">
            <span class="preview picture inline-block" :class="size" :style="getStyle(src)" />
          </template>
          <template v-else-if="previewSrc">
            <span class="preview picture inline-block" :style="getStyle(previewSrc)" />
          </template>
          <IconFont v-else class="preview" type="plus" suffix="png" />
        </el-upload>
      </div>
    </div>
  </client-only>
</template>

<style scoped lang="scss">
@mixin size($number) {
  min-width: $number;
  width: $number;
  height: $number;
}

.upload-box,
.picture {
  @include size(120px);
  &.xs {
    @include size(72px);
  }
}
.delete {
  @apply z-2 absolute right-0 top-0;
  transform: translate(40%, -40%);
}
.upload-main {
  border-color: rgba(220, 223, 220, 1);
  @apply border border-solid;
  @apply rounded-md overflow-hidden;
}
.avatar-uploader {
  @apply w-full h-full bg-white;
  @apply flex items-center justify-center;
  .preview {
    @apply transform -translate-x-1/2 -translate-y-1/2;
    @apply absolute left-1/2 top-1/2;
    @apply max-w-40;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    @at-root .preview-wrap & {
      @apply bg-global-topBg;
    }
  }
}
</style>

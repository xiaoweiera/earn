<script lang="ts" setup>
import { ElUpload, ElLoading } from "element-plus";
import API from "src/api/index";

let loading: any;

const getFileName = function (file: File): string {
  return file.name;
};
const onBeforeUpload = async (file: File) => {
  loading = ElLoading.service({
    lock: true,
    text: "Loading",
  });
  const api = new API();
  const fileName = getFileName(file);
  const data = {
    avatar: fileName,
  };
  const option: any = await api.user.updateName(data);
};
const handleChange = (data: any) => {
  // console.log(data);
};
</script>

<template>
  <div>
    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :multiple="false" accept="image/*" :before-upload="onBeforeUpload" :on-change="handleChange" :file-list="fileList">
      <slot></slot>
    </el-upload>
  </div>
</template>

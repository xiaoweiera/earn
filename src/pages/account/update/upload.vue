<script lang="ts" setup>
import { ElUpload } from "element-plus";
</script>

<template>
  <div>
    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :multiple="false" accept="image/*" :on-change="handleChange" :file-list="fileList">
      <span class="v-router text-global-darkblue text-14-18">上传头像</span>
    </el-upload>
  </div>
</template>

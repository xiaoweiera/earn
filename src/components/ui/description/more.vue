<script setup lang="ts">
/**
 * @file 更多内容
 * @auth svon.me@gmail.com
 */
import { ref } from "vue";
import { ElDialog } from "element-plus";

const visible = ref<boolean>(false);
</script>

<template>
  <div>
    <!--按钮-->
    <div @click="visible = true">
      <slot></slot>
    </div>
    <!--dialog 内容-->
    <el-dialog v-model="visible" :append-to-body="true">
      <div>
        <slot name="content"></slot>
      </div>
    </el-dialog>
  </div>
</template>

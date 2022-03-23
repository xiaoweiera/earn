<script setup lang="ts">
/**
 * @file 绑定邮箱
 * @auth svon.me@gmail.com
 */
import { ref } from "vue";
import { getEnv } from "src/config/";
import { ElDialog } from "element-plus";

const env = getEnv();

const visible = ref<boolean>(false);
</script>

<template>
  <div>
    <div @click="visible = true">
      <slot></slot>
    </div>
    <el-dialog v-model="visible" :append-to-body="true" custom-class="dialog-user-wrap">
      <div>
        <div class="text-center mb-6">
          <div class="inline-block w-37.5">
            <ui-image :src="`${env.VITE_oss}/nav/logoJpg.png`" fit="none" />
          </div>
        </div>
        <account-update-email />
      </div>
    </el-dialog>
  </div>
</template>

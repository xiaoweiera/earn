<script setup lang="ts">
/**
 * @file 用户地区判断
 * @auth svon.me@gmail.com
 */
import API from "src/api/";
import { ElDialog } from "element-plus";
import { ref, onMounted } from "vue";
import { getEnv } from "src/config/";

const env = getEnv();

const status = ref<boolean>(false);

onMounted(async function () {
  const api = new API();
  const value = await api.common.ipIsChina();
  if (value) {
    status.value = true;
  }
});
</script>

<template>
  <div v-if="status">
    <el-dialog v-model="status" custom-class="validate-dialog">
      <div class="p-6 mx-auto z-99999 md:w-100 md:h-90.5 tip">
        <img class="w-37.25 h-12 mt-2 mx-auto" :src="`${env.VITE_oss}/nav/logoJpg.png`" alt="" />
        <div class="text-kd14px20px font-medium text-global-highTitle mt-6 text-left">亲爱的用户:</div>
        <div class="text-kd14px20px text-global-highTitle text-opacity-85 mt-1.5 text-left">本网站不支持来自中国大陆地区的用户。访问前请确认您不是来自上述国家或地区。</div>
        <div class="text-kd14px20px font-medium text-global-highTitle mt-6 text-left">Dear User:</div>
        <div class="text-kd14px20px text-global-highTitle text-opacity-85 mt-1.5 text-left">This website does not support users from mainland China.Please confrm that you are not from the above countries or regions before visiting.</div>
        <div class="mt-6 hand mx-auto rounded-kd4px bg-global-primary flex justify-center items-center text-global-white font-medium text-kd14px18px w-44 h-8.5" @click="status = false">
          <span>Confirm</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

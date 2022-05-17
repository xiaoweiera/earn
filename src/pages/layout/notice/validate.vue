<script lang="ts" setup>
/**
 * @file 用户地区判断
 * @auth svon.me@gmail.com
 */
import API from "src/api/";
import I18n from "src/utils/i18n/";
import { onMounted, ref } from "vue";
import { Command, getEnv } from "src/config/";
import { ElDialog, ElButton } from "element-plus";

const env = getEnv();
const i18n = I18n();

const status = ref<boolean>(false);

onMounted(async function () {
  // 线上环境才启用
  if (env.command === Command.build) {
    const api = new API();
    const value = await api.common.ipIsChina();
    if (value) {
      status.value = true;
    }
  }
});
</script>

<template>
  <div>
    <div v-if="status">
      <el-dialog v-model="status" custom-class="validate-dialog">
        <div class="p-6 mx-auto z-99999 md:w-100 md:h-90.5 tip">
          <div class="w-37.25 mt-2 mx-auto">
            <ui-image src="/images/common/logo.svg" />
          </div>
          <div class="text-14-20 mt-6 text-global-highTitle">
            <p class="font-medium">{{ i18n.common.validate.title }}</p>
            <p class="text-14-20 text-global-highTitle text-opacity-85 mt-1.5">{{ i18n.common.validate.desc }}</p>
          </div>
          <client-only class="mt-6">
            <div class="w-44 mx-auto">
              <el-button class="w-full" type="primary" @click="status = false">
                <span class="font-medium text-14-18">{{ i18n.common.button.confirm }}</span>
              </el-button>
            </div>
          </client-only>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { env } from '~/lib/process'
import { onMounted, reactive, ref } from 'vue'
import {getDownUrl} from '~/api/common'
import { BlogDetail } from '~/logic/blog/interface';
import { forEach } from "src/utils"
import I18n from '~/utils/i18n/index'
import { isWechat, isAndroid, isIphone } from "src/utils/check/is";
import { ElMessage, ElMessageBox } from 'element-plus'

const detail = reactive<BlogDetail>({} as BlogDetail);

// 获取手机端下载地址
const onGetUrl = async function () {
  const result = await getDownUrl();
  if (result) {
    forEach( (value: any, key: string) => {
      // @ts-ignore
      detail[key] = value;
    }, result);
  }
}
onMounted(() => onGetUrl())

// 判断终端
const onClick = function (type:string, url:string) {
  console.log('1231231')
  if(isAndroid()) {
    if(type === 'ios'){
      ElMessage.warning('当前设备仅支持Android下载');
      return;
    }
    window.location.href = url;
  }else if(isIphone()) {
    if(type === 'android') {
      ElMessage.warning('当前设备仅支持ios下载');
      return;
    }
    window.location.href = url;
  }else if (isWechat()) {
    return false;
  }
}
</script>
<template>
  <div class="btn-content text-base">
    <DownloadHover :href="env.appDownload" :desc="I18n.menu.hover.app">
      <div class="download-btn ios-btn" @click="onClick('ios', detail.ios_url)">
        <IconFont type="icon-apple" class="text-white" size="24"/>
        App Store
      </div>
    </DownloadHover>
    <DownloadHover :href="env.appDownload" :desc="I18n.menu.hover.app">
      <div class="download-btn android-btn" @click="onClick('android', detail.android_url)">
        <IconFont type="icon-android" class="text-white" size="24"/>
        Android
      </div>
    </DownloadHover>
  </div>
</template>
<style lang="scss" scoped>
  .btn-content{
    @apply flex flex-row items-center text-white;
    .download-btn{
      @apply px-4 min-w-32.5 cursor-pointer;
    }
    .ios-btn {
      @apply  bg-gray-900 flex justify-between py-2 px-3 rounded;
    }
    .android-btn {
      @apply flex justify-between ml-6 py-2 px-5 rounded;
      background-color: #21c863;
    }
  }
</style>
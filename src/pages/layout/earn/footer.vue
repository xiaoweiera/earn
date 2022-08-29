<script setup>
import {ElInput} from 'element-plus';
import Hover from "./hover.vue";
import {ref} from 'vue';

const email = ref('')
</script>
<template>
  <div class="bg-global-hui10 pt-16 huawei-medium h-76 text-global-white px-15 flex items-start ">
    <div class="w-106 max-w-106 h-44 flex flex-col justify-between">
      <div>
        <ui-image class="w-36.97 h-6.5" src="./public/images/earn/logo2.png"/>
        <div class="mt-4 text-kd12px20px text-global-hui04">2022 UniEarn - All rights reserved</div>
      </div>
      <div class="email huawei-medium">
        <el-input v-model="email" placeholder="Please enter email" autocomplete="off" name="text" type="text"/>
        <div class="submit">subscribe</div>
      </div>
    </div>
    <div class="item">
      <div class="title">Links</div>
      <v-router href="" target="_blank" class="name">Followed</v-router>
      <v-router href="" target="_blank" class="name">CopyAccounts</v-router>
    </div>
    <div class="item">
      <div class="title">Company</div>
      <v-router href="" target="_blank" class="name">About us</v-router>
      <v-router href="" target="_blank" class="name">Terms of Use</v-router>
      <v-router href="" target="_blank" class="name">Legal</v-router>
    </div>
    <div class="item">
      <div class="title">Community</div>
      <v-router href="" target="_blank" class="name">Twitter</v-router>
      <v-router href="" target="_blank" class="name">Telegram</v-router>
      <v-router href="" target="_blank" class="name">Discord</v-router>
    </div>
    <div class="item">
      <div class="title">App</div>
      <Hover href="https://kingdata.com/download/" class="mt-4">
        <ui-image class="block w-25.5 h-9" fit="none" src="./public/images/earn/store.png"/>
      </Hover>
      <Hover href="https://kingdata.com/download/" class="mt-4">
        <ui-image class="block w-25.5 h-9" fit="none" src="./public/images/earn/android.png"/>
      </Hover>
    </div>

  </div>
</template>
<style lang="scss" scoped>
.title {
  @apply text-kd16px24px text-global-hui01;
}

.name {
  @apply text-kd14px22px text-global-hui02 mt-4 h-5.5 cursor-pointer;
}

.email {
  border-radius: 12px;
  @apply bg-global-hui09 h-14 flex items-center px-3 justify-between;
}

.item {
  @apply w-50 ml-6;
}

::v-deep(.el-input__inner) {
  font-family: huawei-medium;
  @apply h-6  w-50 bg-global-hui09 mr-4;
  border: 1px solid #ffffff00 !important;
}

.submit {
  @apply bg-global-lan04 cursor-pointer px-2.5 h-8 rounded-kd6px flex items-center text-kd14px22px;
}
</style>
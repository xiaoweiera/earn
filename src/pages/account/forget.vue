<script setup lang="ts">
/**
 * @file 邮箱密码找回
 * @author svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
const i18n = I18n();
</script>

<template>
  <div class="max-w-100 mx-auto px-5 py-10">
    <div class="mb-8 is-web">
      <h3 class="text-16-24 text-center text-global-darkblue">{{ i18n.common.resetPassword }}</h3>
    </div>
    <!-- 引用公共的密码找回功能 -->
    <client-only>
      <account-forget/>
    </client-only>
  </div>
</template>




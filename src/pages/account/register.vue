<script setup lang="ts">
/**
 * @file 邮箱注册账号
 * @author svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
const i18n = I18n();
</script>

<template>
  <div class="max-w-100 mx-auto px-5 py-10">
    <div class="mb-8 is-web">
      <h3 class="text-16-24 text-center text-global-darkblue">{{ i18n.common.switchRegister }}</h3>
    </div>
    <!-- 引用公共的邮箱注册功能 -->
    <client-only>
      <account-register/>
    </client-only>
  </div>
</template>




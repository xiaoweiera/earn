<script setup lang="ts">
/**
 * @file 修改邮箱
 * @author svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
const i18n = I18n();
</script>

<template>
  <div class="max-w-100 mx-auto px-5 py-10">
    <div class="mb-8 is-web">
      <h3 class="text-16-24 text-center text-global-darkblue">{{ i18n.common.emailUpdate }}</h3>
    </div>
    <!-- 引用公共的修改邮箱功能 -->
    <account-update-email />
  </div>
</template>

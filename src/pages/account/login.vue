<script setup lang="ts">
/**
 * @file 邮箱登录
 * @author svon.me@gmail.com
 */
import I18n from "src/utils/i18n";

import { createRef } from "src/utils/ssr/ref";

enum Type {
  email = "email",   // 邮箱登录
  mobile = "mobile", // 手机号登录
}
const i18n = I18n();
const type = createRef<Type>("query.type", Type.email); // 登录类型，默认邮件
</script>

<template>
  <div class="max-w-100 mx-auto px-5 py-10">
    <template v-if="type === Type.mobile">
      <div class="mb-8 is-web">
        <h3 class="text-16-24 text-center text-global-darkblue">{{ i18n.common.phone }}</h3>
      </div>
      <!-- 引用手机号登录功能 -->
      <account-login-mobile />
    </template>
    <template v-else>
      <div class="mb-8 is-web">
        <h3 class="text-16-24 text-center text-global-darkblue">{{ i18n.common.email }}</h3>
      </div>
      <!-- 引用邮箱登录功能 -->
      <account-login-email/>
    </template>
  </div>
</template>




<script setup lang="ts">
/**
 * @file 邮箱密码找回
 * @author svon.me@gmail.com
 */

import I18n from "src/utils/i18n";
import { createRef } from "src/utils/ssr/ref";
import { Type } from "src/types/common/user";

const i18n = I18n();
const type = createRef<Type>("query.type", Type.email); // 登录类型，默认邮件
const email = createRef<string>("query.email", "");
const mobile = createRef<string>("query.mobile", "");
const area = createRef<string>("query.area", "");
</script>

<template>
  <div class="max-w-100 mx-auto px-5 py-10">
    <div class="mb-8 is-web">
      <h3 class="text-16-24 text-center text-global-darkblue">{{ i18n.common.resetPassword }}</h3>
    </div>
    <!-- 引用公共的密码找回功能 -->
    <template v-if="type === Type.mobile">
      <account-forget-mobile :mobile="mobile" :area-code="area" />
    </template>
    <template v-else>
      <account-forget-email :email="email" />
    </template>
  </div>
</template>

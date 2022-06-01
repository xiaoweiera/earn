<script setup lang="ts">
import Form from "src/pages/account/webhook/form.vue";
import I18n from "src/utils/i18n";
import { ElPopover } from "element-plus";
const i18n = I18n();
</script>
<template>
  <div class="bg-global-bg-grey p-4">
    <div class="max-w-full w-150 mx-auto">
      <h3 class="text-14-18 text-global-black-title font-m">{{ i18n.user.hook.title }}</h3>
      <div class="p-4 rounded-md bg-white mt-3">
        <!--平台列表-->
        <div>
          <h5 class="text-12-16 text-global-black-title font-m">{{ i18n.user.hook.bindPlatform }}</h5>
          <div class="flex items-center mt-3">
            <label class="platform">
              <icon-font type="icon-telegram" size="32" />
            </label>
            <client-only>
              <el-popover placement="top" trigger="hover" :append-to-body="false">
                <div class="flex items-center text-kd12px18px px-2 py-1.5">{{ i18n.user.hook.support }}</div>
                <template #reference>
                  <label class="platform ml-3 disable">
                    <icon-font type="icon-discord2" size="32" />
                  </label>
                </template>
              </el-popover>
            </client-only>
            <client-only>
              <el-popover placement="top" trigger="hover" :append-to-body="false">
                <div class="flex items-center text-kd12px18px px-2 py-1.5">{{ i18n.user.hook.support }}</div>
                <template #reference>
                  <label class="platform ml-3 disable">
                    <icon-font type="icon-wechat" size="32" />
                  </label>
                </template>
              </el-popover>
            </client-only>
          </div>
          <div class="mt-12">
            <Form />
          </div>
          <div class="mt-12">
            <h5 class="text-12-16 text-global-black-title font-m">{{ i18n.user.hook.bind }}</h5>
            <div class="bg-global-bg-grey p-4 mt-3 text-12-20 text-global-black-desc">
              <p class="text-14-20 font-m">{{ i18n.user.hook.use }}</p>
              <p class="mt-1.5">{{ i18n.user.hook.useDec }}</p>
              <p class="text-14-20 font-m mt-4">{{ i18n.user.hook.create }}</p>
              <p class="mt-1.5">
                {{ i18n.user.hook.createDec }}
                <br />
                {{ i18n.user.hook.step }}
              </p>
              <span class="mt-1.5">
                <span class="flex items-center">
                  {{ i18n.user.hook.desc.desc1 }}
                  <v-router class="text-global-primary mr-1 hand" href="https://www.baidu.com" target="_blank">{{ i18n.user.hook.click }}</v-router>
                  {{ i18n.user.hook.desc.desc2 }}
                </span>
                {{ i18n.user.hook.desc.desc3 }}
                <br />
                {{ i18n.user.hook.desc.desc4 }}
                <br />
                {{ i18n.user.hook.desc.desc5 }}
                <br />
                {{ i18n.user.hook.desc.desc6 }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
::v-deep(.el-popover.el-popper) {
  min-width: fit-content !important;
  width: fit-content !important;
  padding: 0px 0px 0px 0px !important;
  border-radius: 6px;
  transform: translate(100%, 100%);
  height: 26px !important;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.platform {
  @apply text-global-darkblue;
  @apply w-14 h-14 flex items-center justify-center;
  @apply border border-solid border-global-darkblue border-opacity-24 rounded-md;
  &.disable {
    @apply text-global-highTitle text-opacity-25 cursor-default;
    @apply border-global-highTitle border-opacity-10;
  }
}
</style>

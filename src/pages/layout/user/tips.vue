<script setup lang="ts">
/**
 * @file 邮箱提示
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n/";
import type { PropType } from "vue";
import type { User } from "src/types/common/user";
import { ref, onMounted } from "vue";
import Cookie from "src/plugins/browser/cookie";
import { asyncLoad } from "src/plugins/lazyload/";

const Email = asyncLoad(() => import("./email.vue"));

const props = defineProps({
  user: {
    required: true,
    type: Object as PropType<User>,
  },
});

const i18n = I18n();

const cookie = new Cookie();

const emailTipsName = "em_tips_status";

const visible = ref<boolean>(false);

const onHiddenTips = function () {
  visible.value = false;
  // 设置过期时间
  const time = 1000 * 60 * 60 * 24;
  cookie.set(emailTipsName, "1", time);
};

onMounted(function () {
  if (props && props.user && !props.user.email) {
    const value = cookie.get(emailTipsName);
    if (value) {
      return true;
    }
    visible.value = true;
  }
});
</script>

<template>
  <div v-if="visible" class="tips-box transform -translate-x-6 translate-y-3">
    <div class="bg-white p-4 rounded-md flex items-center">
      <span class="text-14-18 text-global-highTitle">{{ i18n.common.account.email.tips }}</span>
      <div class="ml-1.5">
        <Email>
          <span class="cursor-pointer inline-block text-12-16 py-1 px-2 rounded-kd32px bg-global-darkblue text-white">{{ i18n.common.account.email.bind }}</span>
        </Email>
      </div>
      <div class="ml-4 flex cursor-pointer" @click="onHiddenTips">
        <IconFont type="icon-x" size="16" class="text-global-highTitle text-opacity-45" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tips-box {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.1);
}
</style>

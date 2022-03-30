<script lang="ts" setup>
/**
 * @file 锁
 * @auth svon.me@gmail.com
 */
import { onMounted, ref } from "vue";
import safeSet from "@fengqiaogang/safe-set";
import window from "src/plugins/browser/window";
import { createHref } from "src/plugins/router/pack";
import { User } from "src/types/common/user";
import { alias, createReactive } from "src/utils/ssr/ref";

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  text: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    required: true,
  },
});

const user = createReactive<User>(alias.common.user, {} as User);
const status = ref<boolean>(true);
const link = ref<string>();

onMounted(function () {
  if (user && user.id) {
    const url = window.location.href;
    const data = {
      suser: `${user.id}`,
    };
    if (props.type && props.id) {
      safeSet(data, "stype", props.type);
      safeSet(data, "sid", props.id);
    }
    link.value = createHref(url, data);
  }
});
</script>

<template>
  <client-only class="ui-lock">
    <div v-if="status" class="relative">
      <div class="virtual-shadow h-20 absolute left-0 right-0 bottom-full"></div>
      <div class="text-center">
        <div>
          <IconFont size="24" type="icon-lock" />
        </div>
        <p class="lock-tips mt-2">
          <span class="text-12-16 text-white tips-wrap">
            <span class="bg-global-gemstone inline-block px-3 py-1.5 rounded-global-kd30px">好空投一起撸，分享好友查看完整教程</span>
          </span>
        </p>
        <p class="mt-6 text-global-highTitle text-opacity-45">
          <span class="text-12-18">通过以下方式分享有效</span>
        </p>
        <v-login class="mt-3 text-global-darkblue flex justify-center items-center">
          <ui-share-twitter :key="link" :href="link" :text="text" class="circular">
            <IconFont size="16" type="icon-twitter" />
          </ui-share-twitter>
          <ui-share-telegram :key="link" :href="link" class="circular">
            <IconFont size="16" type="icon-telegram" />
          </ui-share-telegram>
          <v-copy class="circular cursor-pointer" :value="link">
            <IconFont size="16" type="icon-link" />
          </v-copy>
          <span class="ml-4 px-3 h-10 button-sync rounded-global-kd30px cursor-pointer">我已分享</span>
        </v-login>
        <div class="text-12-16 mt-6 text-global-highTitle text-opacity-85">
          <span>获得</span>
          <b class="mx-1.5 font-b text-16-18 text-global-gemstone">3</b>
          <span>名好友助力，即可解锁完整内容</span>
        </div>
        <div class="mt-3 text-global-gemstone user flex justify-center items-center">
          <i class="circular">
            <IconFont size="16" type="icon-user-plus" />
          </i>
          <i class="circular">
            <IconFont size="16" type="icon-user-plus" />
          </i>
          <i class="circular">
            <IconFont size="16" type="icon-user-plus" />
          </i>
        </div>
      </div>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </client-only>
</template>

<style lang="scss" scoped>
.virtual-shadow {
  @apply z-100;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.0716618) 0%, rgba(255, 255, 255, 0) 12.78%, #ffffff 100%);
}

.button-sync {
  @apply flex items-center justify-center;
  @apply border border-solid border-global-highTitle border-opacity-12;
}

.circular {
  @extend .button-sync;
  @apply w-10 h-10 rounded-1/2 overflow-hidden;
  & + .circular {
    @apply ml-4;
  }

  @at-root .user & {
    @apply bg-global-gemstone bg-opacity-6;
    @apply border-dashed border-global-gemstone;
  }
}

.lock-tips {
  @apply relative;
  &:before {
    content: "";
    @apply block absolute left-0 right-0 top-1/2 transform -translate-y-1/2;
    @apply border-t border-dashed border-global-highTitle border-opacity-10;
  }

  .tips-wrap {
    @apply relative z-1 px-3 bg-white inline-block;
  }
}
</style>

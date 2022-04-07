<script setup lang="ts">
import { computed, defineProps } from "vue";
import safeGet from "@fengqiaogang/safe-get";
import { timeago, dataToTimestamp } from "src/lib/tool";
import I18n from "src/utils/i18n";
const i18n = I18n();
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  // 是否换行
  timeWrap: {
    type: Boolean,
  },
});

interface User {
  nickname: string;
  is_official: string;
}

const userAvatar = computed(function () {
  if (props.data) {
    const url = safeGet<string>(props.data, "user.avatar_url");
    if (url) {
      return url;
    }
  }
  return "/assets/dapp/defaultLogo.png";
});

const user = computed<User>(function () {
  if (props.data) {
    const data = safeGet<User>(props.data, "user");
    if (data) {
      return data;
    }
  }
  return {} as User;
});
</script>

<template>
  <div class="comment-wrap">
    <div class="flex items-center">
      <IconFont rounded :type="userAvatar" size="36" />
      <div class="ml-1.5" :class="{ 'flex': timeWrap, 'items-center': timeWrap }">
        <div class="flex items-center" :class="{ 'mr-1': timeWrap }">
          <CommentUserInfo :user="user" />
          <div v-if="data.is_top" class="text-11 text-global-highTitle text-opacity-45 p-0.75 border-1 border-global-highTitle border-opacity-25 rounded-kd2px">
            <span>{{ i18n.comment.top }}</span>
          </div>
        </div>
        <template v-if="data.create_time">
          <p class="text-global-highTitle text-opacity-45 text-12-16">{{ timeago(dataToTimestamp(data.create_time)) }}</p>
        </template>
      </div>
    </div>
    <!--留言内容-->
    <div class="message-box text-15-22">
      <div class="whitespace-pre-line" v-html="data.content"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-wrap {
  a {
    @apply text-global-darkblue;
  }
  ::v-deep(a) {
    @apply text-global-darkblue;
  }
  .message-box {
    @apply mt-1.5;
    @apply text-global-highTitle text-opacity-85;
    @at-root .comment-news & {
      @apply mt-2;
      font-size: 12px;
      line-height: 16px;
    }
  }
}
</style>

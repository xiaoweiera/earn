<script setup lang="ts">
import { computed, ref } from "vue";
import { timeago, dataToTimestamp } from "src/lib/tool";
import safeGet from "@fengqiaogang/safe-get";
import API from "src/api";
import I18n from "src/utils/i18n";
import { alias, createReactive } from "src/utils/ssr/ref";
import { User } from "src/types/common/user";
const api = new API();
const i18n = I18n();
const userData = createReactive<User>(alias.common.user, {} as User);
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  messageUser: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["submit", "delete"]);
//回复是否打开
const message = ref(false);
//打开回复
const messageChange = () => (message.value = !message.value);
//回复
const submitBack = (info: object) => {
  message.value = false;
  //@ts-ignore
  emit("submit", info);
};
//点赞 取消赞
const likeChange = async (id: number) => {
  await api.comment.isLike(id);
  //@ts-ignore
  props.data.i_liked ? props.data.like_cnt-- : props.data.like_cnt++;
  //@ts-ignore
  props.data.i_liked = !props.data.i_liked;
};
//回复还是答复，回复不显示回复谁，答复显示答复谁，即：一级和二级的区别
const isReply = computed(() => !props?.data?.reply_target?.user || props?.data?.reply_target?.user?.id === props?.messageUser?.id);
const content = computed(() => {
  //@ts-ignore
  const name = `${isReply.value ? "" : props.data.reply_target ? props.data.reply_target.user.nickname : ""}:`;
  //@ts-ignore
  return `<span>${name}<span class='ml-1.5'>${props?.data?.content}</span></span>`;
});
const userAvatar = computed(function () {
  if (props.data) {
    const url = safeGet<string>(props.data, "user.avatar_url");
    if (url) {
      return url;
    }
  }
  return "/assets/dapp/defaultLogo.png";
});
//是否是自己发的，自己发的可以删除，否则可以回复
const isMy = computed(() => userData?.id === props?.data?.user?.id);
const deleteReplyFun = async (id: number) => {
  await api.comment.deleteReply(id);
  emit("delete", id);
};
</script>
<template>
  <div class="bg-global-topBg replyDiv hand">
    <div class="flex w-full">
      <IconFont rounded :type="userAvatar" size="36" />
      <div class="ml-1.5 w-full">
        <div class="flex items-center">
          <div class="text-global-numRed">
            <CommentUserInfo :user="data?.user" />
            <span v-if="!isReply" class="text-12-16 text-global-highTitle text-opacity-45 mr-1.5">{{ i18n.comment.reply }}</span>
            <span class="text-12-16 text-global-highTitle whitespace-pre-line text-opacity-85" v-html="content"></span>
          </div>
        </div>
        <div class="flex items-center justify-between mt-0.6 text-global-highTitle text-opacity-45">
          <p class="text-global-highTitle text-opacity-45 text-12-16">
            {{ timeago(dataToTimestamp(data.create_time)) }}
          </p>
          <v-login class="flex items-center">
            <UiDialogConfirmTip v-if="isMy && userData.id" custom-class="340px" type="confirm" :content="i18n.common.dialogData.deleteDes" @submit="deleteReplyFun(data.id)">
              <template #title>
                <span class="mr-3 tool text-12-16 text-global-numRed font-medium">{{ i18n.comment.delete }}</span>
              </template>
            </UiDialogConfirmTip>
            <span v-else class="mr-3 tool text-12-16 text-global-primary font-medium" @click="messageChange()">{{ message ? i18n.comment.close : i18n.comment.reply }}</span>
            <IconFont v-if="!data.i_liked" class="hand" type="icon-Default" size="16" @click="likeChange(data.id)" />
            <IconFont v-else class="text-global-numRed hand" type="icon-Select" size="16" @click="likeChange(data.id)" />
            <span class="ml-1 text-12-16 font-medium min-w-2.5">{{ data.like_cnt }}</span>
          </v-login>
        </div>
        <CommentChat v-show="message" :id="data.id" class="mt-1" :user-name="data?.user?.nickname" type="response" @submit="submitBack" />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.replyDiv {
  a {
    @apply text-global-darkblue;
  }
}
.tool {
  display: none;
}
.replyDiv:hover {
  .tool {
    display: block;
  }
}
</style>

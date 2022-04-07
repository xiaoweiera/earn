<script setup lang="ts">
import { ref, defineProps, onMounted, defineEmits, watch } from "vue";
import API from "src/api";
const api = new API();
import I18n from "src/utils/i18n";
const i18n = I18n();
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["delete"]);
const key = ref(0);
//列表
const list = ref<any>([]);
//是否显示回复
const isShowReply = ref(true);
//回复是否打开
const message = ref(false);
//加载状态
const loading = ref(false);
//点赞 取消赞
const likeChange = async (id: number) => {
  await api.comment.isLike(id);
  //@ts-ignore
  props.data.i_liked ? props.data.like_cnt-- : props.data.like_cnt++;
  //@ts-ignore
  props.data.i_liked = !props.data.i_liked;
};
//打开回复
const messageChange = () => (message.value = !message.value);
//删除的时候触发
watch(
  () => props.data,
  () => (list.value = props?.data?.replies),
);
//回复列表
const getReplyData = async () => {
  list.value = props?.data?.replies;
};
//回复展开和折叠
const showReply = () => (isShowReply.value = !isShowReply.value);
//回复
const submitBack = (info: object) => {
  message.value = false;
  //@ts-ignore
  props.data.reply_cnt++;
  list.value.push(info);
  key.value++;
};
const deleteReply = (id: number) => emit("delete", id);
//二次回复
const response = (info: any) => {
  //@ts-ignore
  props.data.reply_cnt++;
  list.value.push(info);
  key.value++;
};
onMounted(() => getReplyData());
</script>
<template>
  <div class="bg-global-white messageDiv">
    <!-- 用户 & 评论内容 -->
    <CommentContent :data="data" />
    <div>
      <CommentChat v-show="message" :id="data.id" class="mt-1.5" :user-name="data?.user?.nickname" type="reply" @submit="submitBack" />
    </div>
    <div class="flex items-center text-global-highTitle text-opacity-45 mt-1.5">
      <v-login class="mr-3 flex items-center">
        <IconFont v-if="!data.i_liked" class="hand" type="icon-Default" size="16" @click="likeChange(data.id)" />
        <IconFont v-else class="text-global-numRed hand" type="icon-Select" size="16" @click="likeChange(data.id)" />
        <span class="ml-1 text-12-16 font-medium min-w-2.5">{{ data.like_cnt }}</span>
      </v-login>
      <v-login class="mr-3 mt-0.5">
        <div class="flex items-center" @click="messageChange()">
          <IconFont class="text-global-highTitle text-opacity-45 hand" type="icon-pinglun" size="16" />
          <span class="ml-1 text-12-16 font-medium min-w-2.5">{{ data.reply_cnt }}</span>
        </div>
      </v-login>
    </div>
    <div v-if="isShowReply && list?.length > 0" class="bg-global-topBg my-4 rounded-kd6px pb-4">
      <template v-for="(itemTwo, i) in list" :key="i">
        <CommentReply v-if="isShowReply" :id="itemTwo.id" :key="key" :message-user="data?.user" :data="itemTwo" class="pt-4 px-4 rounded-kd6px" @delete="deleteReply" @submit="response" />
      </template>
    </div>
    <!--      展开更多-->
    <div v-if="list?.length > 0" class="mx-auto w-fit flex items-center justify-center hand text-center text-13 text-global-darkblue" @click="showReply()">
      <div class="mr-2">{{ isShowReply ? i18n.comment.close : i18n.comment.more }}</div>
      <IconFont v-if="!isShowReply" size="12" type="icon-arrow-down" />
    </div>
    <UiLoading v-if="loading" class="fixed left-0 right-0 top-0 bottom-0" />
  </div>
</template>
<style lang="scss" scoped>
.messageDiv {
  a {
    @apply text-global-darkblue;
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import API from "src/api";
const api = new API();
import I18n from "src/utils/i18n";
import safeGet from "@fengqiaogang/safe-get";
const i18n = I18n();
import { ElMessage, ElInput } from "element-plus";
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["submit"]);

interface Model {
  mix: number;
  max: number;
  placeholder: string;
  button: string;
}

//页面展示信息 根据props type展示
const models = computed<Model>((): Model => {
  const isPublish = props.type === "publish";
  return {
    mix: isPublish ? 15 : 5,
    max: isPublish ? 1000 : 200,
    placeholder: isPublish ? `${i18n.comment.inputTip}` : "",
    button: isPublish ? i18n.comment.push : i18n.comment.reply,
  };
});
//输入框值
const v = ref("");

//输入框父元素
const contentDom = ref(null);
//输入框
const inputText = ref(null);
//输入框内容
const strLength = computed(() => v.value.length);
//输入框字数样式
const lengthColor = computed(() => {
  return strLength.value > models.value.max ? "text-global-numRed" : "text-global-highTitle text-opacity-45";
});
//背景颜色
const bgColor = () => (props.type === "publish" ? props.type : props.type);
//发布按钮状态
const submitState = computed(() => (strLength.value < models.value.mix || strLength.value > models.value.max ? "submitNo" : "submitOk"));
//发布
const publish = async () => {
  const param = {
    project_id: props.id,
    content: v.value,
    uploads: [],
  };
  //@ts-ignore
  return await api.comment.pushComment(param);
};
//回复
const reply = async () => {
  const param = {
    target_id: props.id,
    content: v.value,
    uploads: [],
  };
  //@ts-ignore
  return await api.comment.replyComment(param);
};
//选择表情回调
const selectEmoji = (insertTxt: string) => {
  const textareaDiv: any = contentDom.value;
  const elInput = textareaDiv.querySelector(".el-textarea__inner");
  if (insertTxt === "") {
    elInput.focus();
    return;
  }
  let startPos = elInput.selectionStart;
  let endPos = elInput.selectionEnd;
  if (startPos === undefined || endPos === undefined) return;
  let result = elInput.value.substring(0, startPos) + insertTxt + elInput.value.substring(endPos);
  elInput.value = result;
  elInput.focus();
  elInput.selectionStart = startPos + insertTxt.length;
  elInput.selectionEnd = startPos + insertTxt.length;
  v.value = result;
};

//提交
const submit = async () => {
  let res: any;
  if (strLength.value < models.value.mix || strLength.value > models.value.max) return;
  if (props.type === "publish") {
    res = await publish();
  } else {
    res = await reply();
  }
  const code = safeGet(res, "code");
  if (code && code === 429) {
    ElMessage.warning({
      message: safeGet(res, "message"),
      type: "warning",
    });
  } else {
    v.value = "";
    emit("submit", res);
  }
};
</script>
<template>
  <div class="w-full h-full">
    <div :class="bgColor()" class="flex flex-col w-full relative py-4 rounded-kd6px showY" @click.stop="selectEmoji('')">
      <div class="flex-1 flex flex-col">
        <div v-if="type !== 'publish'" class="text-kd12px16px px-4 hand text-global-highTitle text-opacity-45 mb-1.5">{{ i18n.comment.reply }}@{{ userName }}</div>
        <div ref="contentDom" class="px-4 flex-1">
          <el-input ref="inputText" v-model="v" type="textarea" :placeholder="models.placeholder" />
        </div>
      </div>
      <div class="bottom-4 h-8 w-full px-4">
        <div class="w-full flex items-center justify-between">
          <div class="flex items-center">
            <v-login :class="`${submitState}`" class="w-fit text-kd12px16px hand" @click.stop="submit()">{{ models.button }}</v-login>
            <CommentEmoji @select="selectEmoji" />
          </div>
          <div class="text-kd14px16px text-global-highTitle text-opacity-45">
            <template v-if="v.length < models.mix">
              <span class="mr-1 text-global-numRed">{{ i18n.template(i18n.comment.warning.min, { count: models.mix }) }}</span>
            </template>
            <template v-else-if="v.length > models.max">
              <span class="mr-1 text-global-numRed">{{ i18n.template(i18n.comment.warning.max, { count: models.max }) }}</span>
            </template>
            <span :class="lengthColor">{{ v.length }}</span>
            /{{ models.max }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.publish {
  background: #fafbfc;
  border: 1px solid rgba(3, 54, 102, 0.06);
  @apply h-full;
  ::v-deep(.el-textarea) {
    border: 1px solid #fafbfc !important;
    @apply h-full;
  }
  ::v-deep(.el-textarea__inner) {
    background: #fafbfc;
    border: 1px solid #fafbfc !important;
    font-family: auto !important;
    padding-right: 10px !important;
    @apply px-4 p-0 h-full text-global-hightTitle text-opacity-45;
  }
}
.reply {
  background: #fafbfc;
  border: 1px solid rgba(3, 54, 102, 0.06);
  ::v-deep(.el-textarea__inner) {
    background: #fafbfc;
    border: 1px solid #fafbfc !important;
    font-family: auto !important;
    padding-right: 10px !important;
    @apply h-13 px-4 p-0 text-global-hightTitle text-opacity-45;
  }
}
.response {
  @apply bg-global-white;
  border: 1px solid rgba(3, 54, 102, 0.06);
  ::v-deep(.el-textarea__inner) {
    border: 1px solid white !important;
    font-family: auto !important;
    padding-right: 10px !important;
    @apply h-13 px-4 p-0 text-global-hightTitle bg-global-white text-opacity-45;
  }
}
::v-deep(textarea) {
  outline: none !important;
  border: none !important;
  box-shadow: none;
}
::v-deep(.el-textarea, .el-input--default) {
  --el-input-hover-border-color: none !important;
  --el-input-focus-border-color: none !important;
  --el-input-focus-border: none !important;
}
::v-deep(textarea::placeholder) {
  @apply text-global-highTitle text-opacity-45;
}
::v-deep(.el-textarea__inner) {
  border: none !important;
  box-shadow: none;
  resize: none;
}

.submitNo {
  @apply w-13 h-8 flex items-center justify-center  text-global-highTitle font-medium text-opacity-45 bg-global-highTitle bg-opacity-6  rounded-kd4px;
}

.submitOk {
  @apply w-13 h-6 flex items-center justify-center  text-global-white font-medium  bg-global-darkblue   rounded-kd4px;
}
::v-deep(.el-input__inner) {
  border: none !important;
  box-shadow: none;
}
</style>

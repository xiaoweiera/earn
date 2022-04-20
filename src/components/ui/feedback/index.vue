<script setup lang="ts">
import { computed, ref } from "vue";
import { ElInput, ElRadio, ElRadioGroup, ElButton } from "element-plus";
import safeGet from "@fengqiaogang/safe-get";
import API from "src/api";
import { messageSuccess } from "src/lib/tool";
import I18n from "src/utils/i18n";
const i18n = I18n();
const api = new API();
const emitEvent = defineEmits(["cancel"]);

const radios = [
  {
    value: "功能需求",
    label: i18n.feedback.issues.a,
  },
  {
    value: "问题反馈",
    label: i18n.feedback.issues.b,
  },
  {
    value: "其它",
    label: i18n.feedback.issues.c,
  },
];

const radio = ref<string>(safeGet<string>(radios, "[0].value"));
const textarea = ref<string>("");
const contact = ref<string>("");

const discord = computed(() => "https://discord.com/invite/DnrS3B5hGs?utm_source=https%3A%2F%2Fkingdata.com&lang=cn");

// 关闭
const onCancel = function () {
  emitEvent("cancel");
};

const onSubmit = async function () {
  const data = {
    metrics_type: radio.value, // 反馈类型
    content: textarea.value, // 反馈意见内容
    wechat: contact.value ? contact.value : "无", // 联系方式
  };
  // 向后台留言
  await api.comment.suggest(data);
  messageSuccess(i18n.feedback.message);
  // 关闭意见反馈框
  emitEvent("cancel");
};
</script>
<template>
  <client-only>
    <div class="p-4 feedback">
      <div class="text-global-highTitle text-opacity-85">
        <h3 class="text-16-24 font-m">{{ i18n.feedback.title }}</h3>
        <label class="block text-14-18 mt-4">{{ i18n.feedback.issueType }}</label>
      </div>
      <div class="pt-3">
        <el-radio-group v-model="radio">
          <template v-for="(item, index) in radios" :key="index">
            <el-radio :label="item.value">
              <span class="text-14-18 font-m">{{ item.label }}</span>
            </el-radio>
          </template>
        </el-radio-group>
      </div>
      <div class="comment">
        <el-input v-model="textarea" :maxlength="200" :rows="8" :show-word-limit="true" type="textarea" :placeholder="i18n.feedback.placeholder" />
      </div>
      <div class="mt-4">
        <div class="text-global-highTitle text-opacity-85">
          <label class="block text-14-18">{{ i18n.feedback.contact }}</label>
        </div>
        <div class="mt-3">
          <el-input v-model="contact" type="text" placeholder="" />
        </div>
      </div>
      <div class="mt-4">
        <div class="text-12-18">
          <label class="text-global-highTitle text-opacity-85">{{ i18n.feedback.customer.service }}</label>
          <span class="text-global-highTitle text-opacity-45">{{ i18n.feedback.customer.time }}</span>
        </div>
        <div class="mt-2">
          <v-router class="inline-flex items-center" :href="discord" target="_blank">
            <IconFont type="discord" bright />
            <span class="ml-1 text-global-darkblue">Discord</span>
          </v-router>
        </div>
      </div>
      <div class="mt-4 flex items-center">
        <div class="flex-1">
          <el-button class="w-full" round @click="onCancel">
            <span>{{ i18n.common.button.close }}</span>
          </el-button>
        </div>
        <div class="ml-4 flex-1">
          <el-button class="w-full feed-submit" round :disabled="textarea.length === 0" @click="onSubmit">
            <span>{{ i18n.common.button.submit }}</span>
          </el-button>
        </div>
      </div>
    </div>
  </client-only>
</template>

<style scoped lang="scss">
.feedback {
  @apply bg-white;
  @apply rounded;
  @apply border border-solid border-black border-opacity-4;
  box-shadow: 0 1px 2px rgba(black, 0.1), 0 4px 18px rgba(black, 0.04), inset 0 4px 0 theme("colors.global.darkblue");

  ::v-deep(.el-radio) {
    @apply inline-flex mb-3;
    .el-radio__label {
      @apply pl-0;
      @apply py-1.5 px-5;
      @apply border border-solid border-global-highTitle border-opacity-10;
      border-radius: 20px;
      transition: 0.3s;
    }
    .el-radio__input {
      @apply hidden;
      &.is-checked {
        & + .el-radio__label {
          @apply text-global-darkblue;
          @apply border-global-darkblue;
        }
      }
    }
  }

  .comment {
    ::v-deep(textarea) {
      resize: none;
    }
  }
  .el-button {
    transition: all 0.3s;
    &.is-disabled {
      @apply bg-global-highTitle bg-opacity-6;
    }
    &.feed-submit {
      &:not(.is-disabled) {
        @apply bg-global-darkblue text-white;
      }
    }
  }
}
</style>

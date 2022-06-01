<script lang="ts" setup>
import { ElInput, ElSelect, ElOption } from "element-plus";
import api from "src/api/user";
import safeGet from "@fengqiaogang/safe-get";
import { ref, onMounted } from "vue";
// import I18n from "src/utils/i18n";
// const i18n = I18n();
const API = new api();

const isLoad = ref(true); //是否加载中
const list = ref([]); //webhook列表
const isErr = ref(false); //是否报错
const token = ref(""); //token输入框
const lang = ref("en"); //语言
const langList = [
  { key: "cn", name: "CN Push" },
  { key: "en", name: "EN Push" },
];
//查询列表
const getList = async () => {
  const res = await API.getInfo();
  list.value = safeGet(res, "web_hook.telegram");
  isLoad.value = false;
};
//添加
const addToken = async () => {
  if (isLoad.value) return;
  if (!token.value.trim()) {
    isErr.value = true;
    return;
  }
  isErr.value = false;
  const param = {
    token: JSON.stringify([
      {
        hook_name: "telegram",
        language: lang.value,
        token: token.value,
      },
    ]),
  };
  isLoad.value = true;
  await API.addWebhook(param);
  token.value = "";
  getList();
};
//删除
const deleteToken = async (token: string) => {
  if (isLoad.value) return;
  isLoad.value = true;
  const param = { token: JSON.stringify([token]) };
  await API.delWebhook(param);
  getList();
};
onMounted(() => {
  getList();
});
</script>
<template>
  <div>
    <div class="flex items-center title">
      <p>Telegram token</p>
      <p class="red ml-1.5">*</p>
    </div>
    <!--form-->
    <div class="mt-1.5 flex items-center h-8">
      <el-input v-model="token" class="flex-1 mr-3" placeholder="Search" />
      <client-only class="flex w-24 mr-3 items-center justify-between">
        <el-select v-model="lang" :popper-append-to-body="false" class="flex-1 select" size="small">
          <el-option v-for="item in langList" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </client-only>
      <div class="add" @click="addToken">add</div>
    </div>
    <div v-if="isErr" class="err-text red">请填写Token后添加</div>
    <!--list-->
    <div class="mt-12">
      <p>Message Hook List</p>
      <div class="mt-3">
        <!-- header-->
        <div class="header font-medium">
          <div class="default platform">平台</div>
          <div class="default token">Token</div>
          <div class="default">Language</div>
          <div class="default">Operation</div>
        </div>
        <!-- item-->
        <template v-for="item in list" :key="item['token']">
          <div class="item">
            <div class="default platform">Telegram</div>
            <div class="default token">
              <div class="short">{{ item["token"] }}</div>
            </div>
            <div class="default">{{ item["language"] }}</div>
            <UiDialogConfirmTip v-if="true" custom-class="340px" type="confirm" content="确定要删除该绑定链接吗？" @submit="deleteToken(item['token'])">
              <template #title>
                <span class="default del">Delete</span>
              </template>
            </UiDialogConfirmTip>
          </div>
        </template>
      </div>
      <div v-if="list.length === 0 && !isLoad" class="text-center mt-9 flex flex-col items-center">
        <ui-image class="w-34.1 h-30" fit="contain" :oss="true" src="/common/hookNull.png" />
        <div class="mt-4 text-kd12px16px text-global-highTitle text-opacity-45 font-kdFang text-center">暂无信息</div>
      </div>
    </div>
    <UiLoading v-if="isLoad" class="fixed top-0 bottom-0 left-0 right-0" />
  </div>
</template>
<style lang="scss" scoped>
.red {
  color: #dd4415;
}

.err-text {
  @apply mt-1.5 text-kd13px18px font-kdFang;
}

.header {
  border-bottom: 1px solid rgba(3, 54, 102, 0.1);
  @apply h-8 w-full flex items-center;
}

.item {
  @apply mt-3 flex h-3 w-ful items-center;
  @apply text-kd12px16px font-kdFang font-global-black-desc;
}

.default {
  @apply h-full w-17.5 text-kd12px16px font-kdFang text-global-black-desc;
  @apply flex items-center justify-center;
}

.platform {
  @apply flex justify-start;
}

.token {
  @apply flex-1 flex justify-start;
}

.del {
  color: #dd4415;
  @apply cursor-pointer;
}

.title {
  @apply text-kd13px18px text-global-black-desc font-kdFang;
}

.list-Title {
  @apply text-global-black-title text-kd12px16px font-medium font-kdFang;
}

.add {
  @apply flex justify-center items-center rounded-kd4px;
  @apply w-12.75 h-8 px-3 h-ful bg-global-primary;
  @apply text-global-white font-medium text-kd14px18px font-kdFang cursor-pointer;
}

::v-deep(.el-input__inner) {
  background: #fbfbfb;
  border: 1px solid rgba(3, 54, 102, 0.06);
  border-radius: 4px;
  height: 34px !important;
  padding-left: 8px !important;
  border-radius: 4px !important;
  @apply text-kd14px18px  text-left  text-global-highTitle  flex items-center  text-kd14px18px;
}
</style>

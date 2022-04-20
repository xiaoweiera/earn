<script lang="ts" setup>
/**
 * @file 新用户注册
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import { getEnv } from "src/config/";
import { reactive, ref } from "vue";
import { getUA } from "src/plugins/browser/ua";
import { ValidateType } from "src/components/ui/validate/config";
import { ElButton, ElForm, ElFormItem, ElInput, ElDialog } from "element-plus";

defineProps({
  id: {
    type: [String, Number],
    default: "",
  },
});

const i18n = I18n();
const failStatus = ref<boolean>(false);
const successStatus = ref<boolean>(false);
const warnStatus = ref<boolean>(false);
const rules = reactive<object>({});
const formData = reactive<object>({});

const getDownloadUrl = function (id: string | number = 0) {
  const env = getEnv();
  const ua = getUA();
  let type = "web";

  if (ua.isAndroid) {
    type = "android";
  }
  if (ua.isiPhone || ua.isiPad || ua.isiPod) {
    type = "ios";
  }

  const query = {
    utm_source: `activity_${id}_${type}`,
  };
  return {
    query,
    path: env.appDownload,
  };
};

const emailValidate = function () {
  // todo
};

const onSeadCode = function () {
  // todo
};

const submit = function () {
  // todo
};
</script>

<template>
  <div>
    <el-form ref="domForm" :model="formData" :rules="rules" autocomplete="off" label-position="top" size="large" @submit.stop.prevent="submit">
      <!-- 邮箱地址 -->
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" :placeholder="i18n.common.placeholder.email" autocomplete="off" type="email" />
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item label="验证码" prop="code">
        <el-input v-model="formData.code" :placeholder="i18n.common.placeholder.verification" autocomplete="off">
          <template #append>
            <ui-validate :before="emailValidate" :query="{ email: formData.email }" :type="ValidateType.create" @click="onSeadCode" />
          </template>
        </el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item label="设置密码" prop="password">
        <el-input v-model="formData.password" :placeholder="i18n.common.placeholder.password" autocomplete="new-password" show-password type="password" />
      </el-form-item>

      <div>
        <div class="w-60 mx-auto">
          <el-button class="w-full" type="primary" @click="successStatus = true">
            <span>领取 7 天 VIP Pro</span>
          </el-button>
        </div>
      </div>
    </el-form>

    <el-dialog v-model="failStatus" custom-class="no-header" :append-to-body="true" :destroy-on-close="true" width="340px">
      <div class="text-center">
        <div class="w-30 mx-auto">
          <ui-image :oss="true" fit="none" src="/static/images/activity/fail.jpg" />
        </div>
        <div class="py-4">
          <p class="text-14-24 text-global-highTitle">
            非常抱歉，您不满足领取条件
            <br />
            加入社区了解更多活动信息
          </p>
        </div>
        <div class="w-30 mx-auto">
          <el-button class="w-full" type="primary" @click="failStatus = false">
            <span>我知道了</span>
          </el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog v-model="successStatus" custom-class="no-header" :append-to-body="true" :destroy-on-close="true" width="340px">
      <div class="text-center">
        <div class="w-30 mx-auto">
          <ui-image :oss="true" fit="none" src="/static/images/activity/success.jpg" />
        </div>
        <div class="py-4">
          <p class="text-14-24 text-global-highTitle">
            您已成功领取 7天 VIP Pro
            <br />
            请下载 KingData APP 查看并使用
          </p>
        </div>
        <div class="w-30 mx-auto">
          <v-router :href="getDownloadUrl(id)" class="block" target="_blank">
            <el-button class="w-full" type="primary" @click="successStatus = false">
              <span>下载 App</span>
            </el-button>
          </v-router>
        </div>
      </div>
    </el-dialog>

    <el-dialog v-model="warnStatus" custom-class="no-header" :append-to-body="true" :destroy-on-close="true" width="340px">
      <div class="text-center">
        <div class="w-30 mx-auto">
          <ui-image :oss="true" fit="none" src="/static/images/activity/warn.jpg" />
        </div>
        <div class="py-4">
          <p class="text-14-24 text-global-highTitle">
            您已成功领取过该空投
            <br />
            请勿重复操作
          </p>
        </div>
        <div class="w-30 mx-auto">
          <el-button class="w-full" type="primary" @click="warnStatus = false">
            <span>我知道了</span>
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

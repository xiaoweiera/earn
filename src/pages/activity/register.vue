<script lang="ts" setup>
/**
 * @file 新用户注册
 * @auth svon.me@gmail.com
 */

import API from "src/api/";
import { messageError } from "src/lib/tool";
import safeGet from "@fengqiaogang/safe-get";
import I18n from "src/utils/i18n";
import { getEnv } from "src/config/";
import type { PropType } from "vue";
import type { Invite } from "src/types/common/activity";
import { ActivityStatus } from "src/types/common/activity";
import { ref, computed } from "vue";
import { toInteger } from "src/utils/";
import { getUA } from "src/plugins/browser/ua";
import * as Common from "src/logic/account/register";
import { ValidateType } from "src/components/ui/validate/config";
import { ElButton, ElForm, ElFormItem, ElInput, ElDialog } from "element-plus";
import { isAfter } from "src/utils/";

const props = defineProps({
  detail: {
    required: true,
    type: Object as PropType<Invite>,
  },
});

const i18n = computed(function () {
  return I18n(props.detail?.language);
});

const isNew = ref<boolean>(true);
const domForm = ref<any>(null);
const failStatus = ref<boolean>(false);
const successStatus = ref<boolean>(false);
const warnStatus = ref<boolean>(false);
// 校验规则
const rules = computed(function () {
  return Common.rules(props.detail?.language);
});
// 初始化表单数据
const formData = Common.createFormData();

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
  if (props.detail.status === ActivityStatus.ONGOING) {
    return Common.checkValidateEmail(domForm);
  }
  return Promise.reject(false);
};

const onSeadCode = function (data: object) {
  // 保存人机校验得到的值
  formData.token = safeGet<string>(data, "token") || "";
  // 判断是否是老用户
  const status = safeGet<boolean>(data, "is_email_used");
  if (status) {
    isNew.value = false;
  }
};

const submit = async function () {
  try {
    // 校验表单数据是否合法
    await Common.checkValidate(domForm);
  } catch (e) {
    return false;
  }
  const data = {
    id: props.detail.id,
    email: formData.email,
    code: formData.code,
    password: isNew.value ? formData.password : null,
  };
  const api = new API();
  try {
    await api.user.registerInviteEmail(data);
    // 成功
    successStatus.value = true;
  } catch (e: any) {
    // 异常情况
    const code = safeGet<number | string>(e, "code");
    // 不满足领取条件
    if (code && toInteger(code) === 2) {
      Common.resetFields(domForm);
      failStatus.value = true;
      return;
    }
    // 重复领取
    if (code && toInteger(code) === 3) {
      Common.resetFields(domForm);
      warnStatus.value = true;
      return;
    }

    // 其它失败
    const message = safeGet<string>(e, "message");
    if (message) {
      messageError(message);
    } else {
      const i18n = I18n(props.detail?.language);
      messageError(i18n.apply.tips.error);
    }
  }
};
</script>

<template>
  <div>
    <el-form ref="domForm" :disabled="detail.status !== ActivityStatus.ONGOING" :model="formData" :rules="rules" autocomplete="off" label-position="top" size="large" @submit.stop.prevent="submit">
      <!-- 邮箱地址 -->
      <el-form-item :label="i18n.activity.label.email" prop="email">
        <el-input v-model="formData.email" :placeholder="i18n.common.placeholder.email" autocomplete="off" type="email" />
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item :label="i18n.activity.label.code" prop="code">
        <el-input v-model="formData.code" :placeholder="i18n.common.placeholder.verification" autocomplete="off">
          <template #append>
            <ui-validate :language="detail.language" :before="emailValidate" :query="{ email: formData.email }" :type="ValidateType.invite" @click="onSeadCode" />
          </template>
        </el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item v-if="isNew" :label="i18n.activity.label.password" prop="password">
        <el-input v-model="formData.password" :placeholder="i18n.common.placeholder.password" autocomplete="new-password" show-password type="password" />
      </el-form-item>
      <!--状态判断-->
      <el-form-item v-if="detail.status === ActivityStatus.ONGOING" style="margin-bottom: 0">
        <!--进行中-->
        <client-only class="w-60 mx-auto">
          <el-button class="w-full" type="primary" native-type="submit">
            <span>{{ detail.receive_text || i18n.common.button.submit }}</span>
          </el-button>
        </client-only>
      </el-form-item>
      <client-only v-else-if="detail.status === ActivityStatus.UPCOMING">
        <!--未开始-->
        <div>
          <p class="text-center">
            <span class="text-12-16 text-global-highTitle text-opacity-85">{{ i18n.activity.label.startSoon }}</span>
          </p>
          <div class="mt-3 text-center">
            <div class="inline-block">
              <ui-time-countdown :lang="detail.language" :value="detail.begin_time" />
            </div>
          </div>
        </div>
      </client-only>
      <client-only v-else-if="isAfter(detail.end_time)">
        <!--奖励发完-->
        <div>
          <p class="text-center">
            <span class="text-14-18 text-global-darkblue text-opacity-85">{{ i18n.activity.label.finishSoon }}</span>
          </p>
          <div class="mt-3 cursor-not-allowed w-60 mx-auto">
            <div class="bg-global-highTitle bg-opacity-6 h-11 flex items-center justify-center rounded-md">
              <span class="text-global-highTitle text-opacity-45 font-m">{{ i18n.activity.label.end }}</span>
            </div>
          </div>
        </div>
      </client-only>
      <client-only v-else>
        <!--已结束-->
        <div>
          <p class="text-center">
            <span class="text-14-18 text-global-darkblue text-opacity-85">{{ i18n.activity.label.endSoon }}</span>
          </p>
          <div class="mt-3 cursor-not-allowed w-60 mx-auto">
            <div class="bg-global-highTitle bg-opacity-6 h-11 flex items-center justify-center rounded-md">
              <span class="text-global-highTitle text-opacity-45 font-m">{{ i18n.activity.label.end }}</span>
            </div>
          </div>
        </div>
      </client-only>
    </el-form>

    <el-dialog v-model="failStatus" custom-class="no-header" :append-to-body="true" width="340px">
      <div class="text-center">
        <div class="w-30 mx-auto">
          <ui-image class="h-30" :oss="true" fit="none" src="/static/images/activity/fail.jpg" />
        </div>
        <div class="py-4">
          <p class="text-14-24 text-global-highTitle whitespace-pre-wrap">{{ i18n.activity.tips.fail }}</p>
        </div>
        <div class="w-30 mx-auto">
          <el-button class="w-full" type="primary" @click="failStatus = false">
            <span>{{ i18n.activity.label.ok }}</span>
          </el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog v-model="successStatus" custom-class="no-header" :append-to-body="true" :destroy-on-close="true" width="340px">
      <div class="text-center">
        <div class="w-30 mx-auto">
          <ui-image class="h-30" :oss="true" fit="none" src="/static/images/activity/success.jpg" />
        </div>
        <div class="py-4">
          <div class="text-14-24 text-global-highTitle">
            <div class="rich-text" v-html="detail.success_text"></div>
          </div>
        </div>
        <div class="w-30 mx-auto">
          <v-router :href="getDownloadUrl(detail.id)" class="block" target="_blank">
            <el-button class="w-full" type="primary" @click="successStatus = false">
              <span>{{ i18n.common.nav.download2 }}</span>
            </el-button>
          </v-router>
        </div>
      </div>
    </el-dialog>

    <el-dialog v-model="warnStatus" custom-class="no-header" :append-to-body="true" width="340px">
      <div class="text-center">
        <div class="w-30 mx-auto">
          <ui-image class="h-30" :oss="true" fit="none" src="/static/images/activity/warn.jpg" />
        </div>
        <div class="py-4">
          <p class="text-14-24 text-global-highTitle whitespace-pre-wrap">{{ i18n.activity.tips.warn }}</p>
        </div>
        <div class="w-30 mx-auto">
          <el-button class="w-full" type="primary" @click="warnStatus = false">
            <span>{{ i18n.activity.label.ok }}</span>
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

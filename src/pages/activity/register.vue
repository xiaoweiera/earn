<script lang="ts" setup>
/**
 * @file 新用户注册
 * @auth svon.me@gmail.com
 */

import API from "src/api/";
import * as track from "src/logic/track";
import { messageError } from "src/lib/tool";
import safeGet from "@fengqiaogang/safe-get";
import I18n from "src/utils/i18n";
import type { PropType } from "vue";
import type { Invite } from "src/types/common/activity";
import { ActivityStatus } from "src/types/common/activity";
import { ref, computed } from "vue";
import { toInteger, toBoolean } from "src/utils/";
import * as Common from "src/logic/account/register";
import { ValidateType } from "src/components/ui/validate/config";
import { ElButton, ElForm, ElFormItem, ElInput, ElDialog } from "element-plus";
import { isAfter } from "src/utils/";

// 活动时间已到
import TipsEnded from "./tips/ended.vue";
// 活动奖品已领完
import TipsCompleted from "./tips/completed.vue";
// 活动未开始
import TipsNotStart from "./tips/notstart.vue";
// 奖品领取失败
import TipsFail from "./tips/fail.vue";
// 奖品领取异常
import TipsWarn from "./tips/warn.vue";
// 奖品领取成功
import TipsSuccess from "./tips/success.vue";

const props = defineProps({
  detail: {
    required: true,
    type: Object as PropType<Invite>,
  },
});

const i18n = computed(function () {
  return I18n(props.detail?.language);
});

const isNew = ref<boolean>(false);
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
  // 如果是新用户，则控制密码框显示
  isNew.value = !toBoolean(status);
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
    // 上报数据
    track.push(track.Origin.gio, track.event.landing.success, {
      activity_id: data.id,
    });
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
        <!--活动进行中-->
        <client-only class="w-60 mx-auto">
          <el-button class="w-full" native-type="submit" type="primary">
            <span>{{ detail.receive_text || i18n.common.button.submit }}</span>
          </el-button>
        </client-only>
      </el-form-item>

      <client-only v-else-if="detail.status === ActivityStatus.ENDED || isAfter(detail.end_time)">
        <!--活动结束，时间到期-->
        <TipsEnded :lang="detail.language" />
      </client-only>

      <client-only v-else-if="detail.status === ActivityStatus.COMPLETED">
        <!--活动时间未到期，但是奖品已发完-->
        <TipsCompleted :lang="detail.language" />
      </client-only>
      <client-only v-else>
        <!--未开始-->
        <TipsNotStart v-if="isAfter(detail.begin_time)" :lang="detail.language" :time="detail.begin_time" />
        <TipsEnded v-else :lang="detail.language" />
      </client-only>
    </el-form>

    <client-only>
      <el-dialog v-model="failStatus" custom-class="no-header" :append-to-body="true" width="340px">
        <!--领取失败提示-->
        <TipsFail :lang="detail.language" @click="failStatus = false" />
      </el-dialog>
      <el-dialog v-model="successStatus" :append-to-body="true" custom-class="no-header" width="340px">
        <!--奖品领取成-->
        <TipsSuccess :id="detail.id" :lang="detail.language" :text="detail.success_text" @click="successStatus = false" />
      </el-dialog>
      <el-dialog v-model="warnStatus" :append-to-body="true" custom-class="no-header" width="340px">
        <!--奖品领取异常-->
        <TipsWarn :lang="detail.language" @click="warnStatus = false" />
      </el-dialog>
    </client-only>
  </div>
</template>

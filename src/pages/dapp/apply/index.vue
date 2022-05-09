<script lang="ts" setup>
import { ElCheckboxGroup, ElCheckbox, ElMessage, ElButton, ElForm, ElFormItem, ElInput, ElDatePicker } from "element-plus";
import DAppApplyAudit from "src/pages/dapp/apply/audit.vue";
import DAppApplyTips from "src/pages/dapp/apply/tips.vue";
import { reactive, ref, computed, onMounted, toRaw } from "vue";
import I18n from "src/utils/i18n";
import safeGet from "@fengqiaogang/safe-get";
import * as apply from "src/logic/dapp/apply";
import { Audit, OptionItem, FormData } from "src/types/dapp/apply";
import { equalsIgnoreCase } from "src/utils/";
import { Model } from "src/logic/dapp/apply";
import { toArray } from "src/utils/";
import { resetFields } from "src/logic/account/register";

const i18n = I18n();
const formData = reactive<FormData>({
  name: "", // 项目名称
  logo: "",
  website: "", // 官方网站
  categories: [], // 项目类型
  chains: [], // 公链
  description: "", // 项目介绍
  comment: "", // 推荐理由
  online_time: "", // 上线时间
  online_timezone: "UTC", // 时区
  telegram: "", // telegram 加入链接
  personal_telegram: "", // 个人 telegram
  discord: "", // discord 加入链接
  twitter: "", // twitter 链接
  username: "", // 联系人名称
  contact: "", // 联系人方式
  audit_reports: [
    {
      audit: "",
      report: "",
    },
  ],
});

const loading = ref<boolean>(true);
const rules = computed(() => apply.rule());
const tipsStatus = ref<boolean>(false);
const projectId = ref<string | number>("");

const formRef = ref<any>(null);

const chains = ref<OptionItem[]>([]);
const categories = ref<OptionItem[]>([]);

onMounted(async function () {
  const API = new Model();
  const data: any = await API.getOptionData();
  chains.value = toArray(data.chains);
  categories.value = toArray(data.categories);
  loading.value = false;
});

// 增加一条数据
const onAuditAddItem = function () {
  formData.audit_reports.push({
    audit: "",
    report: "",
  });
};
// 删除某一条数据
const onAuditReduceItem = function (index: number) {
  const list: Audit[] = toArray(toRaw(formData.audit_reports));
  list.splice(index, 1);
  formData.audit_reports = list;
};

const onUpload = function (src: string) {
  formData.logo = src;
};

const onSubmitApply = async function () {
  const API = new Model();
  const form = toRaw(formRef).value;
  try {
    // 表单校验
    await form.validate();
  } catch (e) {
    // todo
    // 填写的表单有错误
    return false;
  }
  try {
    const data: FormData = toRaw(formData);
    const res: any = await API.onSubmit(data);
    // 获取用户身份
    const popup = safeGet<string>(res, "popup");
    // 判断是否属于白名单用户
    if (equalsIgnoreCase(popup, "whitelist")) {
      const id = safeGet<string | number>(res, "id");
      if (id) {
        projectId.value = id;
      }
    }
    tipsStatus.value = true;
    resetFields(formRef);
  } catch (e: any) {
    const value = e?.message || i18n.apply.tips.error;
    ElMessage(value);
  }
};
</script>

<template>
  <div class="bg-white">
    <div class="md:w-180 py-15 mx-auto">
      <div class="px-4 md:px-0">
        <client-only>
          <div class="w-full text-global-highTitle apply-wrap">
            <h3 class="text-24">{{ i18n.apply.title }}</h3>
            <div class="mt-6">
              <p class="text-14-20">{{ i18n.apply.description }}</p>
              <el-form ref="formRef" class="mt-6" label-position="top" :model="formData" :rules="rules">
                <el-form-item required prop="name">
                  <template #label>
                    <span class="text-12-16 font-medium">{{ i18n.apply.label.name }}</span>
                  </template>
                  <el-input v-model="formData.name" :placeholder="i18n.apply.placeholder.name"></el-input>
                </el-form-item>

                <el-form-item required prop="logo">
                  <template #label>
                    <span class="text-12-16 font-medium">{{ i18n.apply.label.logo }}</span>
                  </template>
                  <ui-upload :src="formData.logo" @change="onUpload" />
                </el-form-item>

                <el-form-item required prop="website">
                  <template #label>
                    <span class="text-12-16 font-medium">{{ i18n.apply.label.website }}</span>
                  </template>
                  <el-input v-model="formData.website" :placeholder="i18n.apply.placeholder.website"></el-input>
                </el-form-item>
                <div>
                  <el-form-item required prop="categories">
                    <template #label>
                      <span class="text-12-16 font-medium">{{ i18n.apply.label.categories }}</span>
                    </template>
                    <el-checkbox-group v-model="formData.categories">
                      <template v-for="(item, index) in categories" :key="index">
                        <div class="flex w-1/2 md:w-1/3 lg:w-1/5 mt-3">
                          <el-checkbox :label="item.id">
                            <span class="font-normal text-12-16">{{ item.name }}</span>
                          </el-checkbox>
                        </div>
                      </template>
                    </el-checkbox-group>
                  </el-form-item>

                  <el-form-item required prop="chains">
                    <template #label>
                      <span class="text-12-16 font-medium">{{ i18n.apply.label.chains }}</span>
                    </template>
                    <el-checkbox-group v-model="formData.chains">
                      <template v-for="(item, index) in chains" :key="index">
                        <div class="flex w-1/2 md:w-1/3 lg:w-1/5 mt-3">
                          <el-checkbox :label="item.id">
                            <span class="font-normal text-12-16">{{ item.name }}</span>
                          </el-checkbox>
                        </div>
                      </template>
                    </el-checkbox-group>
                  </el-form-item>
                </div>

                <el-form-item required prop="description">
                  <template #label>
                    <span class="text-12-16 font-medium">{{ i18n.apply.label.description }}</span>
                  </template>
                  <el-input v-model="formData.description" type="textarea" :rows="5" show-word-limit :maxlength="200" :placeholder="i18n.apply.placeholder.description"></el-input>
                </el-form-item>

                <el-form-item>
                  <template #label>
                    <span class="text-12-16 font-medium">{{ i18n.apply.label.comment }}</span>
                  </template>
                  <el-input v-model="formData.comment" type="textarea" :rows="5" show-word-limit :maxlength="200" :placeholder="i18n.apply.placeholder.comment"></el-input>
                </el-form-item>

                <el-form-item required prop="online_time">
                  <template #label>
                    <span class="text-12-16 font-medium">{{ i18n.apply.label.online_time }}</span>
                  </template>
                  <div>
                    <el-date-picker v-model="formData.online_time" class="date-choose" type="datetime" :placeholder="i18n.apply.placeholder.online_time" value-format="YYYY-MM-DD hh:mm:ss" clearable :editable="false" style="width: 100%" />
                  </div>
                </el-form-item>

                <el-form-item prop="online_timezone">
                  <template #label>
                    <span class="text-12-16 font-medium">{{ i18n.apply.label.online_timezone }}</span>
                  </template>
                  <div>
                    <el-input v-model="formData.online_timezone" placeholder="UTC" readonly></el-input>
                  </div>
                </el-form-item>

                <el-form-item prop="telegram">
                  <template #label>
                    <span class="text-12-16 font-medium">{{ i18n.apply.label.telegram }}</span>
                  </template>
                  <el-input v-model="formData.telegram" :placeholder="i18n.apply.placeholder.telegram"></el-input>
                </el-form-item>

                <el-form-item prop="personal_telegram">
                  <template #label>
                    <span class="text-12-16 font-medium">{{ i18n.apply.label.personalTelegram }}</span>
                  </template>
                  <el-input v-model="formData.personal_telegram" :placeholder="i18n.apply.placeholder.telegram"></el-input>
                </el-form-item>

                <el-form-item prop="discord">
                  <template #label>
                    <span class="text-12-16 font-medium">{{ i18n.apply.label.discord }}</span>
                  </template>
                  <el-input v-model="formData.discord" :placeholder="i18n.apply.placeholder.discord"></el-input>
                </el-form-item>
                <el-form-item prop="twitter">
                  <template #label>
                    <span class="text-12-16 font-medium">{{ i18n.apply.label.twitter }}</span>
                  </template>
                  <el-input v-model="formData.twitter" :placeholder="i18n.apply.placeholder.twitter"></el-input>
                </el-form-item>

                <el-form-item required prop="username">
                  <template #label>
                    <span class="text-12-16 font-medium">{{ i18n.apply.label.username }}</span>
                  </template>
                  <el-input v-model="formData.username" :placeholder="i18n.apply.placeholder.username"></el-input>
                </el-form-item>

                <el-form-item prop="contact">
                  <template #label>
                    <span class="text-12-16 font-medium">{{ i18n.apply.label.contact }}</span>
                  </template>
                  <el-input v-model="formData.contact" :placeholder="i18n.apply.placeholder.contact"></el-input>
                </el-form-item>

                <div class="audit-list">
                  <template v-for="(item, index) in formData.audit_reports" :key="index">
                    <DAppApplyAudit :data="item" :index="index">
                      <div class="pl-3 text-global-numRed">
                        <div v-if="formData.audit_reports.length === index + 1" class="flex cursor-pointer" @click="onAuditAddItem">
                          <IconFont class="cursor-pointer" type="icon-plus-circle" size="24" />
                        </div>
                        <div v-else class="flex cursor-pointer" @click="onAuditReduceItem(index)">
                          <IconFont type="icon-reduce-circle" size="24" />
                        </div>
                      </div>
                    </DAppApplyAudit>
                  </template>
                </div>

                <el-form-item label="">
                  <el-button type="primary" @click="onSubmitApply">
                    <span class="text-14-18 inline-block px-2">{{ i18n.apply.submit }}</span>
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <DAppApplyTips :id="projectId" :status="tipsStatus" />
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.apply-wrap {
  ::v-deep(.el-form-item__label) {
    line-height: initial;
    @apply pt-0 pb-1.5;
    @apply flex flex-row-reverse items-center justify-end;
    &:before {
      @apply text-xs;
      @apply ml-1;
    }
  }
  ::v-deep(.el-form-item__content) {
    @apply block;
  }
  ::v-deep(.el-input) {
    .el-input__inner {
      @apply h-10 rounded-md;
    }
  }
  ::v-deep(input, textarea) {
    @apply bg-global-topBg;
  }
  ::v-deep(textarea) {
    resize: none;
  }
  .el-checkbox-group {
    @apply flex flex-wrap -mt-2;
    .el-checkbox {
      @apply flex items-center;
      ::v-deep(.el-checkbox__input) {
        @apply flex;
      }
    }
  }
}
</style>

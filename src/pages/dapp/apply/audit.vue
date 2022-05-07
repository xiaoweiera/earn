<script setup lang="ts">
import { computed } from "vue";
import I18n from "src/utils/i18n";
import { ElFormItem, ElInput } from "element-plus";

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const i18n = I18n();
const auditName = computed<string>(function () {
  return `audit_reports[${props.index}].audit`;
});
const auditUrl = computed<string>(function () {
  return `audit_reports[${props.index}].report`;
});

// const ruleAudit = [{ required: true, trigger: ["blur", "change"], message: i18n.apply.rules.required }];
//
// const ruleReport = [{ required: true, type: "url", trigger: ["blur", "change"], message: i18n.apply.rules.required }];
</script>

<template>
  <client-only>
    <div class="audit-wrap">
      <div class="md:flex">
        <div class="md:w-2/5 md:pr-4">
          <el-form-item :prop="auditName">
            <template #label>
              <span class="text-12-16 font-medium">{{ i18n.apply.label.audit.name }}</span>
            </template>
            <el-input v-model="data.audit" :placeholder="i18n.apply.placeholder.audit.name"></el-input>
          </el-form-item>
        </div>
        <div class="mt-4 md:w-3/5 md:mt-0 report-url">
          <el-form-item :prop="auditUrl">
            <template #label>
              <span class="text-12-16 font-medium">{{ i18n.apply.label.audit.url }}</span>
            </template>
            <div class="flex items-center">
              <div class="flex-1">
                <el-input v-model="data.report" :placeholder="i18n.apply.placeholder.audit.url"></el-input>
              </div>
              <slot></slot>
            </div>
          </el-form-item>
        </div>
      </div>
    </div>
  </client-only>
</template>

<style lang="scss" scoped>
.report-url {
  ::v-deep(.el-form-item__label) {
    @at-root .audit-wrap:first-child & {
      @apply hidden;
      @screen md {
        @apply flex invisible;
      }
    }
  }
}
.audit-wrap {
  &:not(&:first-child) {
    ::v-deep(.el-form-item__label) {
      @apply hidden;
    }
  }
}
</style>

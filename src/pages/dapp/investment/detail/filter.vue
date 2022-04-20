<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { ElOption, ElSelect, ElInput } from "element-plus";
import { investmentModel } from "src/types/invest";
import I18n from "src/utils/i18n";
const i18n = I18n();
const props = defineProps({
  detail: {
    type: Object as PropType<investmentModel>,
    required: true,
  },
});
const emit = defineEmits(["change"]);
const project_category = ref("All");
const stage = ref("All");
const has_symbol = ref("All");
const keyword = ref("");
const sendList = ref([
  { name: "All", key: "All" },
  { name: i18n.invest.okSend, key: "yes" },
  { name: i18n.invest.noSend, key: "no" },
]);
watch([project_category, stage, has_symbol, keyword], () => {
  emit("change", {
    project_category: project_category.value,
    stage: stage.value,
    has_symbol: has_symbol.value,
    keyword: keyword.value,
  });
});
</script>
<template>
  <div class="flex items-center justify-between w-full flex-wrap">
    <client-only class="flex items-center w-full flex-wrap">
      <div class="flex mb-4 items-center md:mr-4 invest-select">
        <div class="filter-item flex-1">
          <p>{{ i18n.invest.type }}</p>
          <el-select v-model="project_category" size="small">
            <el-option v-for="item in detail.project_categories" :key="item" :label="item" :value="item" />
          </el-select>
        </div>
        <div class="filter-item flex-1 ml-4 md:ml-0">
          <p>{{ i18n.invest.fundedRound }}</p>
          <el-select v-model="stage" size="small">
            <el-option v-for="item in detail.investment_stages" :key="item" :label="item" :value="item" />
          </el-select>
        </div>
      </div>
      <div class="flex mb-4 items-center md:justify-between w-full flex-1 md:mt-0">
        <div class="filter-item invest-select">
          <p>{{ i18n.invest.isSend }}</p>
          <el-select v-model="has_symbol" size="small">
            <el-option v-for="item in sendList" :key="item.key" :label="item.name" :value="item.key" />
          </el-select>
        </div>
        <div class="relative flex flex-1 md:flex-none justify-right ml-4 md:ml-0 items-center invest-search">
          <IconFont class="select-icon" size="16" type="icon-sousuo-da1" />
          <el-input v-model="keyword" placeholder="Search" />
        </div>
      </div>
    </client-only>
  </div>
</template>
<style scoped lang="scss">
.invest-select {
  ::v-deep(.el-input__inner) {
    border: 1px solid rgba(3, 54, 102, 0.06) !important;
    box-shadow: none;
    background: #fafbfc;
    height: 32px !important;
    padding-left: 12px !important;
    border-radius: 6px !important;
    @apply text-kd14px18px md:w-25 text-left  text-global-highTitle  flex items-center  text-kd14px18px;
  }
}

.invest-search {
  ::v-deep(.el-input__inner) {
    border: 1px solid rgba(3, 54, 102, 0.06) !important;
    background: #fafbfc;
    height: 32px !important;
    padding-left: 36px !important;
    border-radius: 6px !important;
    @apply text-kd14px18px md:w-50 text-left  text-global-highTitle  flex items-center  text-kd14px18px;
  }

  .select-icon {
    @apply absolute text-global-highTitle text-opacity-20 z-22 left-3;
  }
}

.filter-item {
  @apply flex items-center flex-1;
}

.filter-item:not(:first-child) {
  @apply md:ml-4;
}

p {
  @apply whitespace-nowrap text-kd14px18px font-kdFang text-global-highTitle text-opacity-65 mr-4;
}
</style>

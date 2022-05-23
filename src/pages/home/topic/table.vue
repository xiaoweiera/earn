<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { getList, Table } from "./data";
import { onUpdateReactive } from "src/utils/ssr/ref";
import { ElTable, ElTableColumn } from "element-plus";
import Content from "src/pages/home/topic/content/index.vue";

const rowClass = () => {
  const styleJson = {
    height: "60px",
    border: "none",
  };
  return styleJson;
};
const headerCellClass = () => {
  const styleJson = {
    border: "none",
    borderTop: "1px solid rgba(3, 54, 102, 0.06) !important",
    borderBottom: "1px solid rgba(3, 54, 102, 0.06) !important",
    padding: "0",
    height: "40px",
  };
  return styleJson;
};
const cellClass = () => ({ border: "none" });
const table = reactive<Table>({} as Table);

const update = onUpdateReactive(table, getList);

onMounted(update);
</script>

<template>
  <div class="m-5">
    <div v-if="table.items && table.items.length > 0">
      <el-table :data="table.items" class="w-full" :row-style="rowClass" :header-cell-style="headerCellClass" :cell-style="cellClass">
        <el-table-column class-name="lie" fixed :height="60" :width="30">
          <template #header>
            <div class="header-name">#</div>
          </template>
          <template #default="scope">
            <div class="text-kd14px16px text-number text-global-highTitle whitespace-nowrap">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <template v-for="(header, index) in table.header" :key="index">
          <el-table-column :fixed="index === 0" :width="header.width ? header.width : 150">
            <template #header>
              <span class="header-name">{{ header.title }}</span>
            </template>
            <template #default="scope">
              <Content :fields="header.fields" :width="header.width ? header.width - 8 : null" :center="header.center" :type="header.type" :data="scope.row" />
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-name {
  @apply text-kd12px16px font-medium text-global-highTitle;
}
</style>

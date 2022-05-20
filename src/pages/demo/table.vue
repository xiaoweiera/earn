<script setup lang="ts">
/**
 * @file demo
 * @auth svon.me@gmail.com
 */
import { onMounted, reactive } from "vue";
import { getList, Table } from "./data";
import { onUpdateReactive } from "src/utils/ssr/ref";
import { ElTable, ElTableColumn } from "element-plus";
import Content from "./content/index.vue";

const table = reactive<Table>({} as Table);

const update = onUpdateReactive(table, getList);

onMounted(update);
</script>

<template>
  <div>
    <div v-if="table.items && table.items.length > 0">
      <el-table :data="table.items" class="w-full">
        <template v-for="(header, index) in table.header" :key="index">
          <el-table-column>
            <template #header>
              <span>{{ header.title }}</span>
            </template>
            <template #default="scope">
              <Content :fields="header.fields" :type="header.type" :data="scope.row" />
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

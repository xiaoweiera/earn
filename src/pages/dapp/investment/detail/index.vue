<script setup lang="ts">
import Card from './card.vue'
import Table from './table.vue'
import { ElAffix } from "element-plus";
</script>
<template>
  <div class="max-w-360 px-22.5 pt-8 pb-30 mx-auto">
    <div class="flex w-full h-full">
<!--      <el-affix :offset="60">-->
          <Card class="min-w-101 w-101 h-154.5"/>
<!--      </el-affix>-->
      <Table class="ml-8 flex-1"/>
    </div>
  </div>
</template>
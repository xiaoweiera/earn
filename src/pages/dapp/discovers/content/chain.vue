<script setup lang="ts">
import { ref } from 'vue';
import { ElSelect, ElOption } from 'element-plus';

const orderKey=ref('earning_rate')
const orderList = ref([
  {key:'earning_rate',name:'all'},
  {key:'ETH',name:'ETH'},
  {key:'Plo',name:'Plo'},
])
</script>
<template>
  <div>
    <div class="flex items-center">
      <div class="text-kd14px18px text-global-highTitle text-opacity-65 font-kdFang">公链</div>
      <div class="flex items-center w-25 h-8 ml-4">
        <el-select class="projectMining flex"  v-model="orderKey" size="small">
          <el-option v-for="item in orderList" :label="item.name" :value="item.key" :key="item.key"></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.projectMining{
  ::v-deep(.el-input__inner ) {
    @apply h-8;
  }
}
</style>
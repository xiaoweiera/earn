<script lang="ts" setup>
import {ref} from 'vue';
import {ElSelect, ElOption} from 'element-plus';

defineProps({
  title: {
    type: String,
    default: () => '',
  },
})
const orderKey = ref('earning_rate')
const orderList = ref([
  {key: 'earning_rate', name: 'all'},
  {key: 'ETH', name: 'ETH'},
  {key: 'Plo', name: 'Plo'},
])
</script>
<template>
  <div>
    <div class="flex items-center">
      <div class="text-14-18 text-global-highTitle text-opacity-65">{{ title }}</div>
      <div class="flex items-center w-25 h-8 ml-4">
        <client-only>
          <el-select v-model="orderKey" size="small">
            <el-option v-for="item in orderList" :key="item.key" :label="item.name" :value="item.key"></el-option>
          </el-select>
        </client-only>
      </div>
    </div>
  </div>
</template>

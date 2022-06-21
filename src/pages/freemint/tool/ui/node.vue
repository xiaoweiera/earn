<script setup lang="ts">
/**
 * 节点选择
 */
import { ElSelect, ElOption, ElInput } from "element-plus";
import { ref, PropType, computed } from "vue";
import { toolMode } from "src/types/freemint";
const props = defineProps({
  toolModel: {
    type: Object as PropType<toolMode>,
    required: true,
  },
});
const nodeList = ref([
  { url: "https://aaaaaaaaa", value: 700 },
  { url: "https://bbbbbbbbb", value: 1100 },
  { url: "https://ccccccccc", value: 300 },
]);
const nodeUrl = ref("");
const isShowSpeed = ref(true);
const selectNode = ref(""); //选定的节点值
const nodeNumber = computed(() => {
  let value = 0;
  nodeList.value.forEach((item) => {
    if (item.url === selectNode.value) {
      value = item.value;
    }
  });
  return value;
});
// const getList=async ()=>{
//   nodeList.value=result
// }
//更改地址
const selectChange = (address: string) => {
  isShowSpeed.value = true;
  selectNode.value = "";
  nodeUrl.value = address;
  props.toolModel.address = address;
};
const inputChange = () => {
  isShowSpeed.value = false;
};
const getColor = (value: number) => (value < 1000 ? "green" : "red");
</script>
<template>
  <div class="w-full border-css">
    <div class="state justify-between">
      <div class="state">
        <ui-image class="mr-2 w-5 h-5" oss src="/mint/data.png" />
        <span class="text-kd14px18px font-medium text-global-black-title">节点选择</span>
      </div>
      <div class="button-mint">Ping</div>
    </div>
    <client-only class="mt-3 relative state">
      <el-select v-model="selectNode" class="w-30 mr-4" placeholder="请选择" @change="selectChange">
        <el-option v-for="item in nodeList" :key="item.value" :value="item.url">
          <div class="w-full h-full">
            <div class="flex h-full items-center justify-between">
              <span class="text-kd12px16px text-global-black-desc">{{ item.url }}</span>
              <span class="text-kd12px16px" :class="getColor(item.value)">{{ item.value }} ms</span>
            </div>
          </div>
        </el-option>
      </el-select>
      <el-input v-model="nodeUrl" class="input-info value-input" placeholder="" autocomplete="off" @change="inputChange" />
      <div v-if="nodeUrl && isShowSpeed" class="selectNode" :class="getColor(nodeNumber)">{{ nodeNumber }} ms</div>
    </client-only>
  </div>
</template>
<style scoped lang="scss">
::v-deep(.el-input__inner) {
  border: 1px solid rgba(3, 54, 102, 0) !important;
  box-shadow: none;
  background: #f8fafa;
  height: 32px !important;
  padding-left: 8px !important;
  border-radius: 4px !important;
  color: #111316 !important;
  @apply text-kd12px16px;
}
.el-select-dropdown__item {
  width: 300px !important;
  padding: 12px 12px 12px 12px !important;
}
.green {
  color: #008f28;
}
.red {
  color: #dd4415;
}
.selectNode {
  @apply text-kd12px16px absolute whitespace-nowrap right-8 top-2;
}
</style>

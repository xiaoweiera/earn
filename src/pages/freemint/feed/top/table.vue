<script lang="ts" setup>
import { ElTable, ElTableColumn } from "element-plus";
import { rowClass, headerCellClass, cellClass } from "src/pages/home/topic/data";
import { ref, onMounted } from "vue";
import { toNumberCashFormat } from "src/utils/convert/to";
import Level from "./level.vue";
import document from "src/plugins/browser/document";
import window from "src/plugins/browser/window";
import { smallToken } from "src/lib/tool";

defineProps({
  data: {
    type: Object,
    required: true,
  },
  params: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["sort"]);
const isPc = ref(true);

const height = document.body.clientWidth > 375 ? 60 : 50;
const key = ref<number>(0);

// 排序
const sort = () => {
  // todo
  key.value++;
  emit("sort");
};

const headerList = [
  { key: "collection", name: "NFT Collection", sort: false, active: false },
  { key: "level", name: "Fomo Level", sort: true, active: false },
  { key: "owner", name: "Minters", sort: true, active: false },
  { key: "sumNumber", name: "Mint NFTs", sort: true, active: false },
  { key: "value", name: "Mint Price", sort: true, active: false },
  { key: "gas", name: "Avg Tx Fee", sort: true, active: false },
  { key: "operate", name: "Operate" },
];
onMounted(() => {
  isPc.value = document.body.clientWidth > 1024;
  window.addEventListener("resize", () => {
    isPc.value = document.body.clientWidth > 1024;
  });
});
</script>
<template>
  <div class="showX md:mb-0 mb-4 mt-4">
    <el-table :data="data" class="w-full table-fixed" :row-style="rowClass(height)" :header-cell-style="headerCellClass" :cell-style="cellClass">
      <el-table-column class-name="lie" :fixed="!isPc" :width="45">
        <template #header>
          <div class="header-name items-center flex h-full">#</div>
        </template>
        <template #default="scope">
          <span class="text-kd14px16px text-number text-global-highTitle whitespace-nowrap">
            <span>{{ scope.$index + 1 }}</span>
          </span>
        </template>
      </el-table-column>
      <template v-for="(header, index) in headerList" :key="index">
        <el-table-column :fixed="index === 0 && !isPc" :width="index === 0 ? (isPc ? 200 : 140) : 116">
          <template #header>
            <div class="relative h-full flex items-center" :class="{ 'justify-center': index !== 0 }">
              <ui-sort class="header-name fit" :active="header.active" :sort="header.sort" :sort-data="params" :key-name="header.key" :field="header.name" :name="header.name" @change="sort" />
            </div>
          </template>
          <template #default="scope">
            <div v-if="header.key === 'collection'" class="state">
              <ui-image class="w-8 h-8 min-w-8 max-w-8 mr-1.5 rounded-full" :title="scope.row.name" :src="scope.row.image" />
              <div>
                <span class="text-kd14px18px text-global-highTitle short">{{ scope.row.name }}</span>
                <div class="desc state">
                  <span class="text-global-highTitle text-opacity-85">{{ smallToken(scope.row.contract_address) }}</span>
                  <v-copy :value="scope.row.contract_address" message class="flex cursor-pointer">
                    <IconFont class="ml-1 text-global-highTitle text-opacity-45" size="16" type="icon-copy" />
                  </v-copy>
                </div>
              </div>
            </div>
            <div v-else-if="header.key === 'level'" class="state justify-center">
              <Level :count="scope.row.sumNumber" />
            </div>
            <div v-else-if="header.key === 'gas'">
              <div class="txt text-number">{{ toNumberCashFormat(scope.row.gas, "", "", "0") }} ETH</div>
            </div>
            <v-router v-else-if="header.key === 'operate'" class="mint-button" target="_blank" :href="`/freemint/nft?contact=${scope.row.hash}`">Mint</v-router>
            <div v-else-if="header.key === 'owner'" class="txt text-number">{{ toNumberCashFormat(scope.row.owner) }}</div>
            <div v-else-if="header.key === 'sumNumber'" class="txt text-number">
              {{ toNumberCashFormat(scope.row.sumNumber) }}
            </div>
            <div v-else-if="header.key === 'value'" class="">
              <div v-if="scope.row.value" class="txt text-number">{{ toNumberCashFormat(scope.row.value) }} ETH</div>
              <div v-else class="free">Free</div>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
.txt {
  @apply text-kd14px16px text-center;
}

.free {
  color: #008f28;
  @apply text-kd14px18px text-center;
}

.desc {
  @apply text-kd12px16px text-number text-center mt-0.5;
}

.mint-button {
  @apply px-2 h-6 mx-auto rounded-kd4px bg-global-primary text-global-white text-kd12px16px font-medium;
  @apply flex items-center justify-center max-w-max;
}

.fit {
  width: fit-content !important;
}

::v-deep(.el-table__fixed-left) {
  height: 100% !important;
}

::v-deep(.el-table__fixed) {
  height: 100% !important;
}

::v-deep(.el-popover.el-popper) {
  min-width: fit-content !important;
  width: fit-content !important;
  padding: 0px 0px 0px 0px !important;
  border-radius: 100px;
  word-break: break-word;
  max-width: 400px;
  transform: translate(100%, 100%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.search {
  ::v-deep(.el-input__inner) {
    border: none !important;
    background: #fafbfc;
    height: 34px !important;
    padding-left: 35px !important;
    border-radius: 6px !important;
    @apply text-kd14px18px md:w-50 text-left  text-global-highTitle  flex items-center  text-kd14px18px;
  }
}

::v-deep(.cell) {
  height: 100%;
}

::v-deep(.el-scrollbar) {
  --el-scrollbar-bg-color: rgba(0, 0, 0, 0.2) !important;
  --el-scrollbar-hover-bg-color: rgba(0, 0, 0, 0.2) !important;
}

.more {
  @apply w-30 h-8 flex items-center justify-center mx-auto w-fit cursor-pointer rounded-kd6px;
  @apply text-kd14px18px font-medium font-kdFang text-global-primary;
  @apply bg-global-primary bg-opacity-6;
}

.header-name {
  @apply text-kd12px16px font-medium text-global-highTitle;
}

::v-deep(.el-table__body) {
  border: 1px solid white !important;
}

.huiClass {
  ::v-deep(td) {
    background-color: rgba(248, 250, 250, 1) !important;
  }

  ::v-deep(tr) {
    background-color: rgba(248, 250, 250, 1) !important;
  }

  ::v-deep(th) {
    background-color: rgba(248, 250, 250, 1) !important;
  }

  ::v-deep(.el-table__body) {
    border: 1px solid rgba(248, 250, 250, 1) !important;
  }
}
</style>

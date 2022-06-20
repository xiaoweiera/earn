<script lang="ts" setup>
import { ElTable, ElTableColumn } from "element-plus";
import { rowClass, headerCellClass, cellClass } from "src/pages/home/topic/data";
import { getParam } from "src/utils/router";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toNumberCashFormat } from "src/utils/convert/to";
import Level from "./level.vue";
import document from "src/plugins/browser/document";
import { dateDiff } from "src/utils";

const params = reactive({
  type: getParam<string>("type"),
  sort_field: "",
  sort_type: "", // desc asc
  page: 1,
  page_size: 10,
});

const height = document.body.clientWidth > 375 ? 60 : 50;
const route = useRoute();
const router = useRouter();
const key = ref<number>(0);
const type = ref("free");

const isLoad = ref(true);
watch(type, (n: any) => {
  const value = getParam<object>();
  router.push({
    path: `${route.path}`,
    query: Object.assign({}, value, {
      search: n,
    }),
  });
});

// 排序
const sort = () => {
  // todo
  key.value++;
};

const initValue = function () {
  return [];
};
let queryTest = "";
const requestList = async function (query: any) {
  queryTest = query;
  // const newParam = Object.assign({}, query);
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
};

const headerList = [
  { key: "collection", name: "NFT Collection", width: 200, sort: false, active: false },
  { key: "level", name: "Fomo Level", sort: true, active: true },
  { key: "minters", name: "5m Minters", sort: true, active: false },
  { key: "nfts", name: "5m Mint NFTs", sort: true, active: false },
  { key: "cost", name: "Avg Mint Cost", sort: true, active: false },
  { key: "first", name: "First Mint", sort: true, active: false },
  { key: "operate", name: "Operate" },
];
</script>
<template>
  <div class="showX md:mb-0 mb-4 mt-4">
    <div :key="key">
      <ui-pagination :limit="params.page_size" :init-value="initValue()" :request="requestList">
        <template #default="{ list }">
          <div v-show="isLoad">
            <el-table :data="list" class="w-full table-fixed" :row-style="rowClass(height)" :header-cell-style="headerCellClass" :cell-style="cellClass" @row-click="toProject">
              <el-table-column class-name="lie" fixed :width="45">
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
                <el-table-column :fixed="index === 0" :width="header.width ? header.width : 118">
                  <template #header>
                    <div class="relative h-full flex items-center" :class="{ 'justify-center': index !== 0 }">
                      <ui-sort class="header-name fit" :active="header.active" :sort="header.sort" :sort-data="params" :key-name="header.key" :field="header.name" :name="header.name" @change="sort" />
                    </div>
                  </template>
                  <template #default>
                    <div v-if="header.key === 'collection'" class="state">
                      <ui-image class="w-8 h-8 mr-1.5 rounded-full" src="" />
                      <span class="text-kd14px18px text-global-highTitle">Free Hand NFT</span>
                    </div>
                    <div v-else-if="header.key === 'level'" class="state justify-center">
                      <Level type="extreme" />
                    </div>
                    <div v-else-if="header.key === 'cost'">
                      <div class="free">Free</div>
                      <div class="desc">54 Gwei</div>
                    </div>
                    <div v-else-if="header.key === 'first'" class="text-center text-kd12px16px text-global-highTitle">
                      {{ dateDiff(1655697373) }}
                    </div>
                    <div v-else-if="header.key === 'operate'" class="mint-button">Mint</div>
                    <div v-else class="text-kd14px16px text-center text-number">{{ toNumberCashFormat(1421) }}</div>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </div>
        </template>
      </ui-pagination>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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

<script lang="ts" setup>
import { getLog, getNextUrl } from "src/logic/dapp";
import { toFixed } from "src/utils";
import { toNumberCashFormat } from "src/utils/convert/to";
import I18n from "src/utils/i18n";

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  params: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const i18n = I18n();
const emit = defineEmits(["changeSort"]);
const data = {
  header: [
    {
      name: i18n.home.endProject.projectName,
      key: "name",
      flag: false,
      width: "min-w-80.5",
    },
    {
      name: i18n.home.topList.category,
      key: "category",
      flag: false,
      width: "w-27.5",
    },
    {
      name: i18n.home.topList.owner,
      key: "owners",
      flag: true,
      width: "w-27.5",
    },
    {
      name: i18n.home.topList.supply,
      key: "issue_volume",
      flag: true,
      width: "w-27.5",
    },
    {
      name: i18n.home.topList.floorPrice,
      key: "floor_price",
      flag: true,
      width: "w-27.5",
    },
    {
      name: i18n.home.topList.mintPrice,
      key: "mint_price",
      flag: true,
      width: "w-27.5",
    },
    {
      name: i18n.home.topList.chain,
      key: "chain",
      width: "w-27.5",
    },
    {
      name: i18n.home.topList.rate,
      key: "overall_score",
      flag: true,
      width: "w-27.5",
    },
  ],
};
// 排序
const sort = (key: string) => {
  // if (!props.params.sort_type || props.params.sort_field !== key) {
  //   props.params.sort_type = "desc";
  // } else if (props.params.sort_type === "desc") {
  //   props.params.sort_type = "asc";
  // } else {
  //   props.params.sort_type = "";
  // }
  // props.params.sort_field = key;
  emit("changeSort", key);
};

const sortIcon: any = {
  desc: "icon-shuangxiangjiantou-down",
  asc: "icon-shuangxiangjiantou-up",
  "": "icon-shuangxiangjiantou",
};
const getIcon = (item: string) => {
  if (props?.params?.sort_field === item) {
    return sortIcon[props?.params?.sort_type];
  }
  return "icon-shuangxiangjiantou";
};
</script>
<template>
  <div class="table-box">
    <table class="table-my">
      <thead>
        <tr class="min-h-11.5 h-11.5">
          <template v-for="(item, index) in data.header" :key="index">
            <td :class="item.width" class="thead-hr hand">
              <div
                :class="index === 0 ? 'justify-start' : 'justify-center'"
                class="flex items-center"
                @click="item.flag && sort(item.key)"
              >
                <IconFont v-if="item.flag" :type="getIcon(item.key)" class="mr-1" size="14" />
                <span>{{ item.name }}</span>
              </div>
            </td>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in list" :key="index">
          <tr v-if="item.data_type !== 'ad'" class="h-14 hand" @click="getNextUrl(item)">
            <td>
              <div class="flex-center">
                <ui-image :src="item.logo" class="w-8 h-8" rounded />
                <div class="ml-1.5">
                  <div class="numberDefault text-number line-height-no">{{ item.name }}</div>
                  <div class="nameTag text-number text-left line-height-no">{{ item.category }}</div>
                </div>
              </div>
            </td>
            <td>
              <div class="text-center text-kd14px16px text-global-highTitle text text-number">
                {{ item.category ? item.category : '-' }}
              </div>
            </td>
            <td>
              <div class="numberDefault text-number">{{ toNumberCashFormat(item.owners, '', '', 'Not Set') }}</div>
            </td>
            <td>
              <div class="numberDefault text-number">{{ toNumberCashFormat(item.issue_volume, '', '', 'N/A') }}</div>
            </td>
            <td>
              <div class="numberDefault text-number">
                {{ toNumberCashFormat(item.floor_price, '$', '', 'Not Set') }}
              </div>
            </td>
            <td>
              <div class="numberDefault text-number">{{ toNumberCashFormat(item.mint_price, '$', '', 'Not Set') }}</div>
            </td>
            <td>
              <div class="flex-center justify-center">
                <IconFont v-if="item.chain" :type="getLog(item.chain)" size="16" />
              </div>
            </td>
            <td>
              <div class="flex-center justify-center">
                <IconFont size="12" type="icon-star" />
                <span class="star-txt">{{ toFixed(item.overall_score, 1) }}</span>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<style lang="scss" scoped>
.thead-hr {
  @apply min-h-11.5 h-11.5 border-b-1 border-global-highTitle border-opacity-6;
}

thead td {
  @apply min-h-11.5 h-11.5 text-kd12px16px text-global-highTitle text-opacity-65 text-center;
  &:first-child {
    @apply text-left;
  }
}

tbody td {
  @apply text-kd14px18px text-global-highTitle;
}

.table-box {
  @apply w-full  bg-global-white rounded-kd16px;
}

.table-my {
  border-collapse: separate;
  border-spacing: 0px 0px;
  @apply w-full bg-opacity-0 px-7 rounded-kd6px;
}

.flex-center {
  @apply flex items-center;
}

.link {
  @apply ml-1 text-global-primary text-kd14px16px;
}

.star-txt {
  @apply ml-1 text-number text-kd14px16px text-global-highTitle;
}

.numberDefault {
  @apply text-kd14px16px text-global-highTitle text-center;
}

.unit {
  @apply ml-1 font-kdFang font-medium text-kd12px16px text-global-highTitle text-opacity-65;
}

.numberChange {
  @apply text-kd12px18px;
}

.nameTag {
  @apply text-kd12px16px text-global-highTitle text-opacity-45;
}

.nameNameDes {
  @apply text-kd16px18px text-global-highTitle;
}

.nameDes {
  @apply text-kd14px16px text-global-highTitle text-opacity-45;
}
</style>

<script setup lang="ts">
import { toNumberCashFormat } from "src/utils/convert/to";
import { getClassColor, getTegLog, getTegUrl } from "src/logic/dapp";
import { IdoHeader } from "src/logic/dapp/config";
import { AnyEquals, toFixed } from "src/utils";
import VRouter from "src/components/v/router.vue";
import safeGet from "@fengqiaogang/safe-get";
import { DAppType } from "src/types/dapp/dapp";
import { routerConfig } from "src/router/config";
import { TabName } from "src/types/dapp/detail";
import { PropType } from "vue";

const emit = defineEmits(["changeSort"]);
const props = defineProps({
  list: {
    required: true,
    type: Array as any,
  },
  params: {
    type: Object,
    default: () => {
      return {};
    },
  },
  name: {
    type: String as PropType<DAppType>,
    required: true,
  },
});
// 排序
const sort = (key: string) => {
  emit("changeSort", key);
};

const sortIcon: any = {
  "desc": "icon-shuangxiangjiantou-down",
  "asc": "icon-shuangxiangjiantou-up",
  "": "icon-shuangxiangjiantou",
};
const getIcon = (item: string) => {
  if (props?.params?.sort_field === item) {
    return sortIcon[props?.params?.sort_type];
  }
  return "icon-shuangxiangjiantou";
};

const getUrl = function (data: object) {
  const id = safeGet<string>(data, "id");
  if (AnyEquals(props.name, DAppType.igo)) {
    return routerConfig.dapp.igoDetail(id);
  }
  return routerConfig.dapp.idoDetail(id);
};
</script>
<template>
  <div class="table-box">
    <table class="table-my">
      <thead>
        <tr class="min-h-11.5 h-11.5">
          <template v-for="(item, index) in IdoHeader()" :key="index">
            <td class="thead-hr hand" :class="item.width">
              <div class="flex items-center" :class="index === 0 ? 'justify-start' : 'justify-center'" @click="item.sort && sort(item.key)">
                <IconFont v-if="item.sort" class="mr-1" size="14" :type="getIcon(item.key)" />
                <span>{{ item.name }}</span>
              </div>
            </td>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in list" :key="index">
          <v-router v-if="item.data_type !== 'ad'" class="w-full h-14 hand" :href="getUrl(item)" target="_blank" name="tr">
            <td>
              <div class="flex-center">
                <ui-image class="w-8 h-8 text-12-12 font-kdInter" rounded :src="item.logo" :title="item.name" />
                <div class="ml-1.5">
                  <div class="numberDefault text-number line-height-no">{{ item.name }}</div>
                  <div class="nameTag text-number text-left line-height-no">{{ item.symbol }}</div>
                </div>
              </div>
            </td>
            <td>
              <div class="numberDefault text-number">{{ item.category ? item.category : "--" }}</div>
            </td>
            <td>
              <div class="numberDefault text-number">
                {{ toNumberCashFormat(item.ido_fundraising_goal, "$", "", "TBA") }}
              </div>
            </td>
            <td>
              <div class="numberDefault text-number">{{ toNumberCashFormat(item.ido_price, "$", "", "--") }}</div>
            </td>
            <td>
              <div class="numberDefault text-number">
                {{ toNumberCashFormat(item.current_price, "$", "", "--") }}
              </div>
            </td>
            <td>
              <div class="text-kd14px16px text-number" :class="getClassColor(item.current_roi_usd)">
                {{ toNumberCashFormat(item.current_roi_usd, "x", "", "N/A") }}
              </div>
            </td>
            <td>
              <div class="text-kd14px16px text-number" :class="getClassColor(item.ath_since_ido)">
                {{ toNumberCashFormat(item.ath_since_ido, "x", "", "N/A") }}
              </div>
            </td>
            <!--            <td>-->
            <!--              <div class="flex-center justify-center">-->
            <!--                <IconFont size="16" :type="getLog(item.chain)"/>-->
            <!--              </div>-->
            <!--            </td>-->
            <td>
              <div v-if="item.tge_platform && item.tge_platform.length > 0">
                <div v-for="(item, index) in item.tge_platform" :key="index" class="flex-center justify-center">
                  <IconFont size="16" :type="getTegLog(item)" />
                  <v-router class="link text-number" target="_blank" :href="getTegUrl(item)">{{ item }}</v-router>
                </div>
              </div>
              <div v-else>
                <span>Not Set</span>
              </div>
            </td>
            <td>
              <div class="flex-center justify-center">
                <IconFont size="12" type="icon-star" />
                <span class="star-txt">{{ toFixed(item.overall_score, 1) }}</span>
              </div>
            </td>
          </v-router>
        </template>
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="scss">
.thead-hr {
  @apply min-h-11.5 h-11.5 border-b-1 border-global-highTitle border-opacity-6;
}
thead td {
  @apply min-h-11.5 h-11.5 text-center text-kd12px16px text-global-highTitle font-medium;
  &:first-child {
    @apply text-left pl-3;
  }
}
tbody td {
  @apply text-center text-kd14px18px text-global-highTitle;
  &:first-child {
    @apply pl-3;
  }
}
.table-box {
  @apply w-full  bg-global-white rounded-kd16px;
}
.table-my {
  border-collapse: separate;
  border-spacing: 0px 0px;
  @apply w-full bg-opacity-0 rounded-kd6px;
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
  @apply text-kd14px16px text-global-highTitle;
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

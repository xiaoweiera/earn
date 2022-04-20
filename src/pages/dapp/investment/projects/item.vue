<script lang="ts" setup>
import { PropType } from "vue";
import I18n from "src/utils/i18n";
import { ProjectItem } from "src/types/dapp/invest";
import { toNumberCashFormat, getEnDateMDY } from "src/utils/";
import { config } from "src/router/config";
import document from "src/plugins/browser/document";
import { ElButton } from "element-plus";

defineProps({
  data: {
    type: Object as PropType<ProjectItem>,
    default: () => {
      return {};
    },
  },
});

const i18n = I18n();

const getCount = function (data: number) {
  if (data && data > 11) {
    if (document.body.clientWidth >= 1024) {
      return `+${data - 11}`;
    } else {
      return `+${data - 14}`;
    }
  }
};
</script>

<template>
  <div class="min-h-94.5 p-1.5 bg-global-white border-1 border-global-highTitle border-opacity-6 rounded-md">
    <v-router :href="`${config.funds}/${data.project.id}`" target="_blank" name="div">
      <!-- 头部 -->
      <div class="w-full">
        <p class="w-full h-11.25 rounded-md bg-global-numGreen bg-opacity-12 flex items-center justify-center">
          <span class="text-kd24px24px text-global-numGreen font-semibold font-kdBarlow">{{ data.stage_name }}</span>
        </p>
      </div>
      <!-- logo -->
      <div class="w-full mt-3">
        <div class="w-24 h-24 mx-auto relative">
          <div class="w-full h-full">
            <ui-image class="w-full h-full" rounded fit="cover" :src="data.project.logo"></ui-image>
          </div>
          <div v-if="data.project.categories && data.project.categories.length > 0" class="w-full h-6.5 flex justify-center absolute left-0 bottom-0">
            <p class="w-max flex px-2 pt-1 py-1.75 bg-global-numGreen border-2 border-global-white rounded-2xl">
              <span class="text-kd14px14px text-global-white font-kdSemiBold">{{ data.project.categories[0] }}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- name -->
      <div class="w-full mt-1.5">
        <p class="w-full text-center">
          <span class="text-kd24px28px text-global-highTitle font-kdBarlow line-clamp-1">{{ data.project.name }}</span>
        </p>
      </div>
      <!-- 总数 -->
      <div class="w-full mt-2">
        <p class="w-full text-center">
          <span class="text-kd14px18px text-global-highTitle text-opacity-65 font-medium font-kdFang">{{ i18n.invest.project.total }}</span>
          <span class="mx-1 text-kd20px20px text-global-highTitle text-opacity-85 font-semibold font-kdBarlow">{{ data.investors.length }}</span>
          <span class="text-kd14px18px text-global-highTitle text-opacity-65 font-medium font-kdFang">{{ i18n.invest.project.investors }}</span>
        </p>
      </div>
      <!-- 参与logo -->
      <div :class="{ overlap: data.investors.length > 9 }" class="w-full mt-2 px-1.5 group-list">
        <div class="w-full min-h-11.5 py-2 pl-1.5 border-t-1 border-b-1 border-global-highTitle border-opacity-6 flex justify-center items-center">
          <template v-for="item in data.investors" :key="item.id">
            <v-router class="block p-0.5 group-item bg-white rounded-1/2" :href="`${config.invest}/${item.id}`" target="_blank">
              <ui-image class="w-6 h-6" rounded fit="cover" :src="item.logo" />
            </v-router>
          </template>
          <span class="group-more text-kd16px20px text-global-darkblue font-kdBarlow font-medium">
            {{ getCount(data.investors.length) }}
          </span>
        </div>
      </div>
      <!-- 价格 -->
      <div class="mt-2">
        <div class="flex text-center text-global-highTitle text-opacity-45">
          <div class="flex-1 px-2 flex-wrap">
            <!--总量-->
            <p class="text-kd12px16px flex items-center flex-nowrap justify-center">
              <span>{{ i18n.invest.project.totalRaised }}</span>
            </p>
            <p class="mt-1 text-global-highTitle text-opacity-85">
              <b class="text-kd18px18px font-semibold font-kdBarlow">{{ toNumberCashFormat(data.amount, "$") }}</b>
            </p>
          </div>
          <div class="flex-1 px-2 border-l border-solid border-global-highTitle border-opacity-6">
            <!--日期-->
            <p class="text-kd12px16px flex items-center justify-center">
              <span>{{ i18n.invest.project.lastFund }}</span>
            </p>
            <p class="mt-1 text-global-highTitle text-opacity-85">
              <b class="text-kd18px18px font-semibold font-kdBarlow">{{ getEnDateMDY(data.invested_at) }}</b>
            </p>
          </div>
        </div>
      </div>
      <!-- 更多 -->
      <div class="w-full mt-2">
        <v-router class="block" :href="`${config.funds}/${data.project.id}`" target="_blank">
          <client-only>
            <el-button class="w-full" type="primary" size="large">
              <span class="text-kd16px22px font-medium font-kdFang">{{ i18n.invest.project.learnMore }}</span>
            </el-button>
          </client-only>
        </v-router>
      </div>
    </v-router>
  </div>
</template>

<style lang="scss" scoped>
@mixin overlap($num) {
  .group-item {
    @apply -ml-1.75;
    &:nth-child(#{$num}) {
      & ~ .group-item {
        @apply hidden;
      }
      & ~ .group-more {
        @apply block;
      }
    }
  }
}
.group-list {
  .group-more {
    @apply hidden ml-auto;
  }
  &.overlap {
    @include overlap(14);
    @screen lg {
      @include overlap(11);
    }
  }
  &:not(.overlap) {
    @apply justify-center;
  }
}
</style>

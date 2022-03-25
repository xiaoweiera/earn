<script lang="ts" setup>
import { PropType } from "vue";
import { DataItem } from "src/types/dapp/airdrop";
import { config } from "src/router/config";
import I18n from "src/utils/i18n";
import { size, toNumberCash, toInteger, dateNow, dateYMDFormat, isBefore, isAfter, dateDiffData, toFixed } from "src/utils";
import HomeAirdropCorner from "src/pages/home/airdrop/corner/index.vue";

defineProps({
  data: {
    required: true,
    type: Object as PropType<DataItem>,
  },
});
const i18n = I18n();
const timeValue = function (data: DataItem) {
  // 如果项目未开始 (开始时间大于当前时间)
  if (isAfter(data.airdrop_start_at)) {
    const diff = dateDiffData(dateNow(), data.airdrop_start_at);
    if (diff.day > 0) {
      return i18n.template(i18n.airdrop.time.before.day, { value: diff.day });
    }
    if (diff.hour > 0) {
      return i18n.template(i18n.airdrop.time.before.hour, { value: diff.hour });
    }
    if (diff.minute > 0) {
      return i18n.template(i18n.airdrop.time.before.minute, { value: diff.minute });
    }
  }
  // 如果项目未结束 （结束时间大于当前时间）
  if (isAfter(data.airdrop_end_at)) {
    const diff = dateDiffData(dateNow(), data.airdrop_end_at);
    if (diff.day > 0) {
      return i18n.template(i18n.airdrop.time.after.day, { value: diff.day });
    }
    if (diff.hour > 0) {
      return i18n.template(i18n.airdrop.time.after.hour, { value: diff.hour });
    }
    if (diff.minute > 0) {
      return i18n.template(i18n.airdrop.time.after.minute, { value: diff.minute });
    }
  }
  return `${dateYMDFormat(data.airdrop_start_at)} - ${dateYMDFormat(data.airdrop_end_at)}`;
};
const detailLink = function (data: DataItem) {
  if (data.id) {
    return `${config.airdrop}/${data.id}`;
  }
  return null;
};
</script>
<template>
  <v-router class="airdrop-item rounded-2xl overflow-hidden" :href="detailLink(data)" target="_blank">
    <div>
      <slot name="head">
        <div class="p-4">
          <div class="flex items-center justify-between h-13.5 flex-nowrap">
            <!--头像 标题-->
            <div class="flex flex-auto w-1">
              <div class="flex w-13.5 h-13.5 relative">
                <ui-image class="rounded-md w-full h-full" :src="data.logo" fit="cover" :lazy="true"></ui-image>
                <HomeAirdropCorner class="absolute left-0 top-0" type="https://res.kingdata.xyz/static/images/new.png" size="40" />
              </div>
              <div class="ml-2.5 h-13.5 flex-auto w-1">
                <div class="text-kd18px18px h-5 text-global-highTitle text-opacity-85 truncate font-semibold font-kdSemiBold">
                  {{ data.name }}
                </div>
                <div class="mt-3 flex items-center flex-nowrap">
                  <!-- 项目分类 -->
                  <span v-if="size(data.categories)" class="flex flex-nowrap items-center categories-list">
                    <template v-for="(item, index) in data.categories" :key="index">
                      <span v-if="item" class="categories-item flex bg-global-primary bg-opacity-10 rounded-kd20px px-2 py-1">
                        <span class="text-12-14 text-global-primary">{{ item }}</span>
                      </span>
                    </template>
                  </span>
                  <!-- 所属公链 -->
                  <span v-if="size(data.categories) && size(data.chains)" class="split ml-2"></span>
                  <span class="flex flex-nowrap items-center chain-list">
                    <template v-for="(item, index) in data.chains" :key="index">
                      <span v-if="item" class="ml-2 flex w-4 h-4 chain-item">
                        <IconFont :type="item.logo" size="16" />
                      </span>
                    </template>
                  </span>
                </div>
              </div>
            </div>
            <!--右侧 评分-->
            <div class="whitespace-nowrap ml-2 h-13.5">
              <div class="flex items-center justify-end">
                <IconFont class="text-global-gemstone mr-1" type="icon-star" size="14" />
                <span class="text-18px18px text-global-highTitle text-opacity-85 font-kdInter font-bold">{{ toFixed(data.overall_score, 1) }}</span>
              </div>
              <!-- 评分数量 -->
              <p class="mt-2.5 text-kd12px16px text-right text-global-highTitle text-opacity-45">
                {{ i18n.part(i18n.airdrop.content.score, toInteger(data.clout), { count: toInteger(data.clout) }) }}
              </p>
            </div>
          </div>
        </div>
      </slot>
    </div>

    <div>
      <slot name="body">
        <div class="mx-4 py-4 border-t border-solid border-global-highTitle border-opacity-6">
          <div class="select-none flex text-center text-global-highTitle text-opacity-45">
            <div class="flex-1 px-2 flex-wrap">
              <!--空投名额-->
              <p class="text-12-16 flex items-center flex-wrap justify-center">
                <span>{{ i18n.airdrop.content.quota }}</span>
                <!--                <IconFont class="ml-1" type="icon-users" size="12" />-->
              </p>
              <p class="mt-1 text-global-highTitle text-opacity-85">
                <b class="text-kd18px18px font-semibold font-kdSemiBold">{{ toNumberCash(data.airdrop_winner_count) }}</b>
              </p>
            </div>
            <div class="flex-1 px-2 border-l border-solid border-global-highTitle border-opacity-6">
              <!--空投总量-->
              <p class="text-12-16 flex items-center justify-center">
                <span>{{ i18n.airdrop.content.amount }}</span>
                <span v-show="data.airdrop_symbol" class="text-12-16 ml-1">({{ data.airdrop_symbol }})</span>
              </p>
              <p class="mt-1 text-global-highTitle text-opacity-85">
                <b class="text-kd18px18px font-semibold font-kdSemiBold">{{ toNumberCash(data.airdrop_amount) }}</b>
              </p>
            </div>
          </div>
        </div>
      </slot>
    </div>

    <div>
      <slot name="footer">
        <div class="item-time text-14-18" :class="{ ended: isBefore(data.airdrop_end_at) }">
          <span class="select-none">{{ timeValue(data) }}</span>
        </div>
      </slot>
    </div>
  </v-router>
</template>

<style lang="scss" scoped>
.airdrop-item {
  @apply mb-6 block bg-white;
  &:last-child {
    @apply mb-0;
  }
  &:hover {
    box-shadow: 0 1px 0.25rem rgba(0, 0, 0, 0.06), 0 1rem 3rem rgba(0, 0, 0, 0.1);
  }
  @screen md {
    @apply mb-0;
  }

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  @apply border border-solid border-global-highTitle border-opacity-6;

  .split {
    width: 1px;
    @apply h-3;
    @apply hidden;
    @apply bg-global-highTitle bg-opacity-10;
    @screen md {
      @apply inline-block;
    }
  }
  .categories-item {
    @apply mr-2;
    &:last-child {
      @apply mr-0;
    }
  }
}

.item-time {
  @apply h-10.05 flex items-center justify-center;
  &.ended {
    @apply bg-global-highTitle bg-opacity-6;
    @apply text-global-highTitle text-opacity-65;
  }
  &:not(.ended) {
    @apply bg-global-darkblue text-white;
  }
}
</style>

<script lang="ts" setup>
/**
 * @file 项目详情数据
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n/";
import type { PropType } from "vue";
import safeGet from "@fengqiaogang/safe-get";
import { ProjectType } from "src/types/dapp/data";
import type { DAppProject, DAppData, ProjectMedias, ProjectMediaItem } from "src/types/dapp/data";
import { getChainLogo } from "src/utils/";
import Risk from "src/pages/dapp/risk/index.vue";

const i18n = I18n();

defineProps({
  project: {
    required: true,
    type: Object as PropType<DAppProject>,
  },
  data: {
    required: true,
    type: Object as PropType<DAppData>,
  },
});

const getMediaUrl = function (data: DAppData, name: string) {
  const medias: ProjectMedias = data?.medias || {};
  const item = safeGet<ProjectMediaItem>(medias, name);
  if (item) {
    return item.project_media_url;
  }
  return void 0;
};
</script>

<template>
  <div>
    <div class="flex items-center">
      <ui-image :alt="data.name" :src="data.logo" class="w-12 h-12 mr-3" rounded />
      <div class="flex-1">
        <h3 class="text-24-28 text-global-highTitle font-medium">{{ data.name }}</h3>
      </div>
    </div>
    <div class="mt-4 flex">
      <!--项目进度-->
      <ui-label v-if="project.type === ProjectType.airdrop && data.ido" :value="data.ido.ido_status" />
      <!--风险等级-->
      <Risk v-if="data.risk" :value="data.risk" />
      <!--公链-->
      <ui-label :value="data.chains" icon-name="logo" />
      <!--项目类型-->
      <ui-label :value="data.categories" />
      <!-- 合约 -->
      <ui-label :value="data.contracts" copy name-key="address" no-select>
        <template #prefix="scope">
          <span v-if="getChainLogo(scope.data.chain)" class="flex pr-1">
            <IconFont :type="getChainLogo(scope.data.chain)" size="16" />
          </span>
        </template>
      </ui-label>
    </div>

    <!--项目描述-->
    <ui-description :line="2" class="mt-5" dialog>
      <div class="text-14-20 text-global-highTitle text-opacity-65">
        <span v-if="project.type === ProjectType.nft">{{ data.ticker }}</span>
        <span v-else>{{ data.description }}</span>
      </div>
    </ui-description>
    <div class="flex items-center justify-between md:block mt-4">
      <div class="text-global-darkblue flex items-center media-list">
        <v-router v-if="getMediaUrl(data, 'twitter')" :href="getMediaUrl(data, 'twitter')" target="_blank">
          <!--twitter-->
          <IconFont size="20" type="icon-twitter" />
        </v-router>
        <v-router v-if="getMediaUrl(data, 'telegram')" :href="getMediaUrl(data, 'telegram')" target="_blank">
          <!--telegram-->
          <IconFont size="20" type="icon-telegram" />
        </v-router>
        <v-router v-if="data.website" :href="data.website" target="_blank">
          <!--官网地址-->
          <IconFont size="20" type="icon-yuyan" />
        </v-router>
        <v-router v-if="data.white_paper" :href="data.white_paper" target="_blank">
          <!--白皮书-->
          <IconFont size="20" type="icon-whitepaper" />
        </v-router>
        <template v-for="(item, index) in data.audit_reports" :key="index">
          <v-router v-if="item && item.report" :href="item.report" target="_blank">
            <!--审计公司-->
            <IconFont size="20" type="icon-comment" />
          </v-router>
        </template>
      </div>
      <!--分享-->
      <div class="md:mt-6">
        <ui-share>
          <div class="flex items-center py-2 px-3 rounded bg-global-darkblue bg-opacity-6">
            <IconFont class="md:order-2 mr-1 md:mr-0" size="16" type="icon-fenxiang1" />
            <span class="font-m md:mr-1 md:order-1">{{ i18n.dapp.share.label }}</span>
          </div>
        </ui-share>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.media-list {
  .v-router {
    @apply flex mr-4;
    &:last-child {
      @apply mr-0;
    }
  }
}
</style>

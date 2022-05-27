<script lang="ts" setup>
/**
 * @file 项目详细信息
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n/";
import type { PropType } from "vue";
import safeGet from "@fengqiaogang/safe-get";
import type { DAppProject, ProjectItem, ProjectMediaItem, ProjectMedias } from "src/types/dapp/detail";
import { ProjectType } from "src/types/dapp/detail";
import { getChainLogo } from "src/utils/";
import Risk from "src/pages/dapp/risk/index.vue";
import Progress from "src/pages/dapp/progress/index.vue";
import { createRef } from "src/utils/ssr/ref";

const i18n = I18n();

defineProps({
  project: {
    required: true,
    type: Object as PropType<DAppProject>,
  },
  data: {
    required: true,
    type: Object as PropType<ProjectItem>,
  },
});
const title = createRef<string>("title", {} as any);
const description = createRef<string>("description", {} as any);

const getMediaUrl = function (data: ProjectItem, name: string) {
  const medias: ProjectMedias = data?.medias || {};
  const item = safeGet<ProjectMediaItem>(medias, name);
  if (item) {
    return item.project_media_url;
  }
  return void 0;
};

const getAirdropStatus = function (project: DAppProject, data: ProjectItem) {
  if (project.type === ProjectType.airdrop) {
    return safeGet<string>(data, "airdrop_status");
  } else if (project.type === ProjectType.nft) {
    return safeGet<string>(data, "mint_status");
  } else if (project.type === ProjectType.ido) {
    return safeGet<string>(data, "ido_status");
  }
};
const shareText = function (title: string, keywords: string) {
  return `${title}\n${keywords}`;
};
</script>

<template>
  <div>
    <div class="flex items-center">
      <ui-image :preview="[data.logo]" :src="data.logo" class="w-12 h-12 mr-3 text-18-24 font-kdInter" rounded :title="data.name" />
      <div class="flex-1 w-1">
        <h3 class="text-24-28 text-global-highTitle font-medium truncate">{{ data.name }}</h3>
      </div>
    </div>
    <div class="flex flex-wrap empty:hidden">
      <!--项目进度-->
      <template v-if="getAirdropStatus(project, data)">
        <Progress :value="getAirdropStatus(project, data)" class="mt-4" />
      </template>
      <!--风险等级-->
      <Risk :value="data.risk" />
      <!--公链-->
      <ui-label :value="data.chains" class="mt-4" icon-name="logo" />
      <!--项目类型-->
      <ui-label :value="data.categories" class="mt-4" />
      <!-- 合约 -->
      <ui-label :value="data.contracts" class="mt-4" copy name-key="address" no-select>
        <template #prefix="scope">
          <span v-if="getChainLogo(scope.data.chain)" class="flex pr-1">
            <IconFont :type="getChainLogo(scope.data.chain)" size="16" />
          </span>
        </template>
      </ui-label>
    </div>
    <!--项目描述-->
    <ui-description v-if="data.description" :line="2" class="mt-5" dialog>
      <p class="text-14-20 text-global-highTitle text-opacity-65" v-text="data.description"></p>
    </ui-description>
    <div class="flex items-center justify-between md:block mt-4">
      <div class="text-global-darkblue flex items-center media-list empty:hidden">
        <v-router v-if="getMediaUrl(data, 'twitter')" :href="getMediaUrl(data, 'twitter')" target="_blank">
          <!--twitter-->
          <ui-hover class="flex-popover" rounded>
            <template #label>
              <IconFont size="20" type="icon-twitter" />
            </template>
            <template #content>
              <div class="text-global-darkblue text-12-18">{{ i18n.common.chat.twitter }}</div>
            </template>
          </ui-hover>
        </v-router>
        <v-router v-if="getMediaUrl(data, 'telegram')" :href="getMediaUrl(data, 'telegram')" target="_blank">
          <!--telegram-->
          <ui-hover class="flex-popover" rounded>
            <template #label>
              <IconFont size="20" type="icon-telegram" />
            </template>
            <template #content>
              <div class="text-global-darkblue text-12-18">{{ i18n.common.chat.telegram }}</div>
            </template>
          </ui-hover>
        </v-router>
        <v-router v-if="data.website" :href="data.website" target="_blank">
          <!--官网地址-->
          <ui-hover class="flex-popover" rounded>
            <template #label>
              <IconFont size="20" type="icon-yuyan" />
            </template>
            <template #content>
              <div class="text-global-darkblue text-12-18">{{ i18n.growthpad.about.website }}</div>
            </template>
          </ui-hover>
        </v-router>
        <v-router v-if="data.white_paper" :href="data.white_paper" target="_blank">
          <!--白皮书-->
          <ui-hover class="flex-popover" rounded>
            <template #label>
              <IconFont size="20" type="icon-whitepaper" />
            </template>
            <template #content>
              <div class="text-global-darkblue text-12-18">{{ i18n.dapp.project.whitePaper }}</div>
            </template>
          </ui-hover>
        </v-router>
        <template v-for="(item, index) in data.safety" :key="index">
          <v-router v-if="item && item.report" :href="item.report" target="_blank">
            <!--审计公司-->
            <ui-hover class="flex-popover" rounded>
              <template #label>
                <IconFont size="20" type="icon-comment" />
              </template>
              <template #content>
                <div class="text-global-darkblue text-12-18">{{ i18n.dapp.project.audit }}</div>
              </template>
            </ui-hover>
          </v-router>
        </template>
      </div>
      <!--分享-->
      <div class="md:mt-6">
        <ui-share :value="shareText(title, description)">
          <div class="flex items-center py-2 px-3 rounded bg-global-darkblue bg-opacity-6">
            <IconFont class="mr-1" size="16" type="icon-fenxiang1" />
            <span class="font-m">{{ i18n.dapp.share.label }}</span>
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

<script setup lang="ts">
import DAppAirdropItem from "src/pages/dapp/airdrop/content/item.vue";
import DAppAirdropEmpty from "src/pages/dapp/airdrop/content/empty.vue";
import I18n from "src/utils/i18n";
import { Model } from "src/logic/dapp";
import { TabTypes } from "src/types/dapp/airdrop";

defineProps({
  limit: {
    type: Number,
    default: () => 0,
  },
});
const status = TabTypes.potential;

const i18n = I18n();
const request = function (query: object) {
  const model = new Model();
  return model.getAirdropList({ status, ...query });
};
</script>

<template>
  <div class="text-global-highTitle text-opacity-65">
    <p class="text-14-18" v-html="i18n.airdrop.potential.desc"></p>
  </div>
  <ui-pagination class="mt-6 showX" :limit="limit > 0 ? limit : 20" :show-loading="limit < 1" :request="request">
    <template #default="scope">
      <div class="airdrop-list">
        <DAppAirdropItem v-for="(data, index) in scope.list" :key="index" :data="data">
          <template #body>
            <div class="project-desc text-global-highTitle text-opacity-65">
              <div class="text-14-18 h-full overflow-ellipsis overflow-hidden">{{ data.description }}</div>
            </div>
          </template>
          <template #footer>
            <div class="hidden"></div>
          </template>
        </DAppAirdropItem>
      </div>
    </template>
    <template #empty>
      <DAppAirdropEmpty />
    </template>
  </ui-pagination>
</template>

<style scoped lang="scss">
.project-desc {
  @apply h-17.5 pb-4 mx-4;
}

@screen md {
  .showX {
    overflow: inherit;
    overflow-x: inherit;
  }
}
</style>

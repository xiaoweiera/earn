<script setup lang="ts">
import DAppAirdropItem from "src/pages/dapp/airdrop/content/item.vue";
// import DAppAirdropEmpty from "src/pages/dapp/airdrop/content/empty.vue";
import { getAirdropList } from "src/logic/dapp";
import { scrollGoToDom } from "src/plugins/browser/scroll";
import { alias } from "src/utils/ssr/ref";
import { useRoute } from "vue-router";
import { getCacheList } from "src/logic/dapp/airdrop";

defineProps({
  limit: {
    type: Number,
    default: () => 0,
  },
});

const $route = useRoute();
let initStatus = true;
const initValue = function () {
  if (initStatus) {
    initStatus = false;
    return getCacheList($route, alias.airdrop.hotPotential);
  }
  return [];
};
const params = {
  activity_type: "AIRDROP",
  recommended: false,
};
const request = async function (query: object) {
  const { items } = await getAirdropList({ ...params, ...query });
  return items;
};
const changeView = function () {
  scrollGoToDom(".j-potential-title", 40);
};
</script>

<template>
  <div>
    <ui-pagination class="mt-6" skin="pagination" :limit="limit > 0 ? limit : 6" :init-value="initValue()" :show-loading="limit < 1" :request="request" @next="changeView" @prev="changeView">
      <template #default="scope">
        <div class="airdrop-list">
          <DAppAirdropItem v-for="(data, index) in scope.list" :key="index" :data="data">
            <template #body>
              <div class="h-17.5 pb-4 mx-4 text-global-highTitle text-opacity-65">
                <div class="text-14-18 h-full overflow-ellipsis overflow-hidden">{{ data.description }}</div>
              </div>
            </template>
            <template #footer>
              <div class="hidden"></div>
            </template>
          </DAppAirdropItem>
        </div>
      </template>
      <!--    <template #empty>-->
      <!--      <DAppAirdropEmpty />-->
      <!--    </template>-->
    </ui-pagination>
  </div>
</template>

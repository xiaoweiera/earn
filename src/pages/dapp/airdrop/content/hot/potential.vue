<script setup lang="ts">
import DAppAirdropItem from "src/pages/dapp/airdrop/content/item.vue";
// import DAppAirdropEmpty from "src/pages/dapp/airdrop/content/empty.vue";
import { Model } from "src/logic/dapp";

defineProps({
  limit: {
    type: Number,
    default: () => 0,
  },
});
const potential = false;
const request = function (query: object) {
  const model = new Model();
  return model.getOperationList({ potential, ...query });
};
</script>

<template>
  <ui-pagination class="mt-6" skin="pagination" :limit="limit > 0 ? limit : 6" :show-loading="limit < 1" :request="request">
    <template #default="scope">
      <div class="airdrop-list airdrop-scroll">
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
    <!--    <template #empty>-->
    <!--      <DAppAirdropEmpty />-->
    <!--    </template>-->
  </ui-pagination>
</template>

<style scoped lang="scss">
.project-desc {
  @apply h-17.5 pb-4 mx-4;
}
</style>

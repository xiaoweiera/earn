<script setup lang="ts">
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import { onMounted, reactive, ref } from "vue";
import { Model } from "src/logic/home";
import I18n from "src/utils/i18n";
import { config } from "src/router/config";
const i18n = I18n();
const params = reactive({
  page: 1,
  page_size: 10,
});
const loading = ref(false);
const api = new Model();
const recommend: any = createRef("API.home.getRecommend", []);
const lastPage = ref(1);
const resultNumber = ref(0); // 返回结果数
// 上一页
const last = async () => {
  if (params.page <= 1 || loading.value) return;
  params.page--;
  lastPage.value--;
  loading.value = true;
  const res: any = await api.getRecommend(params);
  recommend.value = res;
  resultNumber.value = res ? res.length : 0;
  loading.value = false;
};
// 下一页
const next = async () => {
  if (loading.value) return;
  params.page++;
  loading.value = true;
  const res: any = await api.getRecommend(params);
  resultNumber.value = res ? res.length : 0;
  if (res.length > 0) {
    recommend.value = res;
    lastPage.value++;
  } else {
    params.page--;
  }
  loading.value = false;
};
onMounted(() => {
  // 得到数据汇总
  onLoadRef(recommend, () => api.getRecommend(params));
  resultNumber.value = recommend.value ? recommend.value.length : 0;
});
</script>
<template>
  <div class="w-full font-kdFang">
    <div class="header h-10.5">
      <span class="text-kd14px18px text-global-highTitle font-medium">{{ i18n.home.hotTopic }}</span>
      <div class="flex items-center">
        <IconFont class="mr-6" :class="lastPage > 1 ? 'fan' : 'fan-no'" size="10" type="icon-leftNo" @click="last()" />
        <IconFont :class="resultNumber >= params.page_size ? 'fan' : 'fan-no'" size="10" type="icon-rightNo" @click="next()" />
      </div>
    </div>
    <template v-for="(item, index) in recommend" :key="index">
      <v-router class="text-kdFang flex items-center mt-3 cursor-pointer" :href="`${config.homeDetail}/${item.id}`">
        <ui-image class="w-8 min-w-8 h-8 rounded-full overflow-hidden" :src="item['cover']" fit="cover" />
        <span class="ml-2 text-global-primary txt">#</span>
        <span class="txt ml-0.5 text-global-highTitle text-opacity-85 short">{{ item["name"] }}</span>
      </v-router>
    </template>
  </div>
</template>
<style scoped lang="scss">
.fan {
  @apply text-global-highTitle text-opacity-65 cursor-pointer;
}
.fan-no {
  @apply text-global-highTitle text-opacity-10;
}
.pageNumber {
  @apply mx-2 text-kd12px16px text-global-highTitle text-opacity-65;
}

.header {
  @apply py-2.5 min-h-10;
  @apply flex items-center justify-between header-border;
  @apply border-t-1 border-b-1 border-global-highTitle border-opacity-6;
}

.txt {
  @apply text-kd14px18px font-medium;
}
</style>

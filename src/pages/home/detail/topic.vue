<script setup lang="ts">
import {createRef, onLoadRef} from "~/utils/ssr/ref";
import {onMounted, ref} from "vue";
import {Model} from "~/logic/home";
import I18n from "~/utils/i18n";
const i18n = I18n();
const params = {
  page: 1,
  page_size: 10,
}
const loading = ref(false)
const api = new Model();
const recommend: any = createRef("API.home.getRecommend", []);
//上一页
const last = async () => {
  if (params.page <= 1 || loading.value) return
  params.page--
  loading.value = true
  recommend.value = await api.getRecommend(params)
  loading.value = false
}
//下一页
const next = async () => {
  if (loading.value) return
  params.page++
  loading.value = true
  const res: any = await api.getRecommend(params)
  if (res.length > 0) {
    recommend.value = res
  } else {
    params.page--
  }
  loading.value = false
}
onMounted(function () {
  // 得到数据汇总
  onLoadRef(recommend, () => api.getRecommend(params));
});
</script>
<template>
  <div class="w-full font-kdFang">
    <div class="header">
      <span class="text-kd14px18px text-global-highTitle font-medium">{{i18n.home.hotTopic}}</span>
      <div class="flex items-center">
        <IconFont class="fan mr-6" size="10" type="icon-leftNo" @click="last()"></IconFont>
        <IconFont class="fan" size="10" type="icon-rightNo" @click="next()"></IconFont>
      </div>
    </div>
    <template v-for="item in recommend">
      <v-router class="text-kdFang flex items-center mt-3 cursor-pointer" href="https://www.baidu.com">
        <img class="w-8 mix-w-8 h-8 rounded-kd4px" :src="item['cover']" fit="cover"/>
        <span class="ml-2 text-global-primary txt">#</span>
        <span class="txt ml-0.5 text-global-highTitle text-opacity-85 short">{{ item['name'] }}</span>
      </v-router>
    </template>
  </div>
</template>
<style scoped lang="scss">
.fan {
  @apply text-global-highTitle text-opacity-65 cursor-pointer;
}

.pageNumber {
  @apply mx-2 text-kd12px16px text-global-highTitle text-opacity-65;
}

.header {
  @apply py-2.5;
  @apply flex items-center justify-between header-border;
  @apply border-t-1 border-b-1 border-global-highTitle border-opacity-6;
}

.txt {
  @apply text-kd14px18px font-medium;
}
</style>
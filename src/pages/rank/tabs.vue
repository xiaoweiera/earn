<script setup lang="ts">
import * as alias from "src/utils/root/alias";
import { onMounted, ref, watch } from "vue";
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import { Model } from "src/logic/rank";
import safeGet from "@fengqiaogang/safe-get";
import { getParam } from "src/utils/router";
import { getUrl } from "src/lib/url";
import { config as routerConfig } from "src/router/config";
import { useRoute } from "vue-router";
const route = useRoute();
const routerQuery = getParam<object>();
const chain = ref(getParam<string>("chain") || "all");
const list: any = createRef<object[]>(alias.rank.groups, []);
const groupId = ref(getParam<string>("group") || "all");
const props = defineProps({
  position: {
    type: String,
    required: true,
  },
});
const isSame = (id: number | string) => groupId.value === (id ? id.toString() : "");
watch(route, () => (groupId.value = getParam<string>("group") || "all"));
onMounted(() => {
  // 得到数据汇总
  onLoadRef<object[]>(list, () => {
    const api = new Model();
    const query: any = {
      position: props.position,
      chain: chain.value,
    };
    return api.rank.getGroups(query);
  });
});
</script>
<template>
  <div class="md:flex-1 md:pr-6 text-kdFang tab-wrap">
    <template v-for="(item, index) in getUrl(list, routerConfig.rankDapp, 'group', 'id', routerQuery)" :key="index">
      <router-link v-if="index < 7" :to="item.href" class="tab-item" :class="{ active: isSame(item.id) }">
        <template v-if="safeGet(item, 'initial.image')">
          <div class="initial image">
            <img :src="safeGet(item, 'initial.image')" />
          </div>
        </template>
        <template v-else>
          <div class="initial text">
            <span class="text-14-18">{{ safeGet(item, "initial.text") }}</span>
          </div>
        </template>

        <template v-if="safeGet(item, 'active.image')">
          <div class="active image">
            <img :src="safeGet(item, 'active.image')" />
          </div>
        </template>
        <template v-else>
          <div class="active text">
            <span class="text-14-18">{{ safeGet(item, "active.text") }}</span>
          </div>
        </template>
      </router-link>
    </template>
  </div>
</template>
<style scoped lang="scss">
.tab-wrap {
  @apply mb-4;
  @screen md {
    @apply mb-0;
  }
  @at-root .hidden-tabs & {
    .tab-item {
      @apply hidden;
    }
  }
}
.tabs-other {
  @apply flex items-center;
  @screen md {
    @apply min-w-115;
    &:before {
      content: "";
      width: 0px;
      @apply bg-global-highTitle bg-opacity-10;
      @apply inline-block h-4 mr-3;
    }
  }
}

.tab-item {
  @apply inline-block;
  &[href] {
    @apply cursor-pointer;
  }
  .text {
    transition: all 0.3s;
    @apply inline-block py-1.5 px-2.5 text-global-highTitle text-opacity-85;
  }
  .initial {
    @apply block;
  }
  .active {
    @apply hidden;
  }
  &.active {
    .active {
      @apply block;
    }
    .initial {
      @apply hidden;
    }
    .text {
      border-radius: 30px;
      @apply font-medium text-global-primary bg-global-primary bg-opacity-10;
    }
  }
  img {
    @apply inline-block h-7.5;
  }
}
</style>

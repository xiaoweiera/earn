<script setup lang="ts">
// import router, { getParam } from '~/utils/router'

import { onBeforeMount, computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import I18n from '~/utils/i18n/index'


const i18n = I18n();
const $router = useRoute();
const chain=ref<string>('all')

const props = defineProps({
  page: {
    type: String,
    required: true,
  },
  to: {
    type: Boolean
  },
})

// const getHref = (slug: string) => {
//   return router({
//     query: {
//       chain: slug,
//       group: ''
//     },
//   })
// }
const chainData = ref([
  {
    'id': 100,
    'name': i18n.topRank.chainAll,
    'slug': 'all',
    'logo': 'icon-quanbu',
  },
  {
    'id': 101,
    'name': 'ETH',
    'slug': 'ETH',
    'logo': 'icon-quanbu',
  },
  {
    'id': 102,
    'name': 'Bsc',
    'slug': 'Bsc',
    'logo': 'icon-quanbu',
  },
  {
    'id': 103,
    'name': 'Polygon',
    'slug': 'POS',
    'logo': 'icon-quanbu',
  }
])

const getData = async () => {
  // const res = await getChains(props.page)
  chainData.value = chainData.value.concat()
}

// const onChangeChainStatus = function() {
//   chain.value = getParam<string>('chain', 'all') as string
// }

onBeforeMount(() => {
  // onChangeChainStatus()
  // watch($router, onChangeChainStatus)
  getData()
})
const chainItem = computed(() => {
  return chainData.value?.find(item => item.slug === chain.value)
})
</script>
<template>
  <div>
    <div class="flex font-kdFang flex-wrap items-center">
      <template v-for='(item, index) in chainData' :key="index">
        <router-link to="www.baidu.com">
          <span class="px-3 py-2 text-kd14px18px text-global-highTitle text-opacity-65 mr-4">{{item.name}}</span>
        </router-link>
      </template>
    </div>
    <!-- <div class='flex   xshidden   font-kdFang flex-wrap'>
      <template v-for='item in chainData'>
        <router-link :to='getHref(item.slug)' :class="chain===item.slug?'selectedTag ':'tag'" class='flex hand mb-3  rounded-kd20px max-h-9  flex items-center justify-center ' style='flex-shrink:0;'>
          <IconFont v-if='item.slug!=="other"' :class="chain==='all'?'text-global-white':item.slug==='all'?'text-global-primary':''" size='20' :type='item.slug==="all"?"icon-quanbuno-copy":item.logo' class='mr-1' />
          <div class='text-kd14px18px '>{{ item.name === i18n.apyIndex.allChain ? i18n.apyIndex.all : item.name }}</div>
        </router-link>
      </template>
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
::v-deep(.el-input__inner) {
  border-radius: 20px;
  @apply h-9 pl-9.5;
}

.tag {
  border: 1px solid rgba(3, 54, 102, 0.1);
  @apply px-2 py-1 mr-3  text-kd16px24px text-global-highTitle text-opacity-85 ;
}

.selectedTag {
  border: 1px solid rgba(3, 54, 102, 0);
  @apply px-2 py-1 bg-global-primary   mr-3  text-kd16px24px text-global-white ;
}
</style>
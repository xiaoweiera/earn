<script setup lang="ts">
import { ref } from 'vue'
import I18n from '~/utils/i18n/index'

const props = defineProps({
  chainData: {
    type: Object,
  },
  title: {
    type: String,
    default: () => '',
  },
})
const i18n = I18n();
const chainData = ref([
  {
    'id': 100,
    'name': 'all',
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
const onChangeView = function (data: object) {
  
}
</script>
<template>
  <div>
    <div class="flex items-center">
      <div class="text-kd14px18px text-global-highTitle text-opacity-65 font-kdFang">{{props.title}}</div>
      <div class="is-tab">
        <ui-tab :list="chainData" @change="onChangeView"></ui-tab>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
%first-ml0 {
  &:first-child {
    @apply ml-0;
  }
}
.is-tab {
  @apply ml-4 flex items-center;
  ::v-deep(.tab-wrap) {
    @apply items-center;
    .tab-item {
      &:after {
        @apply h-0;
      }
      &:not(a) {
      &:not([href]) {
        @apply cursor-pointer ml-4;
        @extend %first-ml0;
      }
    }
    }
    span {
      @apply text-kd14px18px font-medium font-kdFang;
    }
    .active {
      @apply flex px-3 py-2 max-h-8 bg-global-darkblue bg-opacity-6 rounded-md;
    }
  }
}
</style>
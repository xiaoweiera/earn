<script setup lang="ts">
import { onMounted, ref } from 'vue'
import I18n from '~/utils/i18n/index'
import { useRoute } from 'vue-router'
import { toArray } from "src/utils";
import { changeUrl } from "src/logic/dapp";
const props = defineProps({
  chainData: {
    type: Object,
  },
  title: {
    type: String,
    default: () => '',
  },
})
const emit=defineEmits(['change'])
const i18n = I18n();
const $router = useRoute();

console.log(props.chainData)
const init = function () {
  const groudId = 'groudId';
  props.chainData = changeUrl(props.chainData, $router, groudId);
}

const onChangeView = function (data: Object) {
  emit('change')
}
onMounted(function () {
  init()
})
</script>
<template>
  <div>
    <div class="flex items-center">
      <div class="text-kd14px18px text-global-highTitle text-opacity-65 font-kdFang">{{props.title}}</div>
      <div class="is-tab">
        <ui-tab :list="chainData" @change="onChangeView" active-name="groudId"></ui-tab>
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
  @apply flex items-center;
  ::v-deep(.el-scrollbar) {
    @apply border-0;
    .tab-wrap {
      @apply items-center;
      .tab-item {
        @apply flex px-3 py-2 ml-4 rounded-md;
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
}
</style>
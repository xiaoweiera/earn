<script setup lang="ts">

import { ref } from "vue";
import I18n from '~/utils/i18n/index'
const i18n = I18n();
const search = ref<string>('');
const props = defineProps({
  title: {
    type: String,
    default: () => '',
  },
})
</script>
<template>
  <div>
    <div class="w-41 md:w-50 flex md:ml-3 mt-3 md:mt-0 relative">
      <input class="w-41 md:w-50 h-8 text-kd14px18px text-global-highTitle text-opacity-85 bg-global-topBg border border-global-highTitle border-opacity-4 rounded-md" v-model="search" :placeholder="props.title" type="text">
      <IconFont class="absolute left-3.25 top-2.5" type="icon-sousuo" size='14'/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
input[type='text'] {
  @apply p-0;
  @apply pl-9;
}
::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  @apply text-kd12px18px text-global-highTitle text-opacity-45;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  @apply text-kd12px18px text-global-highTitle text-opacity-45;
}
input::-webkit-input-placeholder{
  @apply text-kd12px18px text-global-highTitle text-opacity-45;
}
input[type="text"]:focus{
  @apply border border-global-darkblue border-opacity-10;
}

</style>
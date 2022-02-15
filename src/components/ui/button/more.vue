<script setup lang="ts">
import { ref, computed } from 'vue';
import I18n from 'src/utils/i18n';
import { isFunction } from 'src/utils';

const props = defineProps({
  request: {
    type: Function,
    required: true,
  },
  value: {
    type: String
  }
})


const loading = ref<boolean>(false);

const getButtonValue = function () {
  if (props.value) {
    return props.value;
  }
  const i18n = I18n();
  return i18n.common.button.more;
}

const onClick = async function() {
  if (loading.value) {
    return false
  }
  loading.value = true
  if (props.request && isFunction(props.request)) {
    try {
      await Promise.all([
        props.request()
      ]);
    } catch (e) {
      // todo
    }
    finally {
      loading.value = false
    }
  }
}
</script>

<template>
  <div class="inline-block w-50 h-8.5 rounded bg-global-highTitle bg-opacity-6 text-center cursor-pointer" @click="onClick">
    <div class="h-full flex items-center justify-center">
      <IconFont v-if="loading" type="loading" suffix="png" size="18"/>
      <span v-else class="text-global-highTitle text-opacity-65 text-sm leading-5">{{ getButtonValue() }}</span>
    </div>
  </div>
</template>


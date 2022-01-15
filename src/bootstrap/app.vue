<script async setup lang="ts">
import { provide } from "vue";
import { rootData } from "src/config";
const props = defineProps({
  root: {
    type: Object,
    default () {
      return {};
    }
  }
});
provide(rootData, Object.assign({}, props.root || {}));
</script>
<template>
  <div class="application">
    <router-view></router-view>
  </div>
</template>

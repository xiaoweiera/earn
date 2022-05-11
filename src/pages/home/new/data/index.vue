<script lang="ts" setup>
import noData from "./nodata.vue";
import info from "./info.vue";
import { address } from "src/logic/common/wallet";
import { ref, watch } from "vue";
const key = ref(0);
</script>
<template>
  <div>
    <client-only>
      <info v-if="address" />
      <noData v-else class="w-full" />
    </client-only>
  </div>
</template>

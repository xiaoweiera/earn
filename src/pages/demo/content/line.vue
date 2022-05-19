<script lang="ts">
/**
 * @file 折线图
 * @auth svon.me@gmail.com
 */

import Echart from "./chart.vue";
import { defineComponent } from "vue";
import { SeriesType } from "src/types/echarts/type";

export default defineComponent({
  components: {
    Echart,
  },
  props: {
    name: {
      required: true,
      type: String,
    },
    data: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      type: SeriesType.line,
    };
  },
});
</script>

<template>
  <div>
    <lazy-load height="40px">
      <Echart class="h-10" :type="type" :name="name" :data="data"></Echart>
    </lazy-load>
  </div>
</template>

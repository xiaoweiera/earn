<script lang="ts">
/**
 * @file content
 * @auth svon.me@gmail.com
 */

import { defineComponent } from "vue";
import { SeriesType } from "src/types/echarts/type";
import { isString, isArray, upperFirst } from "src/utils/";
import type { PropType } from "vue";

import Chain from "./chain.vue";
import Logo from "./logo.vue";
import Text from "./text.vue";
import _Number from "./number.vue";
import Ratio from "./ratio.vue";
import Progress from "./progress.vue";
import Chartline from "./line.vue";
import Money from "./money.vue";
import Time from "./time.vue";
import Desc from "./desc.vue";

export default defineComponent({
  name: "TableTD",
  components: {
    Chain,
    Logo,
    Text,
    Number: _Number,
    Ratio,
    Progress,
    Chartline,
    Chartbar: {
      extends: Chartline,
      data() {
        return {
          type: SeriesType.bar,
        };
      },
    },
    Money,
    Time,
    Desc,
  },
  props: {
    fields: {
      required: true,
      type: [String, Array] as PropType<string | string[] | Array<string[] | string>>,
    },
    type: {
      required: true,
      type: [String, Array] as PropType<string | string[] | Array<string[] | string>>,
    },
    data: {
      required: true,
      type: Object,
    },
    width: {
      type: Number,
      default: () => 150,
    },
  },
  methods: {
    isArray,
    upperFirst: function (value: any) {
      if (isString(value)) {
        return upperFirst(value);
      }
    },
    isColumn(list: string | string[] | Array<string | string[]>): boolean {
      let status = false;
      for (const value of list) {
        if (isArray(value)) {
          status = true;
          break;
        }
      }
      return status;
    },
    getStyle: function (type: string) {
      const wfull = ["chartLine", "chartBar", "progress"];
      if (wfull.includes(type)) {
        return "width:100%";
      }
      return "";
    },
  },
});
</script>

<template>
  <div class="w-full">
    <template v-if="isArray(type)">
      <div class="flex item-list" :class="{ column: isColumn(type) }">
        <template v-for="(value, index) in type" :key="index">
          <TableTD class="flex table-item short" :style="getStyle(value)" :fields="fields[index]" :type="value" :data="data" />
        </template>
      </div>
    </template>
    <template v-else-if="upperFirst(type)">
      <component :is="upperFirst(type)" :width="width" :field="fields" :data="data" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.item-list {
  &:not(.column) {
    @apply items-center;
    & > .table-item {
      @apply mr-1.5 last:mr-0 flex-1;
      &:first-child {
        width: auto;
        @apply flex-none;
      }
    }
  }

  &.column {
    @apply flex-col flex-wrap;
    & > .table-item {
      @apply mt-0.5 first:mt-0 w-full;
    }
  }
}
</style>

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
import Chartline from "./line.vue";
import Time from "./time.vue";
import Tags from "./tags.vue";
import Percent from "./percent.vue"

export default defineComponent({
  name: "TableTD",
  components: {
    Chain,
    Logo,
    Text,
    Tags,
    Percent,
    Number: _Number,
    Chartline,
    Chartbar: {
      extends: Chartline,
      data() {
        return {
          type: SeriesType.bar,
        };
      },
    },
    Time,
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
    center: {
      type: Boolean,
      default: false,
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
      const wfull = ["chartLine", "chartBar", "progress", "text", "desc"];
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
      <div class="flex item-list short" :class="{ column: isColumn(type), center: center }">
        <template v-for="(value, index) in type" :key="index">
          <TableTD class="flex table-item short" :class="{ center: center }" :style="getStyle(value)" :fields="fields[index]" :type="value" :data="data" />
        </template>
      </div>
    </template>
    <template v-else-if="upperFirst(type)">
      <component :is="upperFirst(type)" :width="width" :field="fields" :data="data" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.center {
  @apply flex justify-center;
}
.item-list {
  &:not(.column) {
    @apply items-center;
    & > .table-item {
      width: fit-content;
      @apply mr-1.5 last:mr-0;
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

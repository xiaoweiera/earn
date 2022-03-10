<script lang="ts">
import * as utils from "src/utils/";
import type { PropType } from "vue";
import { defineComponent } from "vue";
import type { MenuItem } from "src/types/menu/";

export default defineComponent({
  name: "MSub",
  props: {
    list: {
      type: Array as PropType<MenuItem[]>,
      default() {
        return [];
      },
    },
  },
  methods: {
    size(value: MenuItem[]): number {
      return utils.size(value);
    },
  },
});
</script>

<template>
  <ul class="block">
    <template v-for="data in list" :key="data.id">
      <li v-if="data.more && data.children && size(data.children) > 0" class="block pt-3">
        <ui-visible>
          <template #label>
            <span class="flex items-center select-none">
              <IconFont v-if="data.icon" class="flex mr-2" :type="data.icon" size="32" />
              <span class="text-14-18 hidden">{{ data.name }}</span>
              <span class="text-16-24">{{ data.name }}</span>
            </span>
          </template>
          <div>
            <div class="menu-sub-list">
              <MSub :list="data.children" />
            </div>
          </div>
        </ui-visible>
      </li>
      <li v-else class="block pt-3">
        <v-router class="flex items-center select-none" :href="data.href">
          <IconFont v-if="data.icon" class="flex mr-2" :type="data.icon" size="32" />
          <span class="text-14-18 hidden">{{ data.name }}</span>
          <span class="text-16-24">{{ data.name }}</span>
        </v-router>
      </li>
    </template>
  </ul>
</template>

<style scoped lang="scss">
.menu-sub-list {
  @apply pl-4 ml-8 relative;
  @at-root .menu-sub-list & {
    @apply ml-3.5;
  }
  &:after {
    @apply absolute;
    @apply top-3 bottom-1 left-0;
    @apply bg-white bg-opacity-24;
    content: '';
    width: 1px;
  }

  .text-14-18 {
    @at-root .menu-sub-list & {
      @apply block;
      & ~ .text-16-24 {
        @apply hidden;
      }
    }
  }
}
</style>

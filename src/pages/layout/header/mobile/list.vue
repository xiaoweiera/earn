<script lang="ts" setup>
import type { PropType } from "vue";
import type { MenuItem } from "src/types/menu/";

defineProps({
  list: {
    type: Array as PropType<MenuItem[]>,
    default() {
      return [];
    },
  },
});
</script>

<template>
  <div>
    <div class="mobile-menu-item">
      <template v-for="data in list" :key="data.id">
        <ui-visible v-if="data.children && data.children.length > 0" title-class="title" :arrow-size="16" :checked="data.active">
          <template #label>
            <span class="h3 block text-16-22 font-m text-global-highTitle" :class="{ active: data.active }">{{ data.name }}</span>
          </template>
          <template v-for="item in data.children" :key="item.name">
            <v-router v-if="!item.group" :href="item.href" class="flex items-center py-2 min-h-10">
              <IconFont v-if="item.icon" size="24" class="mr-2" :type="item.icon" />
              <span class="item-name">{{ item.name }}</span>
            </v-router>
          </template>
        </ui-visible>
        <div v-else>
          <v-router class="title block" :href="data.href">
            <span class="h3 block text-16-22 font-m text-global-highTitle" :class="{ active: data.active }">{{ data.name }}</span>
          </v-router>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped lang="scss">
.mobile-menu-item {
  ::v-deep(.title) {
    @apply h-14;
    box-shadow: 0 1px 0 rgba(3, 54, 102, 0.06);
  }
  ::v-deep(input) {
    &:checked {
      ~ .visible-label {
        .arrow-icon {
          @apply text-global-darkblue;
        }
      }
    }
  }
}
.h3 {
  @apply h-14 flex items-center;
  &.active {
    @apply text-global-darkblue;
  }
}
.item-name {
  @apply text-kd14px18px text-global-highTitle font-medium font-kdFang;
}
</style>

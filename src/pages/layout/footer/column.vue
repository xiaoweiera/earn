<script lang="ts" setup>
import type { PropType } from "vue";
import { computed } from "vue";
import type { MenuItem } from "src/types/menu";
import { Target } from "src/plugins/ui/router/props";
import Hover from "./hover.vue";

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  data: {
    required: true,
    type: Object as PropType<MenuItem>,
  },
});

const id = computed<string>(() => {
  return `footer-column-${props.index}`;
});

</script>
<template>
  <div>
    <div class="menu-label hidden lg:block">
      <span class="text-18">{{ data.label }}</span>
    </div>
    <input :id="id" :name="id" class="menu-active hidden" type="checkbox">
    <label :for="id" class="menu-label cursor-pointer block lg:hidden">
      <span class="select-none w-full flex justify-between items-center">
        <span class="text-base">{{ data.label }}</span>
        <IconFont class="arrow" size="16" type="icon-arrow-down" />
      </span>
    </label>
    <div class="pt-3 lg:pt-6 menu-content">
      <template v-for="(item, idx) in data.children" :key="idx">
        <!-- 带图标 -->
        <div v-if="item.icon" class="menu-item">
          <span class="text-14-18 block">{{ item.name }}</span>
          <v-router
            :href="item.href" :target="item.blank ? Target.blank: Target.self"
            class="flex items-center text-global-primary mt-0.5"
          >
            <IconFont :type="item.icon" />
            <span class="ml-1.5">{{ item.value }}</span>
          </v-router>
        </div>

        <v-router
          v-else-if="item.href" :href="item.href" :target="item.blank ? '_blank': ''"
          class="menu-item text-14-18 hover:text-global-primary"
        >
          {{ item.name }}
        </v-router>

        <div v-else-if="item.qrcode" class="menu-item">
          <Hover :desc="item.desc" :href="item.qrcode">
            <span class="text-14-18">{{ item.name }}</span>
          </Hover>
        </div>
        <span v-else class="menu-item text-14-18">{{ item.name }}</span>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-label {
  @apply text-global-highTitle font-medium;
  .arrow {
    @apply flex;
    transition: all 0.3s;
  }
}

.menu-content {
  @apply hidden lg:block;

  .menu-item {
    @apply mb-3 lg:mb-4 block;
    &:last-child {
      @apply mb-0;
    }
  }

}

.menu-active {
  &:checked {
    & ~ .menu-label {
      .arrow {
        transform: rotate(180deg);
      }
    }

    & ~ .menu-content {
      @apply block;
    }
  }
}
</style>

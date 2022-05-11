<script lang="ts" setup>
/**
 * @file 显示与隐藏
 * @auth svon.me@gmail.com
 */
import { ref, computed } from "vue";
import { uuid } from "src/utils/";

const key = ref<string>(`visible-${uuid()}`);

const props = defineProps({
  arrow: {
    type: Boolean,
    default: () => true,
  },
  arrowSize: {
    type: Number,
    default: 24,
  },
  titleClass: {
    type: String,
    default: "",
  },
  checked: {
    type: Boolean,
    default: () => false,
  },
});

const className = computed<string[]>(function () {
  const array: string[] = [];
  if (props.arrow) {
    array.push("show-arrow");
  }
  if (props.titleClass) {
    array.push(props.titleClass);
  }
  return array;
});
</script>

<template>
  <div>
    <template v-if="checked">
      <input :id="key" :name="key" class="hidden visible-input" type="checkbox" checked />
    </template>
    <template v-else>
      <input :id="key" :name="key" class="hidden visible-input" type="checkbox" />
    </template>
    <label :for="key" class="block select-none visible-label cursor-pointer" :class="className">
      <slot :id="key" name="label" />
      <IconFont class="arrow-icon hidden" type="icon-arrow-down" :size="arrowSize" />
    </label>
    <div class="visible-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
%transition {
  transition: all 0.3s;
}

.visible-label {
  &.show-arrow {
    @apply flex justify-between items-center;
    .arrow-icon {
      @apply inline-flex;
    }
  }
  .arrow-icon {
    @extend %transition;
  }
}

.visible-content {
  max-height: 0;
  @extend %transition;
  @apply invisible overflow-hidden;
}

.visible-input {
  &:checked {
    ~ .visible-content {
      @apply visible;
      max-height: initial;
    }
    ~ .visible-label {
      ::v-deep(.arrow-icon) {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
